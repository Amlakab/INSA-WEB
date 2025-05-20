import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Navbar, Nav, Form, Button, Modal } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./HomePage.css";
import GoogleTranslate from '../components/GoogleTranslate'; // Adjust path as needed
import { NavDropdown } from "react-bootstrap"; // Import NavDropdown
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
  FaTwitter,
} from "react-icons/fa";

// Import images from the assets folder
import insa1 from "./insa1.png";
import insa2 from "../images/insa2.png";
import logo1 from "../images/logo1.jpeg";
import logo2 from "../images/logo2.jpeg";
import insa3 from "../images/insa3.png";
import insa4 from "../images/insa4.png";
import insa5 from "../images/insa5.png";
import insa9 from "../images/insa9.png";
import insa12 from "../images/insa12.png";
import insa32 from "../images/insa32.jpeg";
import insa33 from "../images/insa33.jpeg";
import insa41 from "../images/insa41.jpeg";

import "bootstrap/dist/css/bootstrap.min.css";
import UserService from "../User/UserService"; // Import your UserService class

const HomePage = ({ onLogin }) => {
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
  const [signupRole, setSignupRole] = useState("USER"); // Default role
  const [signupErrorMessage, setSignupErrorMessage] = useState("");

  // Modal state
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // State for OTP
  const [otp, setOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);

  // Theme state (persisted in localStorage)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Theme-based styles
  const themeStyles = {
    background: isDarkMode
      ? "linear-gradient(135deg, #0a192f, #112240)"
      : "linear-gradient(135deg, #f0f0f0, #ffffff)",
    textColor: isDarkMode ? "#ccd6f6" : "#333333",
    primaryColor: isDarkMode ? "#00ffff" : "#007bff",
    secondaryColor: isDarkMode ? "#00b3b3" : "#0056b3",
    errorColor: "#ff4444",
    modalBackground: isDarkMode ? "#112240" : "#ffffff",
    modalText: isDarkMode ? "#ccd6f6" : "#333333",
    inputBackground: isDarkMode ? "#0a192f" : "#f8f9fa",
    inputBorder: isDarkMode ? "1px solid #00ffff" : "1px solid #007bff",
  };

  // Array of images with associated content
  const slides = [
    {
      image: insa1,
      title: "Welcome to INSA",
      description: "Innovative solutions for a smarter tomorrow.",
    },
    {
      image: insa12,
      title: "Explore Our Services",
      description: "We provide cutting-edge solutions tailored to your needs.",
    },
    {
      image: insa9,
      title: "Meet Our Team",
      description: "A team of experts dedicated to your success.",
    },
    {
      image: insa4,
      title: "Contact Us Today",
      description: "Let's build something amazing together.",
    },
    {
      image: insa5,
      title: "Join Our Community",
      description: "Be part of a growing network of innovators.",
    },
  ];

  // State for the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // State to track slide direction
  const [slideDirection, setSlideDirection] = useState("right");

  // Function to go to the next image
  const nextImage = useCallback(() => {
    setSlideDirection("right");
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  // Function to go to the previous image
  const prevImage = useCallback(() => {
    setSlideDirection("left");
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Automatic slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentImageIndex, nextImage]);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.login(email, password);

      if (response.token) {
        const result = await UserService.requestOtp(email);

        if (response.status === 200) {
          // Store token and role in localStorage
          localStorage.setItem("token", response.token);
          localStorage.setItem("role", response.role);

          Swal.fire({
            title: "We have sent OTP code. Please verify OTP!",
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
            setShowOtpModal(true);
            setShowLogin(false);
          });
        } else {
          setErrorMessage("Error generating OTP!");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid credentials. Please try again.",
        });
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  // Handle OTP
  const handleOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.verifyOtp(email, otp); // Call verifyOtp method
      if (response.status === 200) {
        onLogin();
        // Navigate based on the user's role
        const role = localStorage.getItem("role");
        if (role === "ADMIN") {
          navigate("/dashboard");
        } else {
          navigate("/userdashboard");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid OTP. Please try again.",
        });
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

      {/* Hero Section with Custom Slideshow */}
      <section
        id="home"
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ x: slideDirection === "right" ? "100%" : "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: slideDirection === "right" ? "-100%" : "100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundImage: `url(${slides[currentImageIndex].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 0,
            }}
          ></motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className="text-center" style={{ zIndex: 2 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ x: slideDirection === "right" ? 100 : -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: slideDirection === "right" ? -100 : 100, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1
                className="display-3"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: themeStyles.primaryColor,
                  textShadow: `0 0 10px ${themeStyles.primaryColor}, 0 0 20px ${themeStyles.primaryColor}`,
                }}
              >
                {slides[currentImageIndex].title}
              </h1>
              <p
                className="lead"
                style={{
                  color: themeStyles.textColor,
                  textShadow: `0 0 10px ${themeStyles.primaryColor}, 0 0 20px ${themeStyles.primaryColor}`,
                }}
              >
                {slides[currentImageIndex].description}
              </p>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="outline-light"
                  style={{
                    borderColor: themeStyles.primaryColor,
                    color: themeStyles.primaryColor,
                    textShadow: `0 0 10px ${themeStyles.primaryColor}, 0 0 20px ${themeStyles.primaryColor}`,
                  }}
                  onClick={() => setShowLogin(true)}
                  aria-label="Get Started"
                >
                  Get Started
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "20px",
            zIndex: 3,
            cursor: "pointer",
            transform: "translateY(-50%)",
          }}
          onClick={prevImage}
          aria-label="Previous Image"
        >
          <FaArrowLeft size={30} color={themeStyles.primaryColor} />
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "20px",
            zIndex: 3,
            cursor: "pointer",
            transform: "translateY(-50%)",
          }}
          onClick={nextImage}
          aria-label="Next Image"
        >
          <FaArrowRight size={30} color={themeStyles.primaryColor} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="p-5">
        <Row>
          <Col md={6}>
            <motion.img
              src={insa1} // Use an appropriate image
              alt="About Us"
              className="img-fluid rounded shadow"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </Col>
          <Col md={6} className="d-flex align-items-center">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 style={{ color: themeStyles.primaryColor }}>About Us</h2>
              <p style={{ color: themeStyles.textColor }}>
                The <strong>Information Network Security Agency (INSA)</strong> is Ethiopia’s national institution
                responsible for safeguarding the country’s cybersecurity and information infrastructure. Established in
                2006, INSA plays a vital role in protecting national digital assets, preventing cyber threats, and
                ensuring secure communication systems. The agency operates under the Office of the Prime Minister and
                focuses on cybersecurity operations, cyber intelligence, policy development, digital forensics, and
                capacity building. INSA works to strengthen Ethiopia’s cyber resilience through research, innovation, and
                collaboration with national and international partners. It also plays a key role in the country's Digital
                </p>
              <Button
                variant="outline-light"
                style={{
                  borderColor: themeStyles.primaryColor,
                  color: themeStyles.primaryColor,
                  marginTop: "20px",
                }}
                onClick={() => navigate("/about")}
              >
                Read More →
              </Button>
            </motion.div>
          </Col>
        </Row>
      </section>

      {/* Services Section */}
      <section id="services" className="p-5" style={{ background: themeStyles.background }}>
        <h2 className="text-center mb-5" style={{ color: themeStyles.primaryColor }}>
          Our Services
        </h2>
        <Row>
          <Col md={6} className="d-flex align-items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 style={{ color: themeStyles.primaryColor }}>Our Services</h2>
              <p style={{ color: themeStyles.textColor }}>
                The <strong>Information Network Security Agency (INSA)</strong> provides a wide range of cybersecurity
                services aimed at protecting Ethiopia’s national information infrastructure. Its core services include{" "}
                <strong>cyber threat intelligence, incident response, policy development, cybersecurity research,
                capacity building, and public awareness campaigns</strong>. INSA continuously monitors and analyzes cyber
                threats to detect and prevent potential attacks, ensuring the safety of critical systems in government
                and private sectors. It also develops national cybersecurity policies and regulations to guide
                organizations in securing their digital assets. Through training programs and awareness initiatives, INSA
                enhances the cybersecurity skills of professionals and educates the public on safe online practices.
                Additionally, the agency conducts research and collaborates with international partners to develop
                advanced cybersecurity technologies. By providing these services, INSA plays a crucial role in
                strengthening Ethiopia’s digital security and supporting its digital transformation efforts.
              </p>
              <Button
                variant="outline-light"
                style={{
                  borderColor: themeStyles.primaryColor,
                  color: themeStyles.primaryColor,
                  marginTop: "20px",
                }}
                onClick={() => navigate("/service")}
              >
                Read More →
              </Button>
            </motion.div>
          </Col>
          <Col md={6}>
            <motion.img
              src={insa2} // Use an appropriate image
              alt="Services"
              className="img-fluid rounded shadow"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </Col>
        </Row>
      </section>

      {/* Blog Section */}
      <section id="blog" className="p-5" style={{ background: themeStyles.background }}>
        <h2 className="text-center mb-5" style={{ color: themeStyles.primaryColor }}>
          Latest from Our Blog
        </h2>
        <Row>
          {/* First Column */}
          <Col md={4}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              style={{ textAlign: "center" }}
            >
              <Link to="/news1" style={{ textDecoration: "none" }}>
                <img
                  src={insa32} // Replace with your image
                  alt="Blog 1"
                  className="img-fluid rounded shadow"
                  style={{ width: "100%", height: "auto", cursor: "pointer" }}
                />
                <p
                  style={{
                    color: themeStyles.textColor,
                    marginTop: "10px",
                    fontSize: "0.9rem",
                    textDecoration: "none", // Remove text decoration
                  }}
                  className="hover-no-underline" // Add class for hover effect
                >
                  INSA's headquarters in Addis Ababa, inaugurated in April 2021. The facility comprises six blocks of 14 and 17-story buildings, constructed at a cost of 2.1 billion birr.
                </p>
              </Link>
            </motion.div>
          </Col>

          {/* Second Column */}
          <Col md={4}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              style={{ textAlign: "center" }}
            >
              <Link to="/news2" style={{ textDecoration: "none" }}>
                <img
                  src={insa33} // Replace with your image
                  alt="Blog 2"
                  className="img-fluid rounded shadow"
                  style={{ width: "100%", height: "auto", cursor: "pointer" }}
                />
                <p
                  style={{
                    color: themeStyles.textColor,
                    marginTop: "10px",
                    fontSize: "0.9rem",
                    textDecoration: "none", // Remove text decoration
                  }}
                  className="hover-no-underline" // Add class for hover effect
                >
                  INSA's cybersecurity operations center, where over 6,700 cyberattack attempts were thwarted in a 12-month period.
                </p>
              </Link>
            </motion.div>
          </Col>

          {/* Third Column */}
          <Col md={4}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              style={{ textAlign: "center" }}
            >
              <Link to="/news3" style={{ textDecoration: "none" }}>
                <img
                  src={insa41} // Replace with your image
                  alt="Blog 3"
                  className="img-fluid rounded shadow"
                  style={{ width: "100%", height: "auto", cursor: "pointer" }}
                />
                <p
                  style={{
                    color: themeStyles.textColor,
                    marginTop: "10px",
                    fontSize: "0.9rem",
                    textDecoration: "none", // Remove text decoration
                  }}
                  className="hover-no-underline" // Add class for hover effect
                >
                  INSA's collaboration with the Adama City Administration to bolster cybersecurity measures within the city's digital infrastructure.
                </p>
              </Link>
            </motion.div>
          </Col>
        </Row>

        {/* Read More Button */}
        <div className="text-center mt-5">
          <Link to="/blog" style={{ textDecoration: "none" }}>
            <Button
              variant="outline-light"
              style={{
                borderColor: themeStyles.primaryColor,
                color: themeStyles.primaryColor,
              }}
            >
              Read More →
            </Button>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section  className="p-5" style={{ background: themeStyles.background }}>
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
              <p className="text-center mt-3" style={{ color: themeStyles.primaryColor }}>
                Don't have an account?{" "}
                <span
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => {
                    setShowLogin(false);
                    setShowSignup(true);
                  }}
                >
                  Signup
                </span>
              </p>
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
            <Form onSubmit={handleSignup}>
              <Form.Group controlId="formSignupName">
                <Form.Label style={{ color: themeStyles.primaryColor }}>
                  <FaUser /> Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    background: themeStyles.inputBackground,
                    color: themeStyles.modalText,
                    border: themeStyles.inputBorder,
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formSignupEmail" className="mt-3">
                <Form.Label style={{ color: themeStyles.primaryColor }}>
                  <FaEnvelope /> Email
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  onChange={(e) => setSignupEmail(e.target.value)}
                  style={{
                    background: themeStyles.inputBackground,
                    color: themeStyles.modalText,
                    border: themeStyles.inputBorder,
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formSignupCity" className="mt-3">
                <Form.Label style={{ color: themeStyles.primaryColor }}>
                  <FaCity /> City
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter City"
                  onChange={(e) => setCity(e.target.value)}
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
                  onChange={(e) => setSignupPassword(e.target.value)}
                  style={{
                    background: themeStyles.inputBackground,
                    color: themeStyles.modalText,
                    border: themeStyles.inputBorder,
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formSignupRole" className="mt-3">
                <Form.Label style={{ color: themeStyles.primaryColor }}>
                  <FaUserTag /> Role
                </Form.Label>
                <Form.Select
                  onChange={(e) => setSignupRole(e.target.value)}
                  style={{
                    background: themeStyles.inputBackground,
                    color: themeStyles.modalText,
                    border: themeStyles.inputBorder,
                  }}
                >
                  <option value="USER">User</option>
                </Form.Select>
              </Form.Group>
              {signupErrorMessage && <p className="text-danger mt-2">{signupErrorMessage}</p>}
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

      {/* OTP Verification Modal */}
      <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)} centered>
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Modal.Header
            closeButton
            style={{
              background: themeStyles.modalBackground,
              borderBottom: `1px solid ${themeStyles.primaryColor}`,
            }}
          >
            <Modal.Title style={{ color: themeStyles.primaryColor }}>OTP Verification</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: themeStyles.modalBackground }}>
            <Form onSubmit={handleOtp}>
              <Form.Group controlId="formOtp">
                <Form.Label style={{ color: themeStyles.primaryColor }}>
                  Enter OTP
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
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
                Verify OTP
              </Button>
            </Form>
          </Modal.Body>
        </motion.div>
      </Modal>
    </Container>
  );
};

export default HomePage;