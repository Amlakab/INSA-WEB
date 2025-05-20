import React from 'react';
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { FaUser, FaChartLine, FaCog, FaEdit, FaHistory, FaBell } from 'react-icons/fa';
import { motion } from 'framer-motion';  // For smooth animations
import { useNavigate } from "react-router-dom";
import './User.css';

const UserHome = () => {
  const navigate = useNavigate();
  return (
    <Container fluid className="user-home" style={{ background: "linear-gradient(135deg, #f0f0f0, #ffffff)", minHeight: "100vh", padding: "20px" }}>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Row>
          <Col className="text-center">
            <h1 style={{ color: "#333333", fontWeight: "bold", fontSize: "2.5rem" }}>Admin Dashboard</h1>
            <p className="text-muted" style={{ fontSize: "1.2rem" }}>Welcome back! Manage your account and activities</p>
          </Col>
        </Row>
      </motion.div>

      {/* Main Dashboard Grid */}
      <Row className="mt-4">
        {/* Profile Management */}
        <Col md={4} className="mb-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg border-0 rounded futuristic-card">
              <Card.Body>
                <div className="text-center mb-4">
                  <FaUser size={50} color="#007bff" />
                  <h4 style={{ color: "#333333", marginTop: "10px" }}>User Management</h4>
                  <p className="text-muted">Manage available users and preferences</p>
                  <Button variant="primary" onClick={() => navigate(`/dashboard/manageuser`)} className="futuristic-button">
                    Manage Users
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        {/* Activity History */}
        <Col md={4} className="mb-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-lg border-0 rounded futuristic-card">
              <Card.Body>
                <div className="text-center mb-4">
                  <FaHistory size={50} color="#28a745" />
                  <h4 style={{ color: "#333333", marginTop: "10px" }}>Activity History</h4>
                  <p className="text-muted">View your recent activities</p>
                  <Button variant="success" href="/activity" className="futuristic-button">
                    View History
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        {/* Notifications */}
        <Col md={4} className="mb-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="shadow-lg border-0 rounded futuristic-card">
              <Card.Body>
                <div className="text-center mb-4">
                  <FaBell size={50} color="#6c757d" />
                  <h4 style={{ color: "#333333", marginTop: "10px" }}>Notifications</h4>
                  <p className="text-muted">Check your latest notifications</p>
                  <Button variant="secondary" href="/notifications" className="futuristic-button">
                    View Notifications
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Progress Section */}
      <Row className="mt-5">
        <Col md={6} className="mb-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg border-0 rounded futuristic-card">
              <Card.Body>
                <h4 className="text-center" style={{ color: "#333333" }}>Profile Completion</h4>
                <ProgressBar now={75} label="75%" variant="success" className="futuristic-progress" />
                <p className="text-muted text-center mt-2">Complete your profile for better experience</p>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        <Col md={6} className="mb-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-lg border-0 rounded futuristic-card">
              <Card.Body>
                <h4 className="text-center" style={{ color: "#333333" }}>Monthly Activity</h4>
                <ProgressBar now={45} label="45%" variant="info" className="futuristic-progress" />
                <p className="text-muted text-center mt-2">You're on track! Keep it up</p>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row className="mt-5">
        <Col md={6} className="mb-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg border-0 rounded futuristic-card">
              <Card.Body>
                <div className="text-center mb-4">
                  <FaEdit size={50} color="#ffc107" />
                  <h4 style={{ color: "#333333", marginTop: "10px" }}>Manage Profile</h4>
                  <Button variant="warning" onClick={() => navigate(`/dashboard/profile`)} className="futuristic-button w-100">
                    View Profile
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        <Col md={6} className="mb-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-lg border-0 rounded futuristic-card">
              <Card.Body>
                <div className="text-center mb-4">
                  <FaCog size={50} color="#17a2b8" />
                  <h4 style={{ color: "#333333", marginTop: "10px" }}>Account Settings</h4>
                  <Button variant="info" href="/settings" className="futuristic-button w-100">
                    Manage Settings
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserHome;