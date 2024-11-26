import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthPage from './Pages/LoginForm.jsx';
import HomePage from './Pages/Home.jsx';
import RegisterForm from './Pages/RegisterForm.jsx';
import MyProfile from './Pages/MyProfile.jsx';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen 
          name="AuthPage" 
          component={AuthPage} 
          options={{ title: 'Auth', headerShown: false }} 
        />
        
      
        <Stack.Screen 
          name="HomePage" 
          component={HomePage} 
          options={{ title: 'Home', headerShown: false }} 
        />

        <Stack.Screen 
          name="Register" 
          component={RegisterForm} 
          options={{ title: 'Home', headerShown: false }} 
        />

        <Stack.Screen 
          name="MyProfile" 
          component={MyProfile} 
          options={{ title: 'Home', headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
