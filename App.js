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
  CreateExamScreen, CreateQuestionScreen, TextClassScreen,
  CompleteExamScreen, MarkExamScreen, AddCollaboratorsScreen, ListExamsScreen,
  WatchCorrectionExamScreen, SearchResultsScreen, ListStudentsScreen
} from './src/scenes';
import AppLoading from 'expo-app-loading';
import { getData } from './src/model';
import { USER_INFO } from './src/consts';
import { GlobalAuthActionsContext, GlobalAuthContext } from './src/model/ContextFactory';
import { ChatsListScreen } from './src/scenes/chatScene';
import ChatScreen from './src/scenes/chatScene/ChatScreen';

const Tab = createBottomTabNavigator();

function ChatStack() {
  const Chats = createNativeStackNavigator();

  return (
    <Chats.Navigator>
      <Chats.Screen name="ChatsList" component={ChatsListScreen} />
      <Chats.Screen name="Chat" component={ChatScreen} />
    </Chats.Navigator>
  );
}

function TabScreen() {
  return (
    <Tab.Navigator 
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarButton: ["ChatsStack"].includes(route.name) ? () => null : undefined,
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
      <Tab.Screen name="ChatsStack" component={ChatStack} />
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
      <Stack.Screen name="ListStudentsScreen" component={ListStudentsScreen}/>
      <Stack.Screen name="CreateExamScreen" component={CreateExamScreen}/>
      <Stack.Screen name="WatchCorrectionExamScreen" component={WatchCorrectionExamScreen}/>
      <Stack.Screen name="SearchResultsScreen" component={SearchResultsScreen}/>
      <Stack.Screen name="MarkExamScreen" component={MarkExamScreen}/>
      <Stack.Screen name="LoginScreen" component={LoginScreen}/>
      <Stack.Screen name="ListExamsScreen" component={ListExamsScreen}/>
      <Stack.Screen name="CompleteExamScreen" component={CompleteExamScreen}/>
      <Stack.Screen name="AddCollaboratorsScreen" component={AddCollaboratorsScreen}/>
      <Stack.Screen name="CreateUnitScreen" component={CreateUnitScreen}/>
      <Stack.Screen name="TextClassScreen" component={TextClassScreen}/>
      <Stack.Screen name="EditCourseScreen" component={EditCourseScreen}/>
      <Stack.Screen name="CreateQuestionScreen" component={CreateQuestionScreen}/>
      <Stack.Screen name="VideoClassScreen" component={VideoClassScreen}/>
      <Stack.Screen name="ExtraInfoScreen" component={ExtraInfoScreen}/>
      <Stack.Screen name="CreateCourseSecondScreen" component={CreateCourseSecondScreen}/>
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
      <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
    </Stack.Navigator>
  )
}

export default function App() {
  const [loading, setLoading] = React.useState(true);
  const [appAuthContext, setAppAuthContext] = React.useState({ user: undefined });

  const loadSession = async () => {
    getData(USER_INFO)
    .then(userSession => {
      console.log("Sesion almacenada", userSession);
      if (userSession !== undefined) {
        setAppAuthContext(prevState => ({ ...prevState, user: userSession }));
      }
      else {
        setAppAuthContext(prevState => ({ ...prevState, user: undefined }));
      }
    })
  }

  return (
    <SafeAreaProvider>
      <GlobalAuthContext.Provider value={appAuthContext}>
				<GlobalAuthActionsContext.Provider value={setAppAuthContext}>
          {loading ?
            <AppLoading
                startAsync={loadSession}
                onFinish={() => setLoading(false)}
                onError={(e) => {
                  console.error(e);
                  setLoading(false);
                }}
            />
          :
            <NavigationContainer theme={{
              colors: {
                background: '#ffffff',
              }
            }}>
              <MyStack />
            </NavigationContainer>
          }
        </GlobalAuthActionsContext.Provider>
      </GlobalAuthContext.Provider>
    </SafeAreaProvider>
  );
}
