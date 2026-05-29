import React, {
  useState,
  useEffect,
} from "react";

import "./Navbar.css";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { logout } from "../redux/slices/authSlice";



function Navbar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();



  // ✅ Redux Auth State
  const { user } = useSelector(
    (state) => state.auth
  );



  // ✅ Redux Cart State
  const { cartItems = [] } = useSelector(
    (state) => state.cart
  );



  const [isOpen, setIsOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);



  /* =========================
     CART COUNT
  ========================= */

  const cartCount =
    cartItems?.reduce(
      (total, item) =>
        total + (item.quantity || 1),

      0
    ) || 0;



  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");
  };



  /* =========================
     NAVBAR SCROLL EFFECT
  ========================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);



  return (
    <nav
      className={`navbar ${
        scrolled ? "scrolled" : ""
      }`}
    >

      {/* LOGO */}
      <div className="logo">
        OrderEase
      </div>



      {/* NAV LINKS */}
      <ul
        className={`nav-links ${
          isOpen ? "active" : ""
        }`}
      >

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/products">
            Shop
          </Link>
        </li>

        <li>
          <Link to="/offers">
            Offers
          </Link>
        </li>

        <li>
          <Link to="#">
            Contact
          </Link>
        </li>



        {/* 🛒 CART */}
        <li>
          <div
            className="cart-container"
            onClick={() => {
              if (!user) {
                navigate("/login", {
                  state: {
                    from: "/cart",
                  },
                });
              } else {
                navigate("/cart");
              }
            }}
            style={{
              cursor: "pointer",
            }}
          >
            🛒

            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}
          </div>
        </li>



        {/* 👤 AUTH */}
        {user ? (
          <>
            <li>
              <Link
                to="/profile"
                className="profile-icon"
              >
                👤
              </Link>
            </li>

            <li>
              <button
                className="btn btn-primary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <button
              className="btn btn-primary"
              onClick={() =>
                navigate("/login")
              }
            >
              Login
            </button>
          </li>
        )}
      </ul>



      {/* MOBILE MENU */}
      <div
        className="menu-toggle"
        onClick={() =>
          setIsOpen(!isOpen)
        }
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
}

export default Navbar;