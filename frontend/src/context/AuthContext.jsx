import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/axios.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (error) {
        console.error("Error loading user", error);
        setToken("");
        localStorage.removeItem("authToken");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  const login = (data) => {
    localStorage.setItem("authToken", data.token);
    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    delete api.defaults.headers.common["Authorization"];
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
