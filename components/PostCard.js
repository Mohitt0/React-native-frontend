import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useContext, useState } from "react";
import moment from "moment";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useNavigation } from "@react-navigation/native";
import EditModal from "./EditModal";

const PostCard = ({ posts, myPostScreen }) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState({});
  const [state] = useContext(AuthContext);
  const { token } = state;
  const navigation = useNavigation();
  const handleDeletePromt = async (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => {
          return;
        },
      },
      {
        text: "Delete",
        onPress: async () => {
          handleDelete(id);
        },
      },
    ]);
  };
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `/post/delete-post/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token && token}`,
          },
        }
      );
      setLoading(false);
      alert(data?.message);
      navigation.push("Mypost");
    } catch (error) {
      setLoading(false);
      
      alert(error);
    }
  };
  return (
    <View>
      <Text style={styles.heading}>Total Posts {posts?.length}</Text>
      {myPostScreen && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          post = {post}
        />
      )}
      {posts?.map((post, index) => (
        <View style={styles.card} key={index}>
          {myPostScreen && (
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={{ marginHorizontal: 20 }}>
                <FontAwesome5
                  color={"darkblue"}
                  size={16}
                  name="pen"
                  onPress={() =>{ setPost(post),setModalVisible(true)}}
                />
              </Text>
              <Text>
                <FontAwesome5
                  color={"red"}
                  size={16}
                  name="trash"
                  onPress={() => handleDeletePromt(post?._id)}
                />
              </Text>
            </View>
          )}

          <Text style={styles.title}>Title : {post?.title}</Text>
          <Text>Description : {post?.description}</Text>
          <View style={styles.footer}>
            {post?.postedBy?.name && (
              <Text>
                {""}
                <FontAwesome5 color={"orange"} name="user" />{" "}
                {post?.postedBy?.name}
              </Text>
            )}

            <Text>
              {""}
              <FontAwesome5 color={"orange"} name="clock" />{" "}
              {moment(post?.createdAt).format("DD:MM:YY")}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};
export default PostCard;
const styles = StyleSheet.create({
  heading: {
    color: "green",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    width: "100%",
    borderWidth: 0.5,
    borderColor: "gray",
    padding: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
