import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function ForgotPassword() {

  const [email,setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();

    if(email){
      alert("Password reset link sent to your email!");
      navigate("/login");
    }
  };

  return (
    <div className="auth-page">
      <div className="login-container">

        <h2>Forgot Password?</h2>
        <p style={{marginBottom:"20px"}}>
          Enter your registered email
        </p>

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

          <button className="login-btn" type="submit">
            Send Reset Link
          </button>

        </form>

      </div>
    </div>
  );
}

export default ForgotPassword;