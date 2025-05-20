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

const VideoPage = ({ onLogin }) => {
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

  // YouTube video links
  const videos = [
    {
      id: 1,
      title: "INSA Ethiopia Video 1",
      description: "This video provides an overview of INSA Ethiopia's mission and activities.",
      videoLink: "https://www.youtube.com/embed/8etZEkL9P0M?autoplay=1&mute=1&loop=1",
    },
    {
      id: 2,
      title: "INSA Ethiopia Video 2",
      description: "Learn about the cybersecurity initiatives of INSA Ethiopia.",
      videoLink: "https://www.youtube.com/embed/9M1lA-TwO_k?autoplay=1&mute=1&loop=1",
    },
    {
      id: 3,
      title: "INSA Ethiopia Video 3",
      description: "Explore the role of INSA Ethiopia in national cybersecurity.",
      videoLink: "https://www.youtube.com/embed/XsaoGxyGPDg?autoplay=1&mute=1&loop=1",
    },
    {
      id: 4,
      title: "INSA Ethiopia Video 4",
      description: "This video highlights the achievements of INSA Ethiopia.",
      videoLink: "https://www.youtube.com/embed/hjDIwkn0wsA?autoplay=1&mute=1&loop=1",
    },
    {
      id: 5,
      title: "INSA Ethiopia Video 5",
      description: "Understand the importance of cybersecurity in Ethiopia.",
      videoLink: "https://www.youtube.com/embed/kyZsgIqxYR0?autoplay=1&mute=1&loop=1",
    },
    {
      id: 6,
      title: "INSA Ethiopia Video 6",
      description: "This video showcases the work of INSA Ethiopia in protecting national infrastructure.",
      videoLink: "https://www.youtube.com/embed/nT_Ek5Qez30?autoplay=1&mute=1&loop=1",
    },
    {
      id: 7,
      title: "INSA Ethiopia Video 7",
      description: "Additional video content about INSA Ethiopia.",
      videoLink: "https://www.youtube.com/embed/gEqON6U6keA?autoplay=1&mute=1&loop=1",
    },
    {
      id: 8,
      title: "INSA Ethiopia Video 8",
      description: "More insights into INSA Ethiopia's operations.",
      videoLink: "https://www.youtube.com/embed/PbzeKJZ3C5U?autoplay=1&mute=1&loop=1",
    },
    {
      id: 9,
      title: "INSA Ethiopia Video 9",
      description: "Further exploration of INSA Ethiopia's contributions.",
      videoLink: "https://www.youtube.com/embed/sEKwvfVuOms?autoplay=1&mute=1&loop=1",
    },
    {
      id: 10,
      title: "INSA Ethiopia Video 10",
      description: "Detailed look at INSA Ethiopia's strategies.",
      videoLink: "https://www.youtube.com/embed/9RSWGR3fSQI?autoplay=1&mute=1&loop=1",
    },
    {
      id: 11,
      title: "INSA Ethiopia Video 11",
      description: "Understanding the impact of INSA Ethiopia.",
      videoLink: "https://www.youtube.com/embed/4HoN29ix24A?autoplay=1&mute=1&loop=1",
    },
    {
      id: 12,
      title: "INSA Ethiopia Video 12",
      description: "Insights into INSA Ethiopia's cybersecurity measures.",
      videoLink: "https://www.youtube.com/embed/hKtFnVEuhN4?autoplay=1&mute=1&loop=1",
    },
    {
      id: 13,
      title: "INSA Ethiopia Video 13",
      description: "Exploring INSA Ethiopia's role in national security.",
      videoLink: "https://www.youtube.com/embed/sfqvhD6lTSs?autoplay=1&mute=1&loop=1",
    },
    {
      id: 14,
      title: "INSA Ethiopia Video 14",
      description: "Highlighting INSA Ethiopia's achievements.",
      videoLink: "https://www.youtube.com/embed/Vm20dAQ_6tM?autoplay=1&mute=1&loop=1",
    },
    {
      id: 15,
      title: "INSA Ethiopia Video 15",
      description: "Comprehensive overview of INSA Ethiopia's initiatives.",
      videoLink: "https://www.youtube.com/embed/y3pbTEEUSxQ?autoplay=1&mute=1&loop=1",
    },
    {
      id: 16,
      title: "INSA Ethiopia Video 16",
      description: "Detailed analysis of INSA Ethiopia's projects.",
      videoLink: "https://www.youtube.com/embed/44OKxHoliIg?autoplay=1&mute=1&loop=1",
    },
    {
      id: 17,
      title: "INSA Ethiopia Video 17",
      description: "Exploring the future of INSA Ethiopia.",
      videoLink: "https://www.youtube.com/embed/B_Mp6oej01s?autoplay=1&mute=1&loop=1",
    },
    {
      id: 18,
      title: "INSA Ethiopia Video 18",
      description: "Understanding INSA Ethiopia's global impact.",
      videoLink: "https://www.youtube.com/embed/vQ2I3DSojw4?autoplay=1&mute=1&loop=1",
    },
  ];

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

      {/* Video Sections */}
      {videos.map((video, index) => (
        <section
          key={video.id}
          className="p-5"
          style={{
            background: index % 2 === 0 ? themeStyles.background : "rgba(0, 0, 0, 0.1)",
            minHeight: "50vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Row className="align-items-center">
            {/* Video on the Left for Even Index, Right for Odd Index */}
            {index % 2 === 0 ? (
              <>
                {/* Content Column */}
                <Col md={6} className="text-center">
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <h2 style={{ color: themeStyles.primaryColor }}>{video.title}</h2>
                    <p style={{ color: themeStyles.textColor }}>{video.description}</p>
                    <div className="d-flex justify-content-center gap-3">
                      <Button
                        variant="dark"
                        href={video.videoLink.replace("embed/", "watch?v=")}
                        target="_blank"
                        style={{
                          background: `linear-gradient(135deg, ${themeStyles.primaryColor}, ${themeStyles.secondaryColor})`,
                          border: "none",
                          color: themeStyles.modalText,
                        }}
                      >
                        <FaPlayCircle /> Watch Video
                      </Button>
                      <Button
                        variant="dark"
                        href={video.videoLink.replace("embed/", "watch?v=")}
                        target="_blank"
                        style={{
                          background: `linear-gradient(135deg, ${themeStyles.primaryColor}, ${themeStyles.secondaryColor})`,
                          border: "none",
                          color: themeStyles.modalText,
                        }}
                      >
                        <FaDownload /> Watch on YouTube
                      </Button>
                    </div>
                  </motion.div>
                </Col>
                {/* Video Column */}
                <Col md={6} className="text-center">
                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <iframe
                      width="100%"
                      height="315"
                      src={video.videoLink}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
                    ></iframe>
                  </motion.div>
                </Col>
              </>
            ) : (
              <>
                {/* Video Column */}
                <Col md={6} className="text-center">
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <iframe
                      width="100%"
                      height="315"
                      src={video.videoLink}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
                    ></iframe>
                  </motion.div>
                </Col>
                {/* Content Column */}
                <Col md={6} className="text-center">
                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <h2 style={{ color: themeStyles.primaryColor }}>{video.title}</h2>
                    <p style={{ color: themeStyles.textColor }}>{video.description}</p>
                    <div className="d-flex justify-content-center gap-3">
                      <Button
                        variant="dark"
                        href={video.videoLink.replace("embed/", "watch?v=")}
                        target="_blank"
                        style={{
                          background: `linear-gradient(135deg, ${themeStyles.primaryColor}, ${themeStyles.secondaryColor})`,
                          border: "none",
                          color: themeStyles.modalText,
                        }}
                      >
                        <FaPlayCircle /> Watch Video
                      </Button>
                      <Button
                        variant="dark"
                        href={video.videoLink.replace("embed/", "watch?v=")}
                        target="_blank"
                        style={{
                          background: `linear-gradient(135deg, ${themeStyles.primaryColor}, ${themeStyles.secondaryColor})`,
                          border: "none",
                          color: themeStyles.modalText,
                        }}
                      >
                        <FaDownload /> Watch on YouTube
                      </Button>
                    </div>
                  </motion.div>
                </Col>
              </>
            )}
          </Row>
        </section>
      ))}

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

export default VideoPage;