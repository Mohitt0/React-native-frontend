import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import FooterMenu from "../components/menus/FooterMenu";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import PostCard from "../components/PostCard.js";

const MyPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state] = useContext(AuthContext);
  const {token} = state 
  const getmyPost = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "/post/get-user-post",
        {
          headers: {
            Authorization: `Bearer ${token && token}`,
          },
        }
      );

      setLoading(false);

      setPosts(data?.userPost);
    } catch (err) {
      setLoading(false);
    
      alert(err);
    }
  };

  useEffect(() => {
    getmyPost();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <PostCard posts={posts} myPostScreen={true}/>
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
