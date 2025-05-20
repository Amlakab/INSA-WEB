import React from 'react';
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { FaUser, FaChartLine, FaCog, FaEdit, FaHistory, FaBell } from 'react-icons/fa';
import { motion } from 'framer-motion';  // For smooth animations
import { useNavigate } from "react-router-dom";
import './User.css';

const UserHome = () => {
    const navigate = useNavigate();
  return (
    <Container fluid className="mt-4">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Row>
          <Col className="text-center">
            <h1>User Dashboard</h1>
            <p className="text-muted">Welcome back! Manage your account and activities</p>
          </Col>
        </Row>
      </motion.div>

      {/* Main Dashboard Grid */}
      <Row className="mt-4">
        {/* Profile Management */}
        <Col md={4} className="mb-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Card className="shadow-lg border-0 rounded">
              <Card.Body>
                <div className="text-center mb-4">
                  <FaUser size={40} color="#007bff" />
                  <h4>Profile Management</h4>
                  <p className="text-muted">View your profile and preferences</p>
                  <Button variant="primary" onClick={() => navigate(`/userdashboard/profile`)}>
                    View Profile
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        {/* Activity History */}
        <Col md={4} className="mb-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Card className="shadow-lg border-0 rounded">
              <Card.Body>
                <div className="text-center mb-4">
                  <FaHistory size={40} color="#28a745" />
                  <h4>Activity History</h4>
                  <p className="text-muted">View your recent activities</p>
                  <Button variant="success" href="/activity">
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Card className="shadow-lg border-0 rounded">
              <Card.Body>
                <div className="text-center mb-4">
                  <FaBell size={40} color="#6c757d" />
                  <h4>Notifications</h4>
                  <p className="text-muted">Check your latest notifications</p>
                  <Button variant="secondary" href="/notifications">
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Card className="shadow-lg border-0 rounded">
              <Card.Body>
                <h4 className="text-center">Profile Completion</h4>
                <ProgressBar now={75} label="75%" variant="success" />
                <p className="text-muted text-center mt-2">Complete your profile for better experience</p>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        <Col md={6} className="mb-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Card className="shadow-lg border-0 rounded">
              <Card.Body>
                <h4 className="text-center">Monthly Activity</h4>
                <ProgressBar now={45} label="45%" variant="info" />
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Card className="shadow-lg border-0 rounded">
              <Card.Body>
                <div className="text-center mb-4">
                  <FaEdit size={40} color="#ffc107" />
                  <h4>Edit Profile</h4>
                  <Button variant="warning" onClick={() => navigate(`/userdashboard/updateprofile`)} className="w-100">
                    Update Profile
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        <Col md={6} className="mb-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Card className="shadow-lg border-0 rounded">
              <Card.Body>
                <div className="text-center mb-4">
                  <FaCog size={40} color="#17a2b8" />
                  <h4>Account Settings</h4>
                  <Button variant="info" href="/settings" className="w-100">
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