import React, { useState, useEffect } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://172.20.10.12:3001';

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/100');
  const [posts, setPosts] = useState([]);
  const [friendsCount, setFriendsCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        
        if (!token || !userId) {
          console.error('Token or UserId is missing');
          return;
        }
        
        const response = await fetch(`${BASE_URL}/api/user/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.user.username);
          setDescription(data.user.description || "No description available");
          setProfilePicture(data.user.profilePicture || 'https://via.placeholder.com/100');
          setFriendsCount(data.user.friends?.length || 0);
          setPostsCount(data.posts?.length || 0);
          setPosts(data.posts);
        } else {
          console.error('Error al obtener los datos del perfil:', response.status);
        }
      } catch (error) {
        console.error('Error al conectar con el backend:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  return (
    <View contentContainerStyle={styles.container}>
      {/* Información del perfil */}
      <View style={styles.header}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        ) : (
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profilePicture} />
        )}
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.stats}>{postsCount} Posts   |   {friendsCount} Friends</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Grilla de publicaciones */}
        <View style={styles.grid}>
          {posts.map((post, index) => (
            post.imageUrl ? (
              <Image key={index} source={{ uri: `${BASE_URL}/${post.imageUrl.replace(/\\/g, '/')}` }} style={styles.postImage} />
            ) : (
              <Image key={index} source={{ uri: 'https://via.placeholder.com/100' }} style={styles.postImage} />
            )
          ))}
        </View>
      </ScrollView>

      {/* Barra de navegación */}
      <View style={styles.navBarContainer}>
        <View style={styles.navBar}>
            <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
            <Ionicons name="home" size={28} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("MyProfile")}>
            <Ionicons name="person-circle-outline" size={28} color="#333" />
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    paddingVertical: 15,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 20,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  stats: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#666',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 1,
    marginHorizontal: 10,
  },
  postImage: {
    width: '32%',
    aspectRatio: 1,
    height: 100,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  scrollContent: {
    height: '65%',
    //marginBottom: 20,
    
  },
  navBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
  },
});

export default UserProfile;
