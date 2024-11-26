import React, { useState, useEffect } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://172.20.10.12:3001';

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/100');
  const [posts, setPosts] = useState([]);
  const [friendsCount, setFriendsCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');
        
        if (!token || !userId) {
          console.error('Token or UserId is missing');
          return;
        }
        
        console.log('Token and UserId found:', { token, userId });
        
        const response = await fetch(`${BASE_URL}/api/user/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          //console.log('Profile data fetched successfully:', data);
          //prifilePic
          console.log('Profile picture:', data.user.profilePicture);
          
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
  }, []);

  const handleSaveChanges = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('Token is missing');
        return;
      }

      const response = await fetch(`${BASE_URL}/api/user/profile/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
          description,
          profilePicture,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.user.username);
        setDescription(data.user.description);
        setProfilePicture(data.user.profilePicture);
        setIsEditing(false);
        Alert.alert('Success', 'Changes saved.');
      } else {
        console.error('Error al actualizar el perfil:', response.status);
      }
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
    }
  };

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
        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.editButtonText}>{isEditing ? 'Save Profile' : 'Edit profile'}</Text>
        </TouchableOpacity>
        {isEditing && (
          <View style={styles.editContainer}>
            <TextInput
              style={styles.input}
              placeholder="New username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="New description"
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              style={styles.input}
              placeholder="New profile picture URL"
              value={profilePicture}
              onChangeText={setProfilePicture}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView style={styles.scrollContent}>


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
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
          <Ionicons name="home" size={28} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("MyProfile")}>
          <Ionicons name="person-circle-outline" size={28} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //marginTop: 40,
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
  editButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  editButtonText: {
    fontSize: 14,
    color: '#000',
  },
  editContainer: {
    width: '100%',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 1,
    marginHorizontal: 10,
    //marginBottom: 140,
    maxHeight: 400,
  },
  postImage: {
    //width: '30%',
    width: '32%',
    aspectRatio: 1,
    height: 100,
    //marginBottom: 2,
    //borderRadius: 5,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    padding: 10,
    paddingTop: 15,
    paddingBottom: 20,
  },
  scrollContent: {
    //marginBottom: 40,
    paddingBottom: 20,

  },
});

export default MyProfile;

