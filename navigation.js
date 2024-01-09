import { View, Text } from "react-native";
import React from "react";
import { AuthProvider } from "./context/authContext";
import ScreenMenu from "./components/menus/ScreenMenu";
import { PostProvider } from "./context/postContext";

export default function Rootnavigation() {
  return (
    <AuthProvider>
     <PostProvider>

        <ScreenMenu />
     </PostProvider>
     
    </AuthProvider>
  );
}
