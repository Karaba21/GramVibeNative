import React from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      {/* Encabezado de la publicación */}
      <View style={styles.postHeader}>
        <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
        <Text style={styles.username}>{item.username}</Text>
        <TouchableOpacity style={styles.moreOptions}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Imagen de la publicación */}
      <Image source={{ uri: item.postImage }} style={styles.postImage} />

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
      <Text style={styles.likes}>{item.likes} Likes</Text>
      <Text style={styles.description}>
        <Text style={styles.username}>{item.username} </Text>
        {item.description}
      </Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

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
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      {/* Barra de navegación */}
      <View style={styles.navBar}>
        <TouchableOpacity>
          <Ionicons name="home" size={28} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity>
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
