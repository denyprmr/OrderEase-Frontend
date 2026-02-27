import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-section brand">
          <h2>OrderEase</h2>
          <p>
            Making online shopping simple, fast, and reliable.
            Experience seamless ordering with world-class service.
          </p>
        </div>

        {/* Company Links */}
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section newsletter">
          <h3>Stay Updated</h3>
          <p>Subscribe to get special offers and updates.</p>
          <div className="newsletter-box">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} OrderEase. All rights reserved.</p>
        <div className="social-icons">
          <a href="#">🌐</a>
          <a href="#">🐦</a>
          <a href="#">📘</a>
          <a href="#">📸</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
