import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./SignupPage.css";

function Signup() {

  const navigate = useNavigate();

  // STATE VARIABLES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // SIGNUP BUTTON FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      role: "USER"
    };

    try {

      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        newUser
      );

      alert("Signup Successful ✅");

      navigate("/login");

    } catch (err) {

      alert("Signup Failed ❌");

    }
  };

  return (
    <div className="auth-page">
      <div className="signup-container">
        <h2>Create Account 🚀</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button type="submit">Signup</button>

        </form>

        {/* LOGIN LINK */}
        <p className="switch-auth">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;