import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { 
  LoginScreen, CreateUserScreen, ModifyUserScreen, ProfileScreen, WelcomeScreen,
  PrincipalScreen
} from './src/scenes'

const Stack = createNativeStackNavigator()

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="PrincipalScreen" component={PrincipalScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} />
      <Stack.Screen name="ModifyUserScreen" component={ModifyUserScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <SafeAreaProvider style={
      {
        padding: StatusBar.currentHeight,
      }
    }>
      <NavigationContainer theme={{
        colors: {
          background: '#ffffff',
        }
      }}>
        <MyStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
