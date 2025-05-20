import React from "react";
import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHome, FaUserAlt, FaList } from "react-icons/fa"; 

export default function AppNavbar() {
  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/userdashboard/">
          <FaHome size={30} color="#ffffff" className="mr-2" />
          User
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/userdashboard/profile"> {/* ✅ Matches Dashboard Route */}
              <FaList className="mr-2" />
              View Profile
            </Nav.Link>
            <Nav.Link as={Link} to="/userdashboard/updateprofile"> {/* ✅ Nested Under Dashboard */}
              <FaUserAlt className="mr-2" />
              Update Profile
            </Nav.Link>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/userdashboard/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/dashboard/settings">
                Settings
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/" onClick={() => window.location.reload()}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
