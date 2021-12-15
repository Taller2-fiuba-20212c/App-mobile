import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { 
  LoginScreen, RegisterScreen, ModifyUserScreen, ProfileScreen, WelcomeScreen,
  PrincipalScreen, CourseScreen, ContentCourseScreen, SearchScreen, VideoClassScreen, 
  UserScreen, EditCourseScreen, CreateCourseScreen, CreateCourseSecondScreen, 
  CreateCourseThirdScreen, ExtraInfoScreen, CreateUnitScreen, EditUnitScreen,
  CreateExamScreen
} from './src/scenes';

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
      <Stack.Screen name="CreateExamScreen" component={CreateExamScreen}/>
      <Stack.Screen name="VideoClassScreen" component={VideoClassScreen}/>
      <Stack.Screen name="ExtraInfoScreen" component={ExtraInfoScreen}/>
      <Stack.Screen name="CreateCourseSecondScreen" component={CreateCourseSecondScreen}/>
      <Stack.Screen name="LoginScreen" component={LoginScreen}/>
      <Stack.Screen name="CreateUnitScreen" component={CreateUnitScreen}/>
      <Stack.Screen name="EditUnitScreen" component={EditUnitScreen}/>
      <Stack.Screen name="CreateCourseThirdScreen" component={CreateCourseThirdScreen}/>
      <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
      <Stack.Screen name="PrincipalScreen" component={TabScreen} />
      <Stack.Screen name="UserScreen" component={UserScreen}/>
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
      <Stack.Screen name="ModifyUserScreen" component={ModifyUserScreen}/>
      <Stack.Screen name="CreateCourseScreen" component={CreateCourseScreen}/>
      <Stack.Screen name="EditCourseScreen" component={EditCourseScreen}/>
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
