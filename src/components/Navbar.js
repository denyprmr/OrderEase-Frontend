import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Navbar() {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // ✅ Safe default value
  const { cartItems = [] } = useContext(CartContext) || {};

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ✅ Fully safe cart count calculation
  const cartCount = cartItems?.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  ) || 0;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">OrderEase</div>

      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Shop</Link></li>
        <li><Link to="/offers">Offers</Link></li>
        <li><Link to="#">Contact</Link></li>

        {/* 🛒 Cart Section */}
        <li>
          <div
            className="cart-container"
            onClick={() => {
              if (!user) {
                navigate("/login", { state: { from: "/cart" } });
              } else {
                navigate("/cart");
              }
            }}
            style={{ cursor: "pointer" }}
          >
            🛒
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </div>
        </li>

        {/* 👤 Auth Section */}
        {user ? (
          <>
            <li>
              <Link to="/profile" className="profile-icon">
                👤
              </Link>
            </li>

            <li>
              <button className="btn btn-primary" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </li>
        )}
      </ul>

      <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
}

export default Navbar;