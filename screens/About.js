import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FooterMenu from "../components/menus/FooterMenu";
export default function About() {
  return (
    <View style={styles.container}>
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
  },
});
