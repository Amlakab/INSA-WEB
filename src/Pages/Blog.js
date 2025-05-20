import React, { useState } from "react";
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
import { Link, NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from "../User/UserService";

// Import images (assuming you have insa1.png to insa22.png)
import insa32 from "../images/insa32.jpeg";
import insa33 from "../images/insa33.jpeg";
import insa41 from "../images/insa41.jpeg";
import insa42 from "../images/insa42.jpeg";
import insa5 from "../images/insa5.png";
import insa6 from "../images/insa6.png";
import insa7 from "../images/insa7.png";
import insa8 from "../images/insa8.png";
import insa9 from "../images/insa9.png";
import insa10 from "../images/insa10.png";
import insa11 from "../images/insa11.png";
import insa12 from "../images/insa12.png";
import insa13 from "../images/insa13.png";
import insa14 from "../images/insa14.png";
import insa15 from "../images/insa15.png";
import insa34 from "../images/insa34.jpeg";
import insa35 from "../images/insa35.jpeg";
import insa36 from "../images/insa36.jpeg";
import insa37 from "../images/insa37.jpeg";
import insa38 from "../images/insa38.jpg";
import insa39 from "../images/insa39.jpg";
import insa40 from "../images/insa40.jpg";
import logo2 from "../images/logo2.jpeg"; // Ensure you have this image
import GoogleTranslate from "../components/GoogleTranslate";

const BlogPage = ({ onLogin }) => {
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

  // Array of images with descriptions and links
  const images = [
    {
      link: "/news1",
      src: insa32,
      description: "INSA's headquarters in Addis Ababa, inaugurated in April 2021. The facility comprises six blocks of 14 and 17-story buildings, constructed at a cost of 2.1 billion birr.",
    },
    {
      link: "/news2",
      src: insa33,
      description: "INSA's cybersecurity operations center, where over 6,700 cyberattack attempts were thwarted in a 12-month period.",
    },
    {
      link: "/news3",
      src: insa41,
      description: "INSA's collaboration with the Adama City Administration to bolster cybersecurity measures within the city's digital infrastructure.",
    },
    {
      link: "/news4",
      src: insa42,
      description: "INSA's Public Key Infrastructure (PKI) launch in September 2024, marking a significant advancement in Ethiopia's digital security framework.",
    },
    {
      link: "/news5",
      src: insa5,
      description: "INSA's participation in the Digital Public Goods Alliance (DPGA), reflecting its commitment to promoting digital public goods.",
    },
    {
      link: "/news6",
      src: insa6,
      description: "INSA's training programs for government employees, IT professionals, and university students to strengthen Ethiopia's cybersecurity workforce.",
    },
    {
      link: "/news7",
      src: insa7,
      description: "INSA's efforts in developing a national digital identity system as part of the Digital Ethiopia 2025 Strategy.",
    },
    {
      link: "/news8",
      src: insa8,
      description: "INSA's cybersecurity awareness campaigns, educating the public and organizations about safe online practices.",
    },
    {
      link: "/news9",
      src: insa9,
      description: "INSA's collaboration with international partners to enhance Ethiopia's cyber defenses and share threat intelligence.",
    },
    {
      link: "/news10",
      src: insa10,
      description: "INSA's research and development initiatives to address emerging cybersecurity threats, including AI-driven cyberattacks.",
    },
    {
      link: "/news11",
      src: insa11,
      description: "INSA's incident response team (IRT) investigating and mitigating cyber incidents across Ethiopia.",
    },
    {
      link: "/news12",
      src: insa12,
      description: "INSA's efforts in developing and implementing national cybersecurity policies and legal frameworks.",
    },
    {
      link: "/news13",
      src: insa13,
      description: "INSA's role in protecting Ethiopia's critical information infrastructure from cyber threats.",
    },
    {
      link: "/news14",
      src: insa14,
      description: "INSA's collaboration with Ethio Telecom to monitor and secure Ethiopia's telecommunications infrastructure.",
    },
    {
      link: "/news15",
      src: insa15,
      description: "INSA's public awareness campaigns on cybersecurity, including workshops and training sessions.",
    },
    {
      link: "/news16",
      src: insa34,
      description: "INSA's efforts in fostering national and international partnerships to strengthen Ethiopia's cybersecurity ecosystem.",
    },
    {
      link: "/news17",
      src: insa35,
      description: "INSA's focus on institutional excellence to effectively address cybersecurity challenges.",
    },
    {
      link: "/news18",
      src: insa36,
      description: "INSA's role in ensuring Ethiopia's ownership of knowledge and technology in the cybersecurity domain.",
    },
    {
      link: "/news19",
      src: insa37,
      description: "INSA's efforts in constructing and safeguarding key infrastructures vital to national security.",
    },
    {
      link: "/news20",
      src: insa38,
      description: "INSA's commitment to achieving the goals of the Digital Ethiopia 2025 Strategy through robust cybersecurity measures.",
    },
    {
      link: "/news21",
      src: insa39,
      description: "INSA's efforts in constructing and safeguarding key infrastructures vital to national security.",
    },
    {
      link: "/news22",
      src: insa40,
      description: "INSA's commitment to achieving the goals of the Digital Ethiopia 2025 Strategy through robust cybersecurity measures.",
    },
  ];

  // Function to determine description position
  const getDescriptionPosition = (index) => {
    return index % 2 === 0 ? "top" : "bottom"; // Alternate between top and bottom
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
      {/* Navbar */}
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

      {/* First Section: Blog Overview */}
      <section
        id="overview"
        className="p-5"
        style={{
          background: themeStyles.background,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Row className="align-items-center">
          {/* Left Column */}
          <Col md={6}>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h1 style={{ color: themeStyles.primaryColor }}>Welcome to the INSA Blog</h1>
              <p style={{ color: themeStyles.textColor }}>
                The <strong>Information Network Security Administration (INSA)</strong> is Ethiopia's governmental agency responsible for safeguarding the nation's information and information infrastructure. Established in 1999 under Council of Ministers Regulation No. 130/1999, INSA's primary mission is to protect Ethiopia's digital assets and ensure cybersecurity across various sectors.
              </p>
            </motion.div>
          </Col>

          {/* Right Column */}
          <Col md={6}>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 style={{ color: themeStyles.primaryColor }}>Recent Developments</h2>
              <p style={{ color: themeStyles.textColor }}>
                INSA has been at the forefront of Ethiopia's digital transformation. Recent initiatives include joining the Digital Public Goods Alliance (DPGA), signing a Memorandum of Understanding (MoU) with the Adama City Administration, and thwarting over 6,700 cyberattack attempts in a 12-month period.
              </p>
            </motion.div>
          </Col>
        </Row>
      </section>

      {/* Image Sections */}
      {[0, 1].map((sectionIndex) => (
        <section
          key={sectionIndex}
          className="p-5"
          style={{
            background: sectionIndex % 2 === 0 ? themeStyles.background : "rgba(0, 0, 0, 0.1)",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Row>
            {images.slice(sectionIndex * 9, (sectionIndex + 1) * 9).map((image, index) => {
              const descriptionPosition = getDescriptionPosition(index);
              return (
                <Col md={4} key={index} className="mb-5">
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    style={{ textAlign: "center" }}
                  >
                    {/* Wrap image and description in a Link */}
                    <Link to={image.link} style={{ textDecoration: "none" }}>
                      {/* Description above the image */}
                      {descriptionPosition === "top" && (
                        <p
                          style={{
                            color: themeStyles.textColor,
                            marginBottom: "10px",
                            fontSize: "0.9rem",
                          }}
                        >
                          {image.description}
                        </p>
                      )}

                      {/* Image */}
                      <img
                        src={image.src}
                        alt={`INSA ${sectionIndex * 9 + index + 1}`}
                        className="img-fluid rounded shadow"
                        style={{ width: "100%", height: "auto" }}
                      />

                      {/* Description below the image */}
                      {descriptionPosition === "bottom" && (
                        <p
                          style={{
                            color: themeStyles.textColor,
                            marginTop: "10px",
                            fontSize: "0.9rem",
                          }}
                        >
                          {image.description}
                        </p>
                      )}
                    </Link>
                  </motion.div>
                </Col>
              );
            })}
          </Row>
        </section>
      ))}

      {/* Additional Information Section */}
      <section
        id="additional-info"
        className="p-5"
        style={{
          background: themeStyles.background,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Row className="align-items-center">
          <Col md={12}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 style={{ color: themeStyles.primaryColor }}>Key Focus Areas</h2>
              <p style={{ color: themeStyles.textColor }}>
                INSA focuses on five primary areas to ensure Ethiopia's cybersecurity:
              </p>
              <ul style={{ color: themeStyles.textColor }}>
                <li>Knowledge and Technology Ownership</li>
                <li>Institutional Excellence</li>
                <li>Infrastructure Protection</li>
                <li>Partnerships and Cooperation</li>
                <li>Policy and Legal Frameworks</li>
              </ul>
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

export default BlogPage;