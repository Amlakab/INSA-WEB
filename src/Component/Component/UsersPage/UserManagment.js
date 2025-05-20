import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import UserService from '../Services/UserService';

const UserManagment = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await UserService.getAllUsers(localStorage.getItem('token'));
            if(response){
                setUsers(response);
            }else{
                Swal.fire({
                    icon: 'warning',
                    title: 'No Users',
                    text: error.response?.data?.message || 'Please try again.',
                    timer: 2000,
                    showConfirmButton: false,
                });  
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to Fetch Users',
                text: error.response?.data?.message || 'Please try again.',
                timer: 2000,
                showConfirmButton: false,
            });
            console.error('Fetch Users Error:', error);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'You will not be able to recover this user!',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        });

        if (result.isConfirmed) {
            try {
                await UserService.deleteUser(id, localStorage.getItem('token'));
                fetchUsers(); // Refresh the user list
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'The user has been deleted.',
                    timer: 2000,
                    showConfirmButton: false,
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to Delete User',
                    text: error.response?.data?.message || 'Please try again.',
                    timer: 2000,
                    showConfirmButton: false,
                });
                console.error('Delete User Error:', error);
            }
        }
    };

    const handleView = (id) => {
        navigate(`/view-user/${id}`); // Navigate to view user page
    };

    const handleUpdate = (id) => {
        navigate(`/update-user/${id}`); // Navigate to update user page
    };

    const handleAddUser = () => {
        navigate('/registration'); // Navigate to registration page
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">User Management</h2>
            <Button variant="primary" onClick={handleAddUser} className="mb-4">
                <FontAwesomeIcon icon={faPlus} /> Add User
            </Button>
            <Row>
                {users.map((user) => (
                    <Col key={user.id} md={4} className="mb-4">
                        <Card className="shadow">
                            <Card.Body>
                                <Card.Title>{user.name}</Card.Title>
                                <Card.Text>
                                    <strong>Email:</strong> {user.email}<br />
                                    <strong>City:</strong> {user.city}<br />
                                    <strong>Role:</strong> {user.role}
                                </Card.Text>
                                <Button variant="info" onClick={() => handleView(user.id)} className="me-2">
                                    <FontAwesomeIcon icon={faEye} /> View
                                </Button>
                                <Button variant="warning" onClick={() => handleUpdate(user.id)} className="me-2">
                                    <FontAwesomeIcon icon={faEdit} /> Update
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(user.id)}>
                                    <FontAwesomeIcon icon={faTrash} /> Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default UserManagment;