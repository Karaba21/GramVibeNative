import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';


const PostComponent = ({ item, token }) => {
    const BASE_URL = 'http://172.20.10.12:3001';
    const [likes, setLikes] = useState(item.likes.length);
    const [liked, setLiked] = useState(item.likes.includes(item.user._id));
    const [comments, setComments] = useState(item.comments);
    const [newComment, setNewComment] = useState('');
    const formattedDate = format(new Date(item.createdAt), 'PPpp');

    const handleLike = async () => {
        try {
          const url = `${BASE_URL}/api/posts/${item._id}/like`;
          if (liked) {
            await fetch(url, {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setLikes(likes - 1);
          } else {
            await fetch(url, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setLikes(likes + 1);
          }
          setLiked(!liked);
        } catch (error) {
          console.error('Error al actualizar el like:', error);
        }
      };



      const handleAddComment = async () => {
        if (!newComment) return;
        try {
          const response = await fetch(`${BASE_URL}/api/posts/${item._id}/comments`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ content: newComment }),
          });
          const comment = await response.json();
          setComments([...comments, comment]);
          setNewComment('');
        } catch (error) {
          console.error('Error al agregar comentario:', error);
        }
      };
    
      const handleRemoveComment = async (commentId) => {
        try {
          await fetch(`${BASE_URL}/api/posts/${item._id}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setComments(comments.filter((comment) => comment._id !== commentId));
        } catch (error) {
          console.error('Error al eliminar comentario:', error);
        }
      };
    

  return (
    <View style={styles.postContainer}>
      {/* Encabezado de la publicación */}
      <View style={styles.postHeader}>
        <Image source={{ uri: item.user.profilePicture || 'https://via.placeholder.com/40'}} style={styles.profileImage} />
        <Text style={styles.username}>{item.user.username}</Text>
        <TouchableOpacity style={styles.moreOptions}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Imagen de la publicación */}
      <Image source={{ uri: `${BASE_URL}/${item.imageUrl.replace(/\\/g, '/')}` }} style={styles.postImage} />

      {/* Acciones */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleLike}>
          {/* <Ionicons name="heart-outline" size={24} color="#333" /> */}
          <Ionicons name={liked ? "heart" : "heart-outline"} size={24} color={liked ? "red" : "#333"} />

        </TouchableOpacity>
        <TouchableOpacity style={styles.commentIcon}>
          <Ionicons name="chatbubble-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Información del post */}
      <Text style={styles.likes}>{likes} Likes</Text>
      <Text style={styles.description}>
        <Text style={styles.username}>{item.user.username} </Text>
        {item.caption}
      </Text>


      {/* Sección de comentarios */}
      <View style={styles.commentsSection}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <View key={comment._id} style={styles.comment}>
              <Text>
                <Text style={styles.username}>{comment.user?.username || 'Anonymous'}: </Text>
                {comment.content}
              </Text>
              <TouchableOpacity onPress={() => handleRemoveComment(comment._id)}>
                <Ionicons name="trash-outline" size={16} color="red" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text></Text>
        )}
        <View style={styles.addComment}>
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity onPress={handleAddComment}>
            <Ionicons name="send-outline" size={20} color="#333" />
          </TouchableOpacity>

        
        </View>
        <Text style={styles.time}>{formattedDate}</Text>

      </View>
    </View>



  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  moreOptions: {
    marginLeft: "auto",
  },
  postImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  commentIcon: {
    marginLeft: 15,
  },
  likes: {
    fontWeight: "bold",
    fontSize: 14,
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  description: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingTop: 5,
    color: "#555",
  },
  time: {
    fontSize: 12,
    color: "#888",
    //paddingHorizontal: 10,
    paddingTop: 5,
  },
    commentsSection: {
        padding: 10,
    },
    comment: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    addComment: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
});

export default PostComponent;