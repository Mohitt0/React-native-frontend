import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function SubmitButton({btnTitle,handleSubmit,loading}) {
  return (
    <TouchableOpacity onPress={handleSubmit} style={style.submitBtn}>
        <Text style={style.text}>
            {loading? "Loading..." : btnTitle}
        </Text>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
    submitBtn:{
        backgroundColor: "#1e2225",
        padding: 10,
        borderRadius: 80,
        marginHorizontal: 20,
        marginBottom: 20,
        height:50,
        justifyContent: "center"
    },
    text:{
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20
    }
})