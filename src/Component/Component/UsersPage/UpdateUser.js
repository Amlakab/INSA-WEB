import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../Services/UserService';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const UpdateUser = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [role, setRole] = useState('USER');
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, [id]);

    const fetchUser = async () => {
        try {
            const response = await UserService.getUserById(id, localStorage.getItem('token'));
            setName(response.name);
            setEmail(response.email);
            setCity(response.city);
            setRole(response.role);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to Fetch User',
                text: error.response?.data?.message || 'Please try again.',
                timer: 2000,
                showConfirmButton: false,
            });
            console.error('Fetch User Error:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { name, email, city, role };
            await UserService.updateUser(id, userData, localStorage.getItem('token'));
            Swal.fire({
                icon: 'success',
                title: 'User Updated',
                text: 'User details have been updated successfully!',
                timer: 2000,
                showConfirmButton: false,
            });
            navigate('/usermanagment'); // Navigate back to user management page
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: error.response?.data?.message || 'Please try again.',
                timer: 2000,
                showConfirmButton: false,
            });
            console.error('Update User Error:', error);
        }
    };

    const handleBack = () => {
        navigate('/usermanagment'); // Navigate back to user management page
    };

    return (
        <Container className="mt-5">
            <Card className="shadow">
                <Card.Body>
                    <Button variant="secondary" onClick={handleBack} className="mb-3">
                        <FontAwesomeIcon icon={faArrowLeft} /> Back
                    </Button>
                    <h2>Update User</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            <FontAwesomeIcon icon={faSave} /> Save Changes
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UpdateUser;