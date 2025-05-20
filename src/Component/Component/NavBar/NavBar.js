import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaRocket, FaUserAstronaut, FaSignInAlt, FaUserPlus } from 'react-icons/fa'; // Futuristic icons
import './NavBar.css'; // Custom CSS for futuristic styling

const NavBar = () => {
  const location = useLocation();

  // Hover animation for buttons
  const hoverAnimation = {
    scale: 1.1,
    transition: { duration: 0.3 },
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent py-3">
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <motion.div whileHover={hoverAnimation}>
            <span style={{ color: '#00ff88', fontFamily: "'Orbitron', sans-serif", fontSize: '1.5rem' }}>
              FUTURE TECH
            </span>
          </motion.div>
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {/* Home Link */}
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${
                  location.pathname === '/' ? 'active' : ''
                }`}
              >
                <motion.div whileHover={hoverAnimation} className="d-flex align-items-center">
                  <FaHome className="me-2" />
                  <span>Home</span>
                </motion.div>
              </Link>
            </li>

            {/* Features Link */}
            <li className="nav-item">
              <Link
                to="/features"
                className={`nav-link ${
                  location.pathname === '/features' ? 'active' : ''
                }`}
              >
                <motion.div whileHover={hoverAnimation} className="d-flex align-items-center">
                  <FaRocket className="me-2" />
                  <span>Features</span>
                </motion.div>
              </Link>
            </li>

            {/* About Link */}
            <li className="nav-item">
              <Link
                to="/about"
                className={`nav-link ${
                  location.pathname === '/about' ? 'active' : ''
                }`}
              >
                <motion.div whileHover={hoverAnimation} className="d-flex align-items-center">
                  <FaUserAstronaut className="me-2" />
                  <span>About</span>
                </motion.div>
              </Link>
            </li>
          </ul>

          {/* Auth Buttons */}
          <ul className="navbar-nav">
            {/* Login Button */}
            <li className="nav-item">
              <Link to="/login" className="btn btn-outline-light mx-2">
                <motion.div whileHover={hoverAnimation} className="d-flex align-items-center">
                  <FaSignInAlt className="me-2" />
                  <span>Login</span>
                </motion.div>
              </Link>
            </li>

            {/* Sign Up Button */}
            <li className="nav-item">
              <Link to="/registration" className="btn btn-light">
                <motion.div whileHover={hoverAnimation} className="d-flex align-items-center">
                  <FaUserPlus className="me-2" />
                  <span>Sign Up</span>
                </motion.div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;