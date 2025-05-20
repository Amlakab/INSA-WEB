import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav, Modal, Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import "./HomePage.css";
import { NavDropdown } from "react-bootstrap";
import {
  FaUser,
  FaEnvelope,
  FaCity,
  FaKey,
  FaUserTag,
  FaRocket,
  FaCode,
  FaUsers,
  FaPhone,
  FaMapMarker,
  FaLinkedin,
  FaGithub,
  FaSun,
  FaMoon,
  FaArrowLeft,
  FaArrowRight,
  FaDownload,
  FaPlayCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from "../User/UserService";
import insaprofile from "../images/insaprofile.png";
import logo2 from "../images/logo2.jpeg";

const News8 = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [city, setCity] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupRole, setSignupRole] = useState("USER");
  const [signupErrorMessage, setSignupErrorMessage] = useState("");

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const themeStyles = {
    background: isDarkMode
      ? "linear-gradient(135deg, #0a192f, #112240)"
      : "linear-gradient(135deg, #f0f0f0, #ffffff)",
    textColor: isDarkMode ? "#ccd6f6" : "#333333",
    primaryColor: isDarkMode ? "#00ffff" : "#007bff",
    secondaryColor: isDarkMode ? "#00b3b3" : "#0056b3",
    modalBackground: isDarkMode ? "#112240" : "#ffffff",
    modalText: isDarkMode ? "#ccd6f6" : "#333333",
    inputBackground: isDarkMode ? "#0a192f" : "#f8f9fa",
    inputBorder: isDarkMode ? "1px solid #00ffff" : "1px solid #007bff",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.login(email, password);
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);
        Swal.fire({
          title: "Login successful!",
          icon: "success",
          confirmButtonText: "OK",
          iconColor: themeStyles.primaryColor,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        }).then(() => {
          onLogin();
          if (response.role === "ADMIN") {
            navigate("/dashboard");
          } else {
            navigate("/userdashboard");
          }
        });
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.signup({
        name,
        email: signupEmail,
        city,
        password: signupPassword,
        role: signupRole,
      });
      if (response.status === 200) {
        Swal.fire({
          title: "Signup successful!",
          text: "Please login.",
          icon: "success",
          confirmButtonText: "OK",
          iconColor: themeStyles.primaryColor,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        }).then(() => {
          setShowSignup(false);
          setShowLogin(true);
        });
      }
    } catch (error) {
      setSignupErrorMessage("Signup failed. Try again.");
    }
  };

  return (
    <Container
      fluid
      style={{
        background: themeStyles.background,
        color: themeStyles.textColor,
        fontFamily: "'Orbitron', sans-serif",
        paddingTop: "80px",
      }}
    >
        {/* Fixed Navbar */}
        <Navbar
        bg={isDarkMode ? "dark" : "light"}
        variant={isDarkMode ? "dark" : "light"}
        expand="lg"
        fixed="top"
        style={{ borderBottom: `1px solid ${themeStyles.primaryColor}` }}
      >
        <Navbar.Brand
          href="#home"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "1.5rem",
            color: themeStyles.primaryColor,
          }}
        >
          <img src={logo2} alt="Insa 1" style={{ width: "60%", marginLeft: "20px", maxWidth: "500px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Home Link */}
            <Nav.Link
              as={NavLink}
              to="/"
              style={{
                marginLeft: "20px",
                color: themeStyles.primaryColor,
                transition: "color 0.3s, border-bottom 0.3s",
                borderBottom: "2px solid transparent",
              }}
              className="nav-link-hover"
              activeClassName="active"
            >
              Home
            </Nav.Link>

            {/* About Link */}
            <Nav.Link
              as={NavLink}
              to="/about"
              style={{
                marginLeft: "20px",
                color: themeStyles.primaryColor,
                transition: "color 0.3s, border-bottom 0.3s",
                borderBottom: "2px solid transparent",
              }}
              className="nav-link-hover"
              activeClassName="active"
            >
              About
            </Nav.Link>

            {/* Services Link */}
            <Nav.Link
              as={NavLink}
              to="/service"
              style={{
                marginLeft: "20px",
                color: themeStyles.primaryColor,
                transition: "color 0.3s, border-bottom 0.3s",
                borderBottom: "2px solid transparent",
              }}
              className="nav-link-hover"
              activeClassName="active"
            >
              Services
            </Nav.Link>

            {/* Blog Link */}
            <Nav.Link
              as={NavLink}
              to="/blog"
              style={{
                marginLeft: "20px",
                color: themeStyles.primaryColor,
                transition: "color 0.3s, border-bottom 0.3s",
                borderBottom: "2px solid transparent",
              }}
              className="nav-link-hover"
              activeClassName="active"
            >
              Blog
            </Nav.Link>

            {/* Resource Dropdown */}
            <NavDropdown
              title="Resource"
              id="basic-nav-dropdown"
              style={{
                marginLeft: "20px",
                color: themeStyles.primaryColor,
                transition: "color 0.3s, border-bottom 0.3s",
                borderBottom: "2px solid transparent",
              }}
              className="nav-link-hover"
              menuVariant={isDarkMode ? "dark" : "light"} // Set dropdown menu variant
            >
              <NavDropdown.Item
                as={NavLink}
                to="/document"
                style={{
                  color: themeStyles.textColor,
                  backgroundColor: themeStyles.modalBackground,
                }}
              >
                Document
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/video"
                style={{
                  color: themeStyles.textColor,
                  backgroundColor: themeStyles.modalBackground,
                }}
              >
                Video
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="#"
                style={{
                  color: themeStyles.textColor,
                  backgroundColor: themeStyles.modalBackground,
                }}
              >
                Audio
              </NavDropdown.Item>
            </NavDropdown>

            {/* Team Link */}
            <Nav.Link
              as={NavLink}
              to="/team"
              style={{
                marginLeft: "20px",
                color: themeStyles.primaryColor,
                transition: "color 0.3s, border-bottom 0.3s",
                borderBottom: "2px solid transparent",
              }}
              className="nav-link-hover"
              activeClassName="active"
            >
              Team
            </Nav.Link>

            {/* Contact Link */}
            <Nav.Link
              as={NavLink}
              to="/contact"
              style={{
                marginLeft: "20px",
                color: themeStyles.primaryColor,
                transition: "color 0.3s, border-bottom 0.3s",
                borderBottom: "2px solid transparent",
              }}
              className="nav-link-hover"
              activeClassName="active"
            >
              Contact
            </Nav.Link>

            {/* Login Link */}
            <Nav.Link
              onClick={() => setShowLogin(true)}
              style={{
                marginLeft: "20px",
                color: themeStyles.primaryColor,
                transition: "color 0.3s, border-bottom 0.3s",
                borderBottom: "2px solid transparent",
              }}
              className="nav-link-hover"
            >
              Login
            </Nav.Link>

            {/* Signup Link */}
            <Nav.Link
              onClick={() => setShowSignup(true)}
              style={{
                marginLeft: "20px",
                color: themeStyles.primaryColor,
                transition: "color 0.3s, border-bottom 0.3s",
                borderBottom: "2px solid transparent",
              }}
              className="nav-link-hover"
            >
              Signup
            </Nav.Link>

            {/* Theme Toggle Link */}
            <Nav.Link onClick={toggleTheme} className="nav-link-hover">
              {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar> 

      {/* News Section */}
      <section
  className="p-5"
  style={{
    background: themeStyles.background,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
  }}
>
  <Row className="align-items-center">
    <Col md={6} className="text-center">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 style={{ color: themeStyles.primaryColor }}>INSA Empowers Ethiopians Through Cybersecurity Awareness Campaigns</h1>
        <p style={{ color: themeStyles.textColor, fontSize: "1.2rem", lineHeight: "1.8" }}>
          INSA’s cybersecurity awareness campaigns are playing a pivotal role in educating the public and organizations about safe online practices, 
          fostering a more cyber-resilient society in Ethiopia. As digital transformation accelerates, the risks of cyber threats, online fraud, data breaches, and digital misinformation continue to rise, making cybersecurity awareness a national priority. 
          INSA has launched comprehensive educational initiatives targeting individuals, businesses, government agencies, and academic institutions to promote best practices in digital security. 
          These campaigns focus on critical areas such as password management, phishing prevention, secure online transactions, social media safety, and data privacy protection, empowering users to identify and mitigate cyber risks effectively.
           Through public workshops, online training sessions, school outreach programs, and media campaigns, INSA ensures that cybersecurity education reaches a wide audience, fostering a culture of digital responsibility. 
           The agency also collaborates with universities, private sector organizations, and international cybersecurity bodies to develop cybersecurity toolkits, guidelines, and awareness materials
            tailored to different sectors and user groups. Businesses and government institutions receive specialized training on cyber risk management, secure infrastructure deployment, and compliance with cybersecurity policies
            , strengthening Ethiopia’s overall defense against cyberattacks. Additionally, INSA leverages social media campaigns, TV and radio broadcasts, and online awareness drives to educate citizens about emerging cyber threats and how to protect themselves from malicious actors. These efforts align with Ethiopia’s Digital Ethiopia 2025 Strategy, ensuring the nation’s digital ecosystem is not only advanced but also secure. By empowering individuals and organizations with cybersecurity knowledge, INSA is building a safer digital environment, reducing cybercrime, and reinforcing Ethiopia’s resilience against evolving online threats. Through continuous education and proactive awareness initiatives, INSA remains at the forefront of protecting Ethiopia’s digital future while promoting responsible and secure online behavior across society.
        </p>
      </motion.div>
    </Col>
    <Col md={6} className="text-center">
      <motion.img
        src={insaprofile} // Replace with an appropriate image for the news
        style={{ width: "80%", maxWidth: "500px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
        alt="INSA Cybersecurity Awareness"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </Col>
  </Row>
</section>

      {/* Login Modal */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Modal.Header
            closeButton
            style={{
              background: themeStyles.modalBackground,
              borderBottom: `1px solid ${themeStyles.primaryColor}`,
            }}
          >
            <Modal.Title style={{ color: themeStyles.primaryColor }}>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: themeStyles.modalBackground }}>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formLoginEmail">
                <Form.Label style={{ color: themeStyles.primaryColor }}>
                  <FaEnvelope /> Email
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    background: themeStyles.inputBackground,
                    color: themeStyles.modalText,
                    border: themeStyles.inputBorder,
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formLoginPassword" className="mt-3">
                <Form.Label style={{ color: themeStyles.primaryColor }}>
                  <FaKey /> Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    background: themeStyles.inputBackground,
                    color: themeStyles.modalText,
                    border: themeStyles.inputBorder,
                  }}
                />
              </Form.Group>
              {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
              <Button
                type="submit"
                variant="dark"
                className="mt-4 w-100"
                style={{
                  background: `linear-gradient(135deg, ${themeStyles.primaryColor}, ${themeStyles.secondaryColor})`,
                  border: "none",
                  color: themeStyles.modalText,
                }}
              >
                Login
              </Button>
            </Form>
          </Modal.Body>
        </motion.div>
      </Modal>

      {/* Signup Modal */}
      <Modal show={showSignup} onHide={() => setShowSignup(false)} centered>
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Modal.Header
            closeButton
            style={{
              background: themeStyles.modalBackground,
              borderBottom: `1px solid ${themeStyles.primaryColor}`,
            }}
          >
            <Modal.Title style={{ color: themeStyles.primaryColor }}>Signup</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: themeStyles.modalBackground }}>
            <Form>
              <Form.Group controlId="formSignupEmail">
                <Form.Label style={{ color: themeStyles.primaryColor }}>
                  <FaEnvelope /> Email
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  style={{
                    background: themeStyles.inputBackground,
                    color: themeStyles.modalText,
                    border: themeStyles.inputBorder,
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formSignupPassword" className="mt-3">
                <Form.Label style={{ color: themeStyles.primaryColor }}>
                  <FaKey /> Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  style={{
                    background: themeStyles.inputBackground,
                    color: themeStyles.modalText,
                    border: themeStyles.inputBorder,
                  }}
                />
              </Form.Group>
              <Button
                type="submit"
                variant="dark"
                className="mt-4 w-100"
                style={{
                  background: `linear-gradient(135deg, ${themeStyles.primaryColor}, ${themeStyles.secondaryColor})`,
                  border: "none",
                  color: themeStyles.modalText,
                }}
              >
                Signup
              </Button>
            </Form>
          </Modal.Body>
        </motion.div>
      </Modal>
    </Container>
  );
};

export default News8;