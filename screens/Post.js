import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import FooterMenu from "../components/menus/FooterMenu";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { PostContext } from "../context/postContext";
export default function Post({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useContext(PostContext);
  const [state] = useContext(AuthContext);
  const { token } = state;
  const handlePost = async () => {
    try {
      setLoading(true);
      if (!title || !description) {
        alert("Please add all the fields");
      }
      const { data } = await axios.post(
        "/post/create-post",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token && token}`,
          },
        }
      );
      setLoading(false);
      setPosts([...posts, data?.post]);
      alert(data?.message);
      navigation.navigate("Home");
    } catch (error) {
      alert(error.response.data.message);
      
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.heading}>Create a Post</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="add post title"
            placeholderTextColor={"gray"}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="add post description"
            placeholderTextColor={"gray"}
            multiline={true}
            numberOfLines={6}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={handlePost} style={styles.postBtn}>
            <Text style={styles.postText}>Create post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{backgroundColor:"#ffff" }}>
        <FooterMenu />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    // margin: 10,
    marginTop: 40,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  inputBox: {
    borderWidth: 1,
    backgroundColor: "white",
    textAlignVertical: "top",
    paddingTop: 6,
    borderColor: "gray",
    marginTop: 30,
    fontSize: 16,
    paddingLeft: 10,
    width: 320,
    borderRadius: 10,
  },
  postBtn: {
    backgroundColor: "black",
    marginTop: 30,
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  postText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
