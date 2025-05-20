import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserService from '../Services/UserService';

const UserProfile = () => {
    const navigate = useNavigate();

    // Check if the user is logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Access Denied',
                text: 'Please log in to view your profile.',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/login'); // Redirect to login if not authenticated
            });
        }
    }, [navigate]);

    const handleLogout = () => {
        UserService.logout();
        navigate('/login');
    };

    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            <p>Welcome to your profile page!</p>
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
        </div>
    );
};

export default UserProfile;