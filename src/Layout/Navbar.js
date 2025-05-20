import React, { useState } from "react";
import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHome, FaUserAlt, FaList, FaSun, FaMoon } from "react-icons/fa";

export default function AppNavbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Toggle between dark and light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Theme-based styles
  const themeStyles = {
    background: isDarkMode
      ? "linear-gradient(135deg, #0a192f, #112240)"
      : "linear-gradient(135deg, #f0f0f0, #ffffff)",
    textColor: isDarkMode ? "#ccd6f6" : "#333333",
    primaryColor: isDarkMode ? "#00ffff" : "#007bff",
    hoverColor: isDarkMode ? "#00b3b3" : "#0056b3",
  };

  return (
    <BootstrapNavbar
      bg={isDarkMode ? "dark" : "light"}
      variant={isDarkMode ? "dark" : "light"}
      expand="lg"
      sticky="top"
      style={{ background: themeStyles.background }}
    >
      <Container>
        {/* Brand Logo */}
        <BootstrapNavbar.Brand as={Link} to="/dashboard/" style={{ color: themeStyles.primaryColor }}>
          <FaHome size={30} className="mr-2" />
          Admin
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />

        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Manage Users Link */}
            <Nav.Link
              as={Link}
              to="/dashboard/manageuser"
              style={{ color: themeStyles.textColor }}
              className="nav-link-hover"
            >
              <FaList className="mr-2" />
              Manage Users
            </Nav.Link>

            {/* Add User Link */}
            <Nav.Link
              as={Link}
              to="/dashboard/adduser"
              style={{ color: themeStyles.textColor }}
              className="nav-link-hover"
            >
              <FaUserAlt className="mr-2" />
              Add User
            </Nav.Link>

            {/* More Dropdown */}
            <NavDropdown
              title="More"
              id="basic-nav-dropdown"
              style={{ color: themeStyles.textColor }}
              className="nav-link-hover"
            >
              <NavDropdown.Item
                as={Link}
                to="/dashboard/profile"
                style={{ color: themeStyles.textColor }}
              >
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/dashboard/settings"
                style={{ color: themeStyles.textColor }}
              >
                Settings
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                as={Link}
                to="/dashboard/"
                onClick={() => window.location.reload()}
                style={{ color: themeStyles.textColor }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>

            {/* Theme Toggle Button */}
            <Button
              variant="link"
              onClick={toggleTheme}
              style={{ color: themeStyles.primaryColor }}
              className="ml-3"
            >
              {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </Button>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}