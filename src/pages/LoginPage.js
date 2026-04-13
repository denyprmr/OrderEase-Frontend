import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // 🔹 State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Handle Login Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!email.trim() || !password.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // 🔥 Call AuthContext login
      const response = await login(email, password);

      console.log("Login Success:", response);

      // ✅ Extra safety check (token must exist)
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Token not found after login");
      }

      // ✅ Redirect after success
      navigate("/profile");

    } catch (err) {
      console.error("Login Error:", err);

      alert(
        err?.message || "Invalid Email or Password ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="login-container">
        <h2>Welcome Back 👋</h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="input-group">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <label>Email Address</label>
          </div>

          {/* Password */}
          <div className="input-group">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <label>Password</label>
          </div>

          {/* Submit Button */}
          <button
            className="login-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <br />
          <br />

          {/* Links */}
          <p
            className="forgot-link"
            onClick={() => navigate("/forgot-password")}
            style={{ cursor: "pointer" }}
          >
            Forgot Password?
          </p>

          <p
            className="forgot-link"
            onClick={() => navigate("/signup")}
            style={{ cursor: "pointer" }}
          >
            Don’t have an account? Sign up
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;