import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import InputBox from "../../components/form/InputBox";
import SubmitButton from "../../components/form/SubmitButton";

export default function Register({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      
      setLoading(true);
      if (!name || !email || !password) {
        Alert.alert("Please fill all the fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post(
        "/auth/register",
        { name, email, password }
      );
      alert(data && data.message);
      navigation.navigate("Login");
    } catch (err) {
      alert(err.response.data.message);
      setLoading(false);
    }
  };
  return (
    <View style={style.container}>
      <Text style={style.pageTitle}>Create Account</Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputBox title={"NAME"} value={name} setValue={setName} />
        <InputBox
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
        btnTitle="Register"
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={style.linkText}>
        Already have an account?{" "}
        <Text onPress={() => navigation.navigate("Login")} style={style.link}>
          Sign in
        </Text>
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  pageTitle: {
    fontSize: 25,
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
