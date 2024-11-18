import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AuthPage = () => {
  const [formType, setFormType] = useState('login');
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const body = await response.json();
        await AsyncStorage.setItem('token', body.token);
        const userId = body._id;
        navigation.navigate('MyProfile', { userId });
      } else {
        Alert.alert('Login failed', 'Please check your credentials');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  const handleFormSwitch = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GramVibe</Text>

      {formType === 'login' && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <Button title="Login" onPress={handleLogin} color="#1E90FF" />
        </View>
      )}

      <View style={styles.registerContainer}>
        <Text style={styles.accountText}>If you don't have an account, click here</Text>
        <TouchableOpacity onPress={handleFormSwitch}>
          <Text style={styles.registerButton}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  registerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  accountText: {
    fontSize: 14,
    color: '#666',
  },
  registerButton: {
    color: '#1E90FF',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AuthPage;
