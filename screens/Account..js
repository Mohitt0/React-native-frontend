import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import FooterMenu from "../components/menus/FooterMenu";
import { AuthContext } from "../context/authContext";
import axios from "axios";
export default function Account() {
  const [state,setState] = useContext(AuthContext);
  const { user, token } = state;
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState(user?.password);
  const [email, setEmail] = useState(user?.email);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        "/auth/update-user",
        {
          name,
          password,
          email,
        },
        {
          headers:{
            Authorization:`Bearer ${token &&  token}`
          }
        }
      );
      setLoading(false);
      let UD = JSON.stringify(data);
      setState({...state,user:UD?.updateUser});
      alert(data && data.message);
    } catch (error) {
      alert(error.response.data.error);
      setLoading(false);
      
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png",
            }}
            style={{ height: 220, width: 200, borderRadius: 100 }}
          />
        </View>
        <Text style={styles.waringText}>
          Currently you can only update your name and Password*
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Name </Text>
          <TextInput
            style={styles.inputBox}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Email </Text>
          <TextInput editable={false} style={styles.inputBox} value={email} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Password </Text>
          <TextInput
            style={styles.inputBox}
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Role </Text>
          <TextInput
            style={styles.inputBox}
            editable={false}
            value={state?.user.role}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
            <Text style={styles.updateBtnText}>{loading?"Please wait":"Update Profile"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterMenu />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 40,
    margin: 10,
  },
  waringText: {
    color: "red",
    textAlign: "center",
    fontSize: 13,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  inputText: {
    fontWeight: "bold",
    width: 70,
    color: "gray",
  },
  inputBox: {
    width: 250,
    backgroundColor: "#fff",
    marginLeft: 10,
    fontSize: 16,
    paddingLeft: 10,
    borderRadius: 6,
  },
  updateBtn: {
    backgroundColor: "#000",
    width: 250,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 30,
  },
  updateBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
