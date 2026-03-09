import { createContext, useState } from "react";
import API from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user,setUser] = useState(null);

  const login = async(email,password) => {

    const res = await API.post("/login",{email,password});

    localStorage.setItem("token",res.data.token);

    setUser(res.data.user);
  }

  return(
    <AuthContext.Provider value={{user,login,logout}}>
      {children}
    </AuthContext.Provider>
  )

}