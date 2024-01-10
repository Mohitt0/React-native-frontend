import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import FooterMenu from "../components/menus/FooterMenu";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import PostCard from "../components/PostCard.js";

const MyPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state] = useContext(AuthContext);
  const { token } = state;
  const getmyPost = async () => {
    try {
      const { data } = await axios.get("/post/get-user-post", {
        headers: {
          Authorization: `Bearer ${token && token}`,
        },
      });

      setLoading(false);

      setPosts(data?.userPost);
    } catch (err) {
      setLoading(true);

      alert(err);
    }
  };

  useEffect(() => {
    getmyPost();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ margin: 10 }}>
          {loading && loading === true ? (
            <Text style={{ textAlign: "center" }}>Loading...</Text>
          ) : (
            <PostCard posts={posts} myPostScreen={true} />
          )}
        </View>
      </ScrollView>
      <View style={{ backgroundColor: "#ffffff" }}>
        <FooterMenu />
      </View>
    </View>
  );
};

export default MyPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
