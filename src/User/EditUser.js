import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Spinner, Form } from "react-bootstrap";
import { FaUserAlt, FaEnvelope, FaCity, FaUserTag, FaSave, FaTimes, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { useSpring, animated } from "react-spring";
import UserService from "./UserService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ManageUsers.css";

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    email: "",
    city: "",
    password: "",
    role: "USER",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const loadUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await UserService.getAllUsers(token); // Fetch all users
      console.log("API Response:", result); // Log the response

      // Check if the response contains the 'ourUserLists' array
      if (result && Array.isArray(result.ourUserLists)) {
        // Find the user with the matching ID
        const foundUser = result.ourUserLists.find((u) => u.id === parseInt(id));
        if (foundUser) {
          setUser(foundUser); // Set the found user to the state
        } else {
          console.error("User not found");
        }
      } else {
        console.error("Unexpected API response structure:", result);
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Failed to fetch user data." });
    }
  }, [id]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!user.name) newErrors.name = "Name is required";
    if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "A valid email is required";
    }
    if (!user.city) newErrors.city = "City is required";
    if (!user.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await UserService.updateUser(id, user, token);
      Swal.fire({ icon: "success", title: "User updated successfully!", timer: 2000 });
      setTimeout(() => navigate("/dashboard/manageuser"), 2000);
    } catch (error) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Error updating user." });
    }
    setLoading(false);
  };

  const fadeAnimation = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <div className="container d-flex justify-content-center my-5">
      <animated.div style={fadeAnimation}>
        <Card className="shadow-lg border-0 rounded p-4 edit-user-card" style={{ width: "600px" }}> {/* Wider card */}
          <Card.Body>
            <div className="text-center mb-3">
              <FaUsers size={50} className="mb-2" /> {/* Added icon in the header */}
              <h3>Edit User</h3>
            </div>

            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={onInputChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={onInputChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={user.city}
                  onChange={onInputChange}
                  isInvalid={!!errors.city}
                />
                <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={onInputChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select name="role" value={user.role} onChange={onInputChange}>
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </Form.Select>
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button
                  type="submit"
                  variant="success"
                  disabled={loading}
                  className="btn-wide btn-short" // Custom class for button width and height
                >
                  {loading ? <Spinner animation="border" size="sm" /> : <FaSave />} Save
                </Button>
                <Button
                  variant="danger"
                  onClick={() => navigate("/dashboard/manageuser")}
                  className="btn-wide btn-short" // Custom class for button width and height
                >
                  <FaTimes /> Cancel
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </animated.div>
    </div>
  );
}