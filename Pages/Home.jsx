import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PostComponent from "./PostComponent";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

import { useNavigation } from "@react-navigation/native";


export default function HomePage() {
  const [posts, setPosts] = useState([]);

  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [caption, setCaption] = useState('');
  const [showCaptionInput, setShowCaptionInput] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const navigation = useNavigation();


  useEffect(() => {
    const fetchPostsAndFriends = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setToken(token);
        
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

  const handleAddPhoto = async () => {
    
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setShowCaptionInput(true);
        const formData = new FormData();
        formData.append('image', {
          uri: result.assets[0].uri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });
        formData.append('caption', caption);

        const token = await AsyncStorage.getItem('token');
        const response = await fetch('http://172.20.10.12:3001/api/posts/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (response.ok) {
          Alert.alert('Success', 'Photo uploaded successfully!');
          setCaption('');
          setShowCaptionInput(false);
          // Refresh posts
          const updatedPostsResponse = await fetch('http://172.20.10.12:3001/api/posts/feed', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const updatedPostsData = await updatedPostsResponse.json();
          setPosts(updatedPostsData);
        } else {
          console.error('Error al subir la foto:', response.status);
        }
      }
    } catch (error) {
      console.error('Error al seleccionar o subir la foto:', error);
    }
  };


  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  const getUserDetails = (userId) => {
    const user = friends.find(friend => friend._id === userId);
    return user ? user : { username: 'Unknown', profilePicture: '' };
  };

  return (
    <View style={styles.container}>
      {/* Encabezado principal */}
      <View style={styles.header}>
        <Text style={styles.title}>GramVibe</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAddPhoto}>
            <Ionicons name="add-circle-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

        {/* Input de caption para la foto (visible solo antes de subir la foto) */}
        {showCaptionInput && (
        <View style={styles.captionInputContainer}>
          <TextInput
            style={styles.captionInput}
            placeholder="Add a caption..."
            value={caption}
            onChangeText={setCaption}
          />
        </View>
      )}

      {/* Lista del feed */}

      <FlatList
        data={posts}
        //renderItem={({ item }) => <PostComponent item={item} token={token} />} // Pasa el token a PostComponent
        // renderItem={({ item }) => <PostComponent item={item} />} // Usa el componente PostComponent
        renderItem={({ item }) => {
          const userDetails = getUserDetails(item.user._id);
          return <PostComponent item={{ ...item, user: userDetails }} token={token} />;
        }}
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
    paddingTop: 15,
    paddingBottom: 30,
  },
  captionInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },

});
