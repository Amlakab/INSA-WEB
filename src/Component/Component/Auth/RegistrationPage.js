import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import UserService from '../Services/UserService';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar'; // Import the Navbar component
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faCity, faLock, faUserTag } from '@fortawesome/free-solid-svg-icons';

const RegistrationPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { name, email, city, password, role };
            const response = await UserService.register(userData, localStorage.getItem('token'));
            console.log('Registration Response:', response);

            // Show success alert
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful',
                text: 'You have been registered successfully!',
                timer: 2000,
                showConfirmButton: false,
            });

            navigate('/usermanagment'); // Redirect to user management page
        } catch (error) {
            // Show error alert
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: error.response?.data?.message || 'Please try again.',
                timer: 2000,
                showConfirmButton: false,
            });
            console.error('Registration Error:', error);
        }
    };

    return (
        <div>
            {/* Navbar */}
            <NavBar />
        <Container className="mt-5">
            <Card className="shadow">
                <Card.Body>
                    <h2 className="text-center mb-4">
                        <FontAwesomeIcon icon={faUser} /> Registration
                    </h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <FontAwesomeIcon icon={faUser} /> Name
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>
                                <FontAwesomeIcon icon={faEnvelope} /> Email
                            </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>
                                <FontAwesomeIcon icon={faCity} /> City
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>
                                <FontAwesomeIcon icon={faLock} /> Password
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>
                                <FontAwesomeIcon icon={faUserTag} /> Role
                            </Form.Label>
                            <Form.Select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Register
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
        </div>
    );
};

export default RegistrationPage;