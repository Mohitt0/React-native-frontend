import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

export default function InputBox({
  title,
  keyboardType,
  autoComplete,
  secureTextEntry = false,
  value,
  setValue,
  autoCapitalize
}) {
  return (
    <View>
      <Text>{title}</Text>
      <TextInput
      autoCapitalize={autoCapitalize}
        style={style.inputBox}
        autoCorrect={false}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
    </View>
  );
}
const style = StyleSheet.create({
  inputBox: {
    backgroundColor: "#fff",
    height: 40,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 5,
    fontSize: 12,
    paddingLeft: 10,
  },
});
