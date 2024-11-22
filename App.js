import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthPage from './Pages/LoginForm.jsx';
import HomePage from './Pages/Home.jsx';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthPage">
        {/* Pantalla de Autenticación 
        <Stack.Screen 
          name="AuthPage" 
          component={AuthPage} 
          options={{ title: 'Auth', headerShown: false }} 
        />
        */}
        {/* Pantalla Home */}
        <Stack.Screen 
          name="HomePage" 
          component={HomePage} 
          options={{ title: 'Home', headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
