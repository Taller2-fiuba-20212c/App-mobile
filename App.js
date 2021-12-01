import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { 
  LoginScreen, RegisterScreen, ModifyUserScreen, ProfileScreen, WelcomeScreen,
  PrincipalScreen, CourseScreen, ContentCourseScreen, SearchScreen, VideoClassScreen
} from './src/scenes';

function UserScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>  
      <Text>User screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function TabScreen() {
  return (
    <Tab.Navigator 
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
            ? 'home'
            : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused
            ? 'search'
            : 'search-outline';
          } else if (route.name === 'User') {
            iconName = focused
            ? 'person'
            : 'person-outline';
          }
          return <Ionicons name={iconName} size={30} color={color}/>
        },
        headerShown: false,
        tabBarLabel:() => {return null},
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0
        }
      })}>
      <Tab.Screen name="Home" component={PrincipalScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="User" component={ProfileScreen} />
    </Tab.Navigator>
   );
}

const Stack = createNativeStackNavigator()

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      headerStyle: {
        backgroundColor: 'white',
      },
    }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
      <Stack.Screen name="PrincipalScreen" component={TabScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen}/>
      <Stack.Screen name="CourseScreen" 
        component={CourseScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen name="ContentCourseScreen" 
        component={ContentCourseScreen}
        options={{
          headerShown: true,
          title: 'Content'
        }}
      />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
      <Stack.Screen name="ModifyUserScreen" component={ModifyUserScreen}/>
      <Stack.Screen name="VideoClassScreen" component={VideoClassScreen}/>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
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
