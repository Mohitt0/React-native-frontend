import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import Register from "../../screens/auth/register";
import Login from "../../screens/auth/Login";
import { AuthContext } from "../../context/authContext";
import HeaderMenu from "./HeaderMenu";
import Post from "../../screens/Post";
import About from "../../screens/About";
import Account from "../../screens/Account.";
import MyPost from "../../screens/MyPost";

export default function ScreenMenu() {
  const [state] = useContext(AuthContext);
  const Authenticated = state?.user && state?.token;
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{animation:"none"}} initialRouteName="Login">
      {Authenticated ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Full Stack App",
              headerRight: () => <HeaderMenu />,
            }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{
              headerBackTitle:"Back",
              headerRight: ()=><HeaderMenu/>
            }}
          />
           <Stack.Screen
            name="About"
            component={About}
            options={{
              headerBackTitle:"Back",
              headerRight: ()=><HeaderMenu/>
            }}
          />
            <Stack.Screen
            name="Mypost"
            component={MyPost}
            options={{
              headerBackTitle:"Back",
              headerRight: ()=><HeaderMenu/>
            }}
          />
           <Stack.Screen
            name="Account"
            component={Account}
            options={{
              headerBackTitle:"Back",
              headerRight: ()=><HeaderMenu/>
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
