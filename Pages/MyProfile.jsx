import React, { useState } from 'react';
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

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigation();

  // Datos hardcodeados
  const [username, setUsername] = useState('UnUsername');
  const [description, setDescription] = useState('My profile description');
  const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/100');

  const hardcodedPosts = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
  ];

  const handleSaveChanges = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Changes saved.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Información del perfil */}
      <View style={styles.header}>
        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.stats}>153 Posts   |   209 Friends</Text>
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

      {/* Grilla de publicaciones */}
      <View style={styles.grid}>
        {hardcodedPosts.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.postImage} />
        ))}
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
          <Ionicons name="home" size={28} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("MyProfile")}>
          <Ionicons name="person-circle-outline" size={28} color="#333" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    marginTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
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
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 160
  },
  postImage: {
    width: '30%',
    height: 100,
    marginBottom: 10,
    borderRadius: 5,
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

export default MyProfile;
