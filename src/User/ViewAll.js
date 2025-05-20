import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col, Spinner, Form } from "react-bootstrap";
import { FaUserAlt, FaEdit, FaTrash, FaUsers, FaPlus, FaEye, FaEnvelope, FaCity, FaUserTag, FaSearch } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { InView } from "react-intersection-observer";
import UserService from "./UserService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewAll.css"; // Custom CSS for futuristic styling

export default function ViewAllUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  // Load users from the API
  const loadUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await UserService.getAllUsers(token);
      console.log("API Response:", result); // Log the response

      // Check if the response contains the 'ourUserLists' array
      if (result && Array.isArray(result.ourUserLists)) {
        setUsers(result.ourUserLists);
        setFilteredUsers(result.ourUserLists); // Initialize filtered users
      } else {
        console.error("Unexpected API response structure:", result);
        setUsers([]);
        setFilteredUsers([]); // Fallback to an empty array
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await UserService.deleteUser(id, token);
        setUsers(users.filter((user) => user.id !== id));
        setFilteredUsers(filteredUsers.filter((user) => user.id !== id)); // Update filtered users
        Swal.fire("Deleted!", "The user has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the user.", "error");
      }
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.city.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  // Animation for cards
  const scrollAnimation = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.9)" },
    config: { tension: 170, friction: 26 },
  });

  return (
    <Container fluid className="my-5">
      <animated.div style={scrollAnimation}>
        <Card className="text-white text-center p-3 mb-4 banner-card">
          <Card.Body>
            <FaUsers size={50} className="mb-3" />
            <h2>Welcome to User Management</h2>
            <p className="lead">Easily manage user information with our system</p>
            <Link to="/dashboard/adduser">
              <Button variant="light" className="add-user-btn">
                <FaPlus /> Add New User
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </animated.div>

      {/* Search Bar */}
      <Row className="mb-4">
  <Col md={6} className="mx-auto">
    <Form.Group>
      <div className="input-group">
        <span className="input-group-text" style={{ background: "#1a1a1a", border: "1px solid #00ff88", color: "#00ff88" }}>
          <FaSearch />
        </span>
        <Form.Control
          type="text"
          placeholder="Search users by name or email..."
          value={searchQuery}
          onChange={handleSearch}
          style={{
            background: "#1a1a1a", 
            border: "1px solid #00ff88", 
            color: "#fff"
          }}
        />
      </div>
    </Form.Group>
  </Col>
</Row>


      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading users...</p>
        </div>
      )}

      <Row>
        {filteredUsers.length === 0 && !loading ? (
          <Col className="text-center">
            <p>No users found.</p>
          </Col>
        ) : (
          filteredUsers.map((user) => (
            <Col md={3} key={user.id} className="mb-4">
              <InView>
                {({ inView, ref }) => (
                  <animated.div
                    ref={ref}
                    style={{
                      ...scrollAnimation,
                      opacity: inView ? 1 : 0,
                      transform: inView ? "scale(1)" : "scale(0.9)",
                    }}
                  >
                    <Card className="shadow-lg border-0 rounded user-card">
                      <Card.Body className="p-2">
                        <div className="text-center mb-2">
                          <FaUserAlt size={40} color="#00ff88" />
                          <h4 className="mt-2">{user.name}</h4>
                          <p className="text-muted small">@{user.username}</p>
                        </div>
                        <div className="mb-2">
                          <p className="small"><FaEnvelope className="mr-2" /> {user.email}</p>
                          <p className="small"><FaCity className="mr-2" /> {user.city}</p>
                          <p className="small"><FaUserTag className="mr-2" /> {user.role}</p>
                        </div>
                        <div className="d-flex justify-content-center">
                          <Link to={`/dashboard/viewuser/${user.id}`}>
                            <Button variant="info" size="sm" className="mx-1">
                              <FaEye size={16} />
                            </Button>
                          </Link>
                          <Link to={`/dashboard/edituser/${user.id}`}>
                            <Button variant="warning" size="sm" className="mx-1">
                              <FaEdit size={16} />
                            </Button>
                          </Link>
                          <Button variant="danger" size="sm" className="mx-1" onClick={() => deleteUser(user.id)}>
                            <FaTrash size={16} />
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </animated.div>
                )}
              </InView>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}