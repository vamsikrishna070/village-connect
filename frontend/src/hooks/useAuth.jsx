import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "@/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("village_token");
    if (!token) {
      setLoading(false);
      return;
    }
    getMe()
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("village_token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (token) => {
    localStorage.setItem("village_token", token);
    getMe()
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("village_token");
        setUser(null);
      });
  };

  const logout = () => {
    localStorage.removeItem("village_token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
