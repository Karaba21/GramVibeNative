import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthPage from './Pages/LoginForm.jsx'


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthPage">
        <Stack.Screen name="AuthPage" component={AuthPage} options={{ title: 'Auth' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
