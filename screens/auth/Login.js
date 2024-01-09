import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputBox from "../../components/form/InputBox";
import SubmitButton from "../../components/form/SubmitButton";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

export default function Login({ navigation }) {
  const [state, setState] = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("Please fill all the fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      
      const { data } = await axios.post(
        "/auth/login",
        { email, password }
      );
      setState(data);
     
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      alert(data && data.message);
      navigation.navigate("Home");
    } catch (err) {
      alert(err.response.data.message);
     
    }
  };
  const getData = async () => {
    let data = await AsyncStorage.getItem("@auth");
   
  };
  getData();
  return (
    <View style={style.container}>
      <Text style={style.pageTitle}>Login</Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputBox
          autoCapitalize="none"
          title={"EMAIL"}
          keyboardType="email-address"
          autoComplete="email"
          value={email.toLowerCase()}
          setValue={setEmail}
        />
        <InputBox
          title={"PASSWORD"}
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          setValue={setPassowrd}
        />
      </View>
      <SubmitButton
        btnTitle="Login"
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={style.linkText}>
        Not a user?{" "}
        <Text
          onPress={() => navigation.navigate("Register")}
          style={style.link}
        >
          REGISTER
        </Text>
      </Text>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e1d5c9",
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  linkText: {
    textAlign: "center",
  },
  link: {
    color: "red",
    fontWeight: "bold",
  },
});
