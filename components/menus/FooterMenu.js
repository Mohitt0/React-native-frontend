import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";
export default function FooterMenu() {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={style.container}>
      <TouchableOpacity onPress={()=>navigation.navigate("Home")}>
        <FontAwesome5 style={style.icon} name="home" color={route.name==="Home" && "orange"}/>
        <Text>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate("Post")}>
        <FontAwesome5 style={style.icon} name="plus-square" color={route.name==="Post" && "orange"}/>
        <Text>Post</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate("Mypost")}>
        <FontAwesome5 style={style.icon} name="list" color={route.name==="Mypost" && "orange"} />
        <Text>My Post</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate("Account")}>
        <FontAwesome5 style={style.icon} name="user" color={route.name==="Account" && "orange"}/>
        <Text>Account</Text>
      </TouchableOpacity>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin:16,
    justifyContent: "space-between",
  },
  icon: {
    fontSize: 24,
    alignSelf: "center",
    marginBottom: 3,
  },
});
