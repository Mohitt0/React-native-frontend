import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { Icon, Input } from "react-native-elements";

export default function InputBox({
  title,
  keyboardType,
  autoComplete,
  secureTextEntry = false,
  value,
  setValue,
  autoCapitalize,
}) {
  return (
    <View>
      <View style={{ marginHorizontal: 10 }}>
        <Text>{title}</Text>
      </View>
      <View>
        <Input
          leftIcon={
            <Icon
              name={title === "EMAIL" ? "email" : "lock"}
              size={24}
              color="#000"
            />
          }
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
    </View>
  );
}
const style = StyleSheet.create({
  inputBox: {
    // backgroundColor: "#fff",
    // height: 40,
    // marginBottom: 20,
    // marginTop: 10,
    borderRadius: 5,
    fontSize: 16,
    paddingLeft: 10,
  },
});
