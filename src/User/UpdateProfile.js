import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import { FaUser, FaEnvelope, FaCity, FaSave } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import UserService from "./UserService";
import { useNavigate } from "react-router-dom";
import "./User.css";

const UpdateProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    city: "",
  });
  const [loading, setLoading] = useState(true); // Loading state
  const [updating, setUpdating] = useState(false); // Updating state
  const navigate = useNavigate();

  // Fetch the user's profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await UserService.getYourProfile(token); // Fetch the user's profile
        console.log("API Response:", response); // Log the response

        if (response && response.ourUser) {
          const { name, email, city } = response.ourUser;
          setUser({ name, email, city }); // Set the user's profile data
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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true); // Start updating
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const response = await UserService.updateProfile(user, token); // Update the user's profile
      console.log("Update Response:", response); // Log the response

      if (response && response.status === 200) {
        Swal.fire("Success", "Profile updated successfully!", "success");
        if(role==="ADMIN"){
          navigate("/dashboard/profile"); // Redirect to the dashboard after successful update
        }
        else{
          navigate("/userdashboard/profile"); // Redirect to the dashboard after successful update
        }
      } else {
        Swal.fire("Error", "Failed to update profile.", "error");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire("Error", "Unable to update profile.", "error");
    } finally {
      setUpdating(false); // Stop updating
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

  return (
    <Container fluid className="update-profile-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg border-0 rounded futuristic-card">
              <Card.Body>
                <h2 className="text-center mb-4" style={{ color: "#00ff88" }}>Update Profile</h2>
                <Form onSubmit={handleSubmit}>
                  {/* Name Field */}
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaUser className="mr-2" />
                      Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  {/* Email Field */}
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaEnvelope className="mr-2" />
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  {/* City Field */}
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaCity className="mr-2" />
                      City
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={user.city}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  {/* Submit Button */}
                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        variant="primary"
                        type="submit"
                        className="futuristic-button"
                        disabled={updating}
                      >
                        {updating ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                            <span className="ms-2">Updating...</span>
                          </>
                        ) : (
                          <>
                            <FaSave className="mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default UpdateProfile;