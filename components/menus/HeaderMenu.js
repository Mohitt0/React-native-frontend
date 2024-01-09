import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { AuthContext } from "../../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HeaderMenu() {
  const [state, setState] = useContext(AuthContext);
  const handleLogout = async() =>{
    setState({token:"", user:null});
    await AsyncStorage.removeItem("@auth");
    alert("Logged out successfully");
  }
  return (
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <FontAwesome5
          style={styles.icon}
          name="sign-out-alt"
          color="red"
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 24,
    alignSelf: "center",
    marginBottom: 3,
  },
});
