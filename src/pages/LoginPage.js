import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔥 CALL BACKEND LOGIN API
      await login(email, password);

      // ✅ REDIRECT AFTER SUCCESS
      navigate("/");

    } catch (err) {
      alert("Invalid Email or Password ❌");
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
              onChange={(e)=>setEmail(e.target.value)}
            />
            <label>Email Address</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>

          <br /><br />

          <p 
            className="forgot-link" 
            onClick={() => navigate("/forgot-password")}
            style={{cursor:"pointer"}}
          >
            Forgot Password?
          </p>

          <p 
            className="forgot-link" 
            onClick={() => navigate("/signup")}
            style={{cursor:"pointer"}}
          >
            Don’t have an account? Sign up
          </p>

        </form>
      </div>

    </div>
  );
}

export default LoginPage;