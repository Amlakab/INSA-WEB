import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import UserNavBar from '../Layout/UserNavbar';
import UserProfile from './UserProfile';
import UpdateProfile from './UpdateProfile';
import UserHome from './UserHome';

const UserDashboard = () => {
    return (
        <div>
            <UserNavBar />
            <Routes>
                <Route path="/" element={<UserHome />} /> {/* Default route */}
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/updateprofile" element={<UpdateProfile />} />
                <Route path="*" element={<Navigate to="/userdashboard/" />} /> {/* Redirect for unknown routes */}
            </Routes>
        </div>
    );
};

export default UserDashboard;