import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';

const PostComponent = ({ item }) => {
    const BASE_URL = 'http://172.20.10.12:3001';
    const formattedDate = format(new Date(item.createdAt), 'PPpp');
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
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.commentIcon}>
          <Ionicons name="chatbubble-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Información del post */}
      <Text style={styles.likes}>{item.likes.length} Likes</Text>
      <Text style={styles.description}>
        <Text style={styles.username}>{item.user.username} </Text>
        {item.caption}
      </Text>
      <Text style={styles.time}>{formattedDate}</Text>
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
    paddingHorizontal: 10,
    paddingTop: 5,
  },
});

export default PostComponent;