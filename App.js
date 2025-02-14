import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Import screens
import HomeScreen from "./screens/Home";
import SearchScreen from "./screens/Search";
import LibraryScreen from "./screens/Library";
import ProfileScreen from "./screens/Profile";
import LoginScreen from "./screens/Login";
import SignUpScreen from "./screens/SignUp";
import LoginFormPage from "./screens/LoginFormPage";
import SongDetailScreen from "./screens/SongDetail";
import SettingsScreen from "./screens/Settings";
import UploadScreen from "./screens/Upload";
import PlaylistDetail from './screens/PlaylistDetail';
import UserPlayList from './screens/UserPlayList';
import PlayListButton from "./components/PlayListButton";
import CommentScreen from "./screens/CommentScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Reusable top bar component
function ScreenWithTopBar({ navigation, children, title }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topBar}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-circle-outline" size={30} color="#f1f1f1" />
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
}

function HomeWithTopBar({ navigation }) {
  return <ScreenWithTopBar navigation={navigation} title="Tunely"><HomeScreen /></ScreenWithTopBar>;
}

function SearchWithTopBar({ navigation }) {
  return <ScreenWithTopBar navigation={navigation} title="Search"><SearchScreen /></ScreenWithTopBar>;
}

function LibraryWithTopBar({ navigation }) {
  return <ScreenWithTopBar navigation={navigation} title="Library"><LibraryScreen /></ScreenWithTopBar>;
}

function UserPlayListWithTopBar({ navigation }) {
  return (
    <ScreenWithTopBar navigation={navigation} title="Playlists">
      <View style={styles.container}>
      <PlayListButton title="Playlists" />
      <UserPlayList />
      </View>
    </ScreenWithTopBar>
  );
}

//stack for home screen
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeWithTopBar} />
      <Stack.Screen name="PlaylistDetail" component={PlaylistDetail} />
    </Stack.Navigator>
  );
}

//stack for library screen
function LibraryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LibraryScreen" component={LibraryWithTopBar} />
      <Stack.Screen 
        name="UserPlayList" 
        component={UserPlayListWithTopBar}
        options={{
          presentation: 'card',
          animationEnabled: true
        }}
      />
      <Stack.Screen name="PlaylistDetail" component={PlaylistDetail} />
    </Stack.Navigator>
  );
}

// Bottom tab navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Library") {
            iconName = focused ? "library" : "library-outline";
          } 
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#f1f1f1",
        tabBarInactiveTintColor: "#666",
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchWithTopBar} />
      <Tab.Screen name="Library" component={LibraryStack} />
    </Tab.Navigator>
  );
}

// Main App component
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={TabNavigator} />
          <Stack.Screen 
            name="SongDetail" 
            component={SongDetailScreen} 
            options={{ 
              presentation: 'modal', 
              cardStyle: { backgroundColor: 'transparent' } 
            }} 
          />
          <Stack.Screen 
          name="CommentScreen" 
          component={CommentScreen} 
          options={{ 
            presentation: 'modal',
            headerShown: false 
          }}
        />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="LoginFormPage" component={LoginFormPage} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Upload" component={UploadScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
