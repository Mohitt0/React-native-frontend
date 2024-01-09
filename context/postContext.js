import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const PostContext = createContext();


export const PostProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

const getAllPost = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "/post/get-all-post"
      );
     
      setLoading(false);
      setPosts(data?.posts);
    } catch (error) {
      alert(error.response.data.message);
     
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllPost();
  }, []);
  return (
    <PostContext.Provider value={[posts, setPosts, getAllPost]}>
      {children}
    </PostContext.Provider>
  );
};
