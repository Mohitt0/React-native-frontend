import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const AuthContext = createContext();

//provider
export const AuthProvider = ({children}) => {
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const loadLocalData = async () => {
      let data = await AsyncStorage.getItem("@auth");
      let loginData = JSON.parse(data);
      setState({ ...state, user: loginData?.user, token: loginData?.token });
    };
    loadLocalData();
  }, []);
  let token = state && state.token;
  axios.defaults.baseURL = "https://react-native-server-blgg.onrender.com/api/v1"
  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};
