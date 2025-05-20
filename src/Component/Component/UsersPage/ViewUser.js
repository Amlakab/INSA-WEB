import React, { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../Services/UserService';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ViewUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, [id]);

    const fetchUser = async () => {
        try {
            const response = await UserService.getUserById(id, localStorage.getItem('token'));
            setUser(response);
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

    const handleBack = () => {
        navigate('/usermanagment'); // Navigate back to user management page
    };

    if (!user) return <div>Loading...</div>;

    return (
        <Container className="mt-5">
            <Card className="shadow">
                <Card.Body>
                    <Button variant="secondary" onClick={handleBack} className="mb-3">
                        <FontAwesomeIcon icon={faArrowLeft} /> Back
                    </Button>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Text>
                        <strong>Email:</strong> {user.email}<br />
                        <strong>City:</strong> {user.city}<br />
                        <strong>Role:</strong> {user.role}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ViewUser;