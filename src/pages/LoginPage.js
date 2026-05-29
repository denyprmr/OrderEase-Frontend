import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { loginUser } from "../redux/slices/authSlice";

import "./LoginPage.css";



function LoginPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();



  // ✅ Redux state
  const { loading, error } = useSelector(
    (state) => state.auth
  );



  // ✅ Local form state
  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");



  /* =========================
     HANDLE LOGIN
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();



    // ✅ Validation
    if (
      !email.trim() ||
      !password.trim()
    ) {
      alert("Please fill all fields");

      return;
    }



    try {
      // ✅ Redux login
      await dispatch(
        loginUser({
          email,
          password,
        })
      ).unwrap();



      // ✅ Redirect after success
      navigate("/profile");
    } catch (err) {
      console.error(
        "Login Error:",
        err
      );

      alert(
        err ||
          "Invalid Email or Password ❌"
      );
    }
  };



  return (
    <div className="auth-page">
      <div className="login-container">

        <h2>
          Welcome Back 👋
        </h2>



        <form onSubmit={handleSubmit}>

          {/* EMAIL */}
          <div className="input-group">
            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              autoComplete="email"
            />

            <label>
              Email Address
            </label>
          </div>



          {/* PASSWORD */}
          <div className="input-group">
            <input
              type="password"
              required
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              autoComplete="current-password"
            />

            <label>Password</label>
          </div>



          {/* ERROR */}
          {error && (
            <p className="error-message">
              {error}
            </p>
          )}



          {/* SUBMIT BUTTON */}
          <button
            className="login-btn"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>



          <br />
          <br />



          {/* FORGOT PASSWORD */}
          <p
            className="forgot-link"
            onClick={() =>
              navigate(
                "/forgot-password"
              )
            }
            style={{
              cursor: "pointer",
            }}
          >
            Forgot Password?
          </p>



          {/* SIGNUP */}
          <p
            className="forgot-link"
            onClick={() =>
              navigate("/signup")
            }
            style={{
              cursor: "pointer",
            }}
          >
            Don’t have an account?
            Sign up
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;