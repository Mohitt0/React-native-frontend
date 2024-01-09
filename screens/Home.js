import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
import React, { useCallback, useContext, useState } from "react";
import FooterMenu from "../components/menus/FooterMenu.js";
import { PostContext } from "../context/postContext.js";
import PostCard from "../components/PostCard.js";

export default function Home() {
  const [posts, getAllPost] = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(()=>{

    setRefreshing(true);
    getAllPost;
    setTimeout(()=>{
      setRefreshing(false)
    },2000)
  },[])
  return (
    <View style={styles.container}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        <View style={{ margin: 10 }}>
          <PostCard posts={posts} />
        </View>
      </ScrollView>
      <View style={{ backgroundColor: "#ffffff" }}>
        <FooterMenu />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
