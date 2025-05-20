import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { FaUserAlt, FaEnvelope, FaCity, FaUserTag } from "react-icons/fa";
import { motion } from "framer-motion";
import UserService from "./UserService";

export default function ViewUser() {
    const navigate = useNavigate();
  const { id } = useParams(); // Get the user id from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const result = await UserService.getUserById(id,token); // Fetch all users
        console.log("API Response:", result); // Log the response

        // Check if the response contains the 'ourUserLists' array
        if (result && result.ourUser) {
          setUser(result.ourUser); // Set the user's profile data
        } else {
          console.error("No User Found:", result);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading user...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center my-5">
        <p>User not found.</p>
      </div>
    );
  }

  return (
    <Container className="mt-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="shadow-lg border-0 rounded">
              <Card.Body>
                <div className="text-center mb-4">
                  <FaUserAlt size={100} color="#007bff" />
                  <h2>{user.name}</h2>
                  <h5 className="text-muted">@{user.username}</h5>
                </div>
                <div className="mb-4">
                  {/* Display Name */}
                  <h5><FaUserAlt className="mr-2" /> Name: {user.name}</h5>
                  {/* Display Email */}
                  <h5><FaEnvelope className="mr-2" /> Email: {user.email}</h5>
                  {/* Display City */}
                  <h5><FaCity className="mr-2" /> City: {user.city}</h5>
                  {/* Display Role */}
                  <h5><FaUserTag className="mr-2" /> Role: {user.role}</h5>
                </div>
                <div className="d-flex justify-content-center">
                  <Button variant="primary" onClick={() => navigate("/dashboard/manageuser")}>
                    Back to Users
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
}