import { createContext, useContext, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {

    setLoading(true);
    setError(null);

    try {

      // ✅ USE AXIOS INSTANCE (IMPORTANT)
      const res = await axiosInstance.post(
        "/auth/login",
        { email, password }
      );

      console.log("Login Response:", res.data);

      const accessToken = res?.data?.data?.accessToken;
      const userData = res?.data?.data?.user;

      if (!accessToken) {
        throw new Error("Token missing from backend");
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);

    } catch (err) {

      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      setUser(null);
      setError("Invalid Email or Password");

      throw err;

    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};