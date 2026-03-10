import { createContext, useState, useEffect } from "react";
import API from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await API.post("/login", { email, password });

    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);

    return res.data.user;
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await API.get("/me");
      setUser(res.data);
      return res.data;
    } catch (error) {
      setUser(null);
      localStorage.removeItem("token");
      return null;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchCurrentUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, fetchCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
