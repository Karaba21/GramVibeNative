import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PostComponent from "./PostComponent";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from "@react-navigation/native";


const posts = [
  {
    id: "1",
    username: "FriendName",
    profileImage: "https://via.placeholder.com/50",
    postImage: "https://via.placeholder.com/300",
    likes: 33,
    description: "This is my friend's post description...",
    time: "hace 2 hrs",
  },
  {
    id: "2",
    username: "FriendName",
    profileImage: "https://via.placeholder.com/50",
    postImage: "https://via.placeholder.com/300",
    likes: 33,
    description: "This is my friend's post description...",
    time: "hace 2 hrs",
  }
  
];

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostsAndFriends = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        
        // Fetch de publicaciones
        const postsResponse = await fetch('http://172.20.10.12:3001/api/posts/feed', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const postsData = await postsResponse.json();
        
        // Fetch de amigos
        const friendsResponse = await fetch('http://172.20.10.12:3001/api/user/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const friendsData = await friendsResponse.json();
        
        if (postsResponse.ok && friendsResponse.ok) {
          setPosts(postsData);
          setFriends(friendsData);
        } else {
          console.error('Error al cargar las publicaciones o amigos');
        }
      } catch (error) {
        console.error('Error en la conexión:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsAndFriends();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

/* 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch('http://172.20.10.12:3001/api/posts/feed', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setPosts(data);
        } else {
          console.error('Error al cargar las publicaciones:', data.message);
        }
      } catch (error) {
        console.error('Error en la conexión:', error);
      }
    };

    fetchPosts();
  }, []);
 */


/*   const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
        <Text style={styles.username}>{item.username}</Text>
        <TouchableOpacity style={styles.moreOptions}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: item.postImage }} style={styles.postImage} />

      <View style={styles.actions}>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.commentIcon}>
          <Ionicons name="chatbubble-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <Text style={styles.likes}>{item.likes} Likes</Text>
      <Text style={styles.description}>
        <Text style={styles.username}>{item.username} </Text>
        {item.description}
      </Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );
 */
  
  
  return (
    <View style={styles.container}>
      {/* Encabezado principal */}
      <View style={styles.header}>
        <Text style={styles.title}>GramVibe</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="add-circle-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista del feed */}
{/*       <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      /> */}

      <FlatList
        data={posts}
        renderItem={({ item }) => <PostComponent item={item} />} // Usa el componente PostComponent
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />

      {/* Barra de navegación */}
      <View style={styles.navBar}>
        <TouchableOpacity>
          <Ionicons name="home" size={28} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("MyProfile")}>
          <Ionicons name="person-circle-outline" size={28} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 15,
  },
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
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    padding: 10,
  },
});
