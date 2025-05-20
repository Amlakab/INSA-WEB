import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, ListGroup, Spinner } from "react-bootstrap";
import { FaUserAlt, FaEnvelope, FaCity, FaSignOutAlt, FaUserEdit, FaRegTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import UserService from "./UserService";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null); // State to store the user's profile
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch the user's profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await UserService.getYourProfile(token); // Fetch the user's profile
        console.log("API Response:", response); // Log the response

        // Check if the response contains the 'ourUser' object
        if (response && response.ourUser) {
          setUser(response.ourUser); // Set the user's profile data
        } else {
          console.error("Unexpected API response structure:", response);
          Swal.fire("Error", "User profile data is missing in the response.", "error");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        Swal.fire("Error", "Unable to fetch user profile.", "error");
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchUserProfile();
  }, []);

  // Handle account deletion
  const handleAccountDeletion = async () => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This action is irreversible! You will lose all your data.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete my account",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await UserService.deleteUser(user.id, token);
        Swal.fire("Deleted!", "Your account has been deleted.", "success");
        // Log out user and redirect to login page
        localStorage.removeItem("token");
        navigate("/login");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete your account.", "error");
        console.error("Error deleting account:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Spinner animation="border" variant="primary" />
          <h2 style={{ color: "#00ff88" }}>Loading...</h2>
        </motion.div>
      </div>
    ); // Loading state until the data is fetched
  }

  if (!user) {
    return (
      <div className="text-center my-5">
        <p>User profile not found. Please try again later.</p>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <Container fluid className="user-home-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg border-0 rounded futuristic-card">
              <Card.Body className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaUserAlt size={80} className="user-icon" />
                  <h2 className="user-name">{user.name}</h2>
                  <h5 className="user-username">@{user.username}</h5>
                </motion.div>

                <ListGroup variant="flush" className="mb-4 futuristic-list">
                  <ListGroup.Item className="d-flex align-items-center">
                    <FaUserAlt className="mr-3" size={20} />
                    <span>Name: {user.name}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center">
                    <FaEnvelope className="mr-3" size={20} />
                    <span>Email: {user.email}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center">
                    <FaCity className="mr-3" size={20} />
                    <span>City: {user.city}</span>
                  </ListGroup.Item>
                </ListGroup>

                <div className="d-flex justify-content-center button-group">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="primary"
                      className="me-3 futuristic-button"
                      onClick={() => navigate(`/userdashboard/updateprofile`)}
                    >
                      <FaUserEdit className="mr-2" />
                      Edit Profile
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="danger"
                      className="futuristic-button"
                      onClick={handleAccountDeletion}
                    >
                      <FaRegTrashAlt className="mr-2" />
                      Delete Account
                    </Button>
                  </motion.div>
                </div>

                <div className="mt-4 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="secondary"
                      className="futuristic-button"
                      onClick={() => navigate("/")}
                    >
                      <FaSignOutAlt className="mr-2" />
                      Log Out
                    </Button>
                  </motion.div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default UserProfile;