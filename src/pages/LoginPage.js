import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // 🔥 Call AuthContext login function
      await login(email, password);

      // ✅ Redirect after successful login
      navigate("/");
    } catch (err) {
      console.error("Login Error:", err);
      alert("Invalid Email or Password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="login-container">
        <h2>Welcome Back 👋</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email Address</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <br />
          <br />

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