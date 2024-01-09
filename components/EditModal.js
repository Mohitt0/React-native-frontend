import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useNavigation } from "@react-navigation/native";
const EditModal = ({ modalVisible, setModalVisible, post }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [state] = useContext(AuthContext);
  const { token } = state;
  const navigation = useNavigation();
  const updatePostHandler = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `/post/update-post/${id}`,
        {
          title,
          description
        },
        {
          headers:{
            Authorization: `Bearer ${token && token}`,
          }
        }
      );
      setLoading(false);
      alert(data?.message);
      navigation.push("Home");
    } catch (error) {
      loading(false);
      alert(error.response.data.message);
    }
  };
  useEffect(() => {
    setTitle(post?.title);
    setDescription(post?.description);
  }, [post]);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Update your post</Text>
            <Text>Title</Text>
            <TextInput
              style={styles.inputBox}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <Text>Description</Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.inputBox}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
            <View style={styles.btnContainer}>
              <Pressable
                style={styles.button}
                onPress={() => {
                  updatePostHandler(post && post?._id),
                    setModalVisible(!modalVisible)
                }}
              >
                <Text style={styles.textStyle}>{loading? "Please wait.. ":"Update"}</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputBox: {
    backgroundColor: "lightgray",
    marginBottom: 20,
    marginTop: 10,
        textAlignVertical: "top",
    paddingTop: 8,
    borderColor: "gray",
    fontSize: 16,
    paddingLeft: 10,

    borderRadius: 10,
  },
  btnContainer: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "black",
    width: 100,
    margin: 10,
  },
  buttonOpen: {
    //   backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default EditModal;
