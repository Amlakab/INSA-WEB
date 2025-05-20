import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaMapMarker, FaPhone, FaRocket, FaCode, FaUsers, FaShieldAlt, FaLightbulb, FaUserGraduate, FaHandshake, FaInstagram, FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer style={{ background: "linear-gradient(135deg, #1a1a1a, #0f0f0f)", color: "#fff", padding: "40px 0", borderTop: "1px solid #00ff88" }}>
      <Container>
        {/* First Row */}
        <Row className="mb-5">
          {/* About Section */}
          <Col md={3} className="mb-4">
            <motion.h3 whileHover={{ scale: 1.05 }} style={{ color: "#00ff88", marginBottom: "20px" }}>About</motion.h3>
            <p style={{ color: "#ccc" }}>
              The <strong>Information Network Security Agency (INSA)</strong> is Ethiopia’s national institution responsible for safeguarding the country’s cybersecurity and information infrastructure.
            </p>
          </Col>

          {/* List of Services */}
          <Col md={3} className="mb-4">
            <motion.h3 whileHover={{ scale: 1.05 }} style={{ color: "#00ff88", marginBottom: "20px" }}>Services</motion.h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <motion.li whileHover={{ x: 10 }} style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                <FaShieldAlt color="#00ff88" />
                <span>Cybersecurity Policy Development</span>
              </motion.li>
              <motion.li whileHover={{ x: 10 }} style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                <FaCode color="#00ff88" />
                <span>Threat Intelligence and Analysis</span>
              </motion.li>
              <motion.li whileHover={{ x: 10 }} style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                <FaRocket color="#00ff88" />
                <span>Incident Response and Management</span>
              </motion.li>
              <motion.li whileHover={{ x: 10 }} style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                <FaUsers color="#00ff88" />
                <span>Public Awareness Campaigns</span>
              </motion.li>
              <motion.li whileHover={{ x: 10 }} style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                <FaLightbulb color="#00ff88" />
                <span>Research and Development (R&D)</span>
              </motion.li>
              <motion.li whileHover={{ x: 10 }} style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                <FaUserGraduate color="#00ff88" />
                <span>Capacity Building and Training</span>
              </motion.li>
              <motion.li whileHover={{ x: 10 }} style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                <FaHandshake color="#00ff88" />
                <span>International Collaboration</span>
              </motion.li>
            </ul>
          </Col>

          {/* Quick Links */}
          <Col md={3} className="mb-4">
            <motion.h3 whileHover={{ scale: 1.05 }} style={{ color: "#00ff88", marginBottom: "20px" }}>Quick Links</motion.h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <motion.li whileHover={{ x: 10 }} style={{ marginBottom: "10px" }}>
                <a href="#home" style={{ color: "#fff", textDecoration: "none" }}>Home</a>
              </motion.li>
              <motion.li whileHover={{ x: 10 }} style={{ marginBottom: "10px" }}>
                <a href="#about" style={{ color: "#fff", textDecoration: "none" }}>About</a>
              </motion.li>
              <motion.li whileHover={{ x: 10 }} style={{ marginBottom: "10px" }}>
                <a href="#services" style={{ color: "#fff", textDecoration: "none" }}>Services</a>
              </motion.li>
              <motion.li whileHover={{ x: 10 }} style={{ marginBottom: "10px" }}>
                <a href="#team" style={{ color: "#fff", textDecoration: "none" }}>Team</a>
              </motion.li>
              <motion.li whileHover={{ x: 10 }} style={{ marginBottom: "10px" }}>
                <a href="#contact" style={{ color: "#fff", textDecoration: "none" }}>Contact</a>
              </motion.li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={3} className="mb-4">
            <motion.h3 whileHover={{ scale: 1.05 }} style={{ color: "#00ff88", marginBottom: "20px" }}>Contact Info</motion.h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <motion.li whileHover={{ x: 10 }} style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                <FaMapMarker color="#00ff88" />
                <span>Addis Abeba, Ethiopia</span>
              </motion.li>
              <motion.li whileHover={{ x: 10 }} style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                <FaPhone color="#00ff88" />
                <span>+251 9 12 43 65 73</span>
              </motion.li>
              <motion.li whileHover={{ x: 10 }} style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                <FaEnvelope color="#00ff88" />
                <span>amlakieab4@gmail.com</span>
              </motion.li>
            </ul>
          </Col>
        </Row>

        {/* Bottom Row: Social Media Links */}
        <Row>
          <Col className="text-center">
            <motion.h3 whileHover={{ scale: 1.05 }} style={{ color: "#00ff88", marginBottom: "20px" }}>Follow Us</motion.h3>
            <div className="d-flex justify-content-center" style={{ gap: "20px" }}>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                style={{ color: "#00ff88" }}
              >
                <FaLinkedin size={30} />
              </motion.a>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                style={{ color: "#00ff88" }}
              >
                <FaGithub size={30} />
              </motion.a>
              <motion.a
                href="https://www.facebook.com/INSA.ETHIOPIA/photos"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                style={{ color: "#00ff88" }}
              >
                <FaInstagram size={30} />
              </motion.a>
              <motion.a
                href="https://www.facebook.com/INSA.ETHIOPIA/photos"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                style={{ color: "#00ff88" }}
              >
              <FaFacebook size={30} />
              </motion.a>
              <motion.a
                href="https://www.facebook.com/INSA.ETHIOPIA/photos"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                style={{ color: "#00ff88" }}
              >
                <FaPhone size={30} />
              </motion.a>
              <motion.a
                href="https://www.facebook.com/INSA.ETHIOPIA/photos"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                style={{ color: "#00ff88" }}
              >
                <FaTwitter size={30} />
              </motion.a>
            </div>
          </Col>
        </Row>

        {/* Copyright */}
        <Row>
          <Col className="text-center mt-4">
            <p style={{ color: "#ccc", margin: 0 }}>
              &copy; {new Date().getFullYear()} Amlakie Abebaw. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;