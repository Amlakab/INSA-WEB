import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav, Modal, Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { NavDropdown } from "react-bootstrap"; // Import NavDropdown
import "./HomePage.css";
import { useEffect } from "react";
import GoogleTranslate from '../components/GoogleTranslate'; // Adjust path as needed
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
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link for routing
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from "../User/UserService"; // Import your UserService class


// Import images
import insa1 from "../images/insa1.png";
import about2 from "../images/about2.png";
import about5 from "../images/about5.png";
import about4 from "../images/about4.png";
import insa9 from "../images/insa9.png";
import about3 from "../images/about3.png";
import about6 from "../images/about6.png";
import logo2 from "../images/logo2.jpeg"; // Ensure you have this image

const About = ({onLogin}) => {

  // const [language, setLanguage] = useState("en"); // Default language: English

  // const changeLanguage = (lang) => {
  //   setLanguage(lang);
  // };

  // useEffect(() => {
  //   // Trigger Google Translate to update the page when language changes
  //   const interval = setInterval(() => {
  //     const translateElement = window.google?.translate?.TranslateElement;
  //     if (translateElement) {
  //       const element = new translateElement(
  //         { pageLanguage: "en", includedLanguages: "am,en", autoDisplay: false },
  //         "google_translate_element"
  //       ); 
  //       element.setLanguage(language); // Set the selected language
  //       clearInterval(interval); // Clear the interval once language is set
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, [language]);

  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

   // State for login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
    // State for signup
    const [name, setName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [city, setCity] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupRole, setSignupRole] = useState("USER"); // Default role
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

  // Handle login
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await UserService.login(email, password);
  
        if (response.token) {
          // Store token and role in localStorage
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
            onLogin(); // Notify parent component
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

  const sections = [
    {
      id: "about",
      title: "About INSA",
      content:
        "The Information Network Security Agency (INSA) is Ethiopia’s national institution responsible for safeguarding the country’s cybersecurity and information infrastructure. Established in 2006, INSA plays a vital role in protecting national digital assets, preventing cyber threats, and ensuring secure communication systems. The agency operates under the Office of the Prime Minister and focuses on cybersecurity operations, cyber intelligence, policy development, digital forensics, and capacity building.",
      image: insa1,
    },
    {
      id: "mission",
      title: "Mission",
      content:
        "INSA works to strengthen Ethiopia’s cyber resilience through research, innovation, and collaboration with national and international partners. It also plays a key role in the country's Digital Transformation Strategy, aiming to create a secure and technology-driven economy.",
      image: about2,
    },
    {
      id: "vision",
      title: "Vision",
      content:
        "With a mission to protect Ethiopia’s national interests in cyberspace, INSA continuously monitors, detects, and mitigates cyber threats while fostering cybersecurity awareness and strengthening the country’s digital defense mechanisms.",
      image: about5,
    },
    {
      id: "operations",
      title: "Operations",
      content:
        "INSA’s Cybersecurity Operations Center (CSOC) monitors, detects, and responds to cyber threats in real-time. The Incident Response Team (IRT) collaborates with government and private entities to mitigate cyber incidents.",
      image: about4,
    },
    {
      id: "collaboration",
      title: "Collaboration",
      content:
        "INSA collaborates with international cybersecurity agencies to share information, resources, and best practices, ensuring a robust global cybersecurity network.",
      image: insa9,
    },
    {
      id: "innovation",
      title: "Innovation",
      content:
        "The Research and Development Unit at INSA invests in cutting-edge technologies and strategies to stay ahead of emerging cyber threats.",
      image: about3,
    },
    {
      id: "future",
      title: "Future Goals",
      content:
        "INSA aims to expand its cybersecurity capabilities, foster public-private partnerships, and drive Ethiopia’s digital transformation forward.",
      image: about6,
    },
  ];

  return (
    <div>
      {/* Google Translate Component */}
    <Container 
      fluid
      style={{
        background: themeStyles.background,
        color: themeStyles.textColor,
        fontFamily: "'Orbitron', sans-serif",
        paddingTop: "80px",
      }}
    >
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
                to="/audio"
                style={{
                  color: themeStyles.textColor,
                  backgroundColor: themeStyles.modalBackground,
                }}
              >
                Audio
              </NavDropdown.Item>
            </NavDropdown>

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
            <NavDropdown title="Language" id="language-dropdown">
  <NavDropdown.Item>
    <GoogleTranslate />
  </NavDropdown.Item>
</NavDropdown>
            {/* Theme Toggle Link */}
            <Nav.Link onClick={toggleTheme} className="nav-link-hover">
              {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Sections */}
      {sections.map((section, index) => (
        <section 
          id={section.id}
          key={section.id}
          className="p-5"
          style={{
            background: index % 2 === 0 ? themeStyles.background : "rgba(0, 0, 0, 0.1)",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Row className="align-items-center">
            {/* Alternate image position (left/right) */}
            {index % 2 === 0 ? (
              <>
                <Col md={6} className="text-center">
                  <motion.img
                    src={section.image}
                    alt={section.title}
                    className="img-fluid rounded shadow"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                </Col>
                <Col md={6}>
                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <h2 style={{ color: themeStyles.primaryColor }}>{section.title}</h2>
                    <p style={{ color: themeStyles.textColor }}>{section.content}</p>
                  </motion.div>
                </Col>
              </>
            ) : (
              <>
                <Col md={6}>
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <h2 style={{ color: themeStyles.primaryColor }}>{section.title}</h2>
                    <p style={{ color: themeStyles.textColor }}>{section.content}</p>
                  </motion.div>
                </Col>
                <Col md={6} className="text-center">
                  <motion.img
                    src={section.image}
                    alt={section.title}
                    className="img-fluid rounded shadow"
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                </Col>
              </>
            )}
          </Row>
        </section>
      ))}

      {/* Contact Section */}
            <section id="contact" className="p-5" style={{ background: themeStyles.background }}>
              <h2 className="text-center mb-5" style={{ color: themeStyles.primaryColor }}>
                Contact Us
              </h2>
      
              {/* Basic Contact Information (Horizontally Aligned) */}
              <Row className="text-center mb-5">
                <Col md={4}>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <FaMapMarker size={30} color={themeStyles.primaryColor} />
                    <h3 style={{ color: themeStyles.primaryColor }}>Location</h3>
                    <p style={{ color: themeStyles.textColor }}>Addis Abeba, Ethiopia</p>
                  </motion.div>
                </Col>
                <Col md={4}>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <FaPhone size={30} color={themeStyles.primaryColor} />
                    <h3 style={{ color: themeStyles.primaryColor }}>Phone</h3>
                    <p style={{ color: themeStyles.textColor }}>+251 9 12 43 65 73</p>
                  </motion.div>
                </Col>
                <Col md={4}>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <FaEnvelope size={30} color={themeStyles.primaryColor} />
                    <h3 style={{ color: themeStyles.primaryColor }}>Email</h3>
                    <p style={{ color: themeStyles.textColor }}>info@insa.gov.et</p>
                  </motion.div>
                </Col>
              </Row>
      
              {/* Two Columns: Map and Contact Form */}
              <Row>
                {/* Left Column: Map */}
                <Col md={6}>
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.869244319124!2d38.76321431536945!3d9.012326893541918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85f1a4b1f3b5%3A0x1c5b5b5b5b5b5b5b!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2set!4v1633080000000!5m2!1sen!2set"
                      width="100%"
                      height="400"
                      style={{ border: 0, borderRadius: "10px" }}
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </motion.div>
                </Col>
      
                {/* Right Column: Contact Form */}
                <Col md={6}>
                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <h3 style={{ color: themeStyles.primaryColor }}>Get in Touch</h3>
                    <Form>
                      <Form.Group controlId="formName" className="mb-3">
                        <Form.Control
                          type="text"
                          placeholder="Your Name"
                          style={{
                            background: themeStyles.inputBackground,
                            color: themeStyles.modalText,
                            border: themeStyles.inputBorder,
                          }}
                        />
                      </Form.Group>
                      <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Control
                          type="email"
                          placeholder="Your Email"
                          style={{
                            background: themeStyles.inputBackground,
                            color: themeStyles.modalText,
                            border: themeStyles.inputBorder,
                          }}
                        />
                      </Form.Group>
                      <Form.Group controlId="formMessage" className="mb-3">
                        <Form.Control
                          as="textarea"
                          rows={5}
                          placeholder="Your Message"
                          style={{
                            background: themeStyles.inputBackground,
                            color: themeStyles.modalText,
                            border: themeStyles.inputBorder,
                          }}
                        />
                      </Form.Group>
                      <Button
                        variant="dark"
                        type="submit"
                        style={{
                          background: `linear-gradient(135deg, ${themeStyles.primaryColor}, ${themeStyles.secondaryColor})`,
                          border: "none",
                          color: themeStyles.modalText,
                        }}
                      >
                        Send Message
                      </Button>
                    </Form>
                  </motion.div>
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
    </div>

  );
};

export default About;