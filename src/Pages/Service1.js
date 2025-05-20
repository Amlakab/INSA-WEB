import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav, Modal, Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { NavDropdown } from "react-bootstrap";
import "./HomePage.css";
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
} from "react-icons/fa";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from "../User/UserService";

// Import images
import insa8 from "../images/insa8.png";
import logo2 from "../images/logo2.jpeg";

const Service1 = ({ onLogin }) => {
  const navigate = useNavigate();

  // State for login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // State for signup
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [city, setCity] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupRole, setSignupRole] = useState("USER");
  const [signupErrorMessage, setSignupErrorMessage] = useState("");

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

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

  // Handle login
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

  // Handle signup
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
            <Nav.Link as={NavLink} to="/" style={{ marginLeft: "20px", color: themeStyles.primaryColor }}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" style={{ marginLeft: "20px", color: themeStyles.primaryColor }}>
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/service" style={{ marginLeft: "20px", color: themeStyles.primaryColor }}>
              Services
            </Nav.Link>
            <Nav.Link as={NavLink} to="/blog" style={{ marginLeft: "20px", color: themeStyles.primaryColor }}>
              Blog
            </Nav.Link>
            <NavDropdown
              title="Resource"
              id="basic-nav-dropdown"
              style={{ marginLeft: "20px", color: themeStyles.primaryColor }}
              menuVariant={isDarkMode ? "dark" : "light"}
            >
              <NavDropdown.Item as={NavLink} to="/document">
                Document
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/video">
                Video
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="#">
                Audio
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to="/team" style={{ marginLeft: "20px", color: themeStyles.primaryColor }}>
              Team
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact" style={{ marginLeft: "20px", color: themeStyles.primaryColor }}>
              Contact
            </Nav.Link>
            <Nav.Link onClick={() => setShowLogin(true)} style={{ marginLeft: "20px", color: themeStyles.primaryColor }}>
              Login
            </Nav.Link>
            <Nav.Link onClick={() => setShowSignup(true)} style={{ marginLeft: "20px", color: themeStyles.primaryColor }}>
              Signup
            </Nav.Link>
            <Nav.Link onClick={toggleTheme} className="nav-link-hover">
              {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Service 1 Content */}
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
          <Col md={6}>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h1 style={{ color: themeStyles.primaryColor }}>Cybersecurity Policy Development</h1>
              <p style={{ color: themeStyles.textColor }}>
                The Information Network Security Agency (INSA) plays a critical role in developing and implementing
                national cybersecurity policies in Ethiopia. As the primary regulatory body, INSA is responsible for
                establishing legal frameworks that govern cybersecurity practices, ensuring that individuals, businesses,
                and government institutions adhere to secure digital operations. The agency formulates policies that
                focus on data protection, risk management, and the prevention of cyber threats, ensuring that national
                security is safeguarded in an increasingly digital world. By developing clear legal standards, INSA
                provides guidelines for organizations on how to collect, store, and process sensitive information while
                ensuring compliance with international cybersecurity regulations.
              </p>
              <p style={{ color: themeStyles.textColor }}>
                Furthermore, INSA's cybersecurity policies define protocols for responding to cyber incidents, setting
                procedures for reporting breaches, mitigating cyber risks, and implementing recovery measures. These
                policies ensure that Ethiopia has a structured approach to handling cyber threats, reducing
                vulnerabilities in critical digital infrastructures such as financial systems, healthcare services, and
                government databases. By aligning national regulations with global cybersecurity standards, INSA promotes
                collaboration with international entities, fostering partnerships that enhance Ethiopia’s cybersecurity
                resilience.
              </p>
            </motion.div>
          </Col>
          <Col md={6} className="text-center">
            <motion.img
              src={insa8}
              alt="Cybersecurity Policy Development"
              className="img-fluid rounded shadow"
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
     
     export default Service1;