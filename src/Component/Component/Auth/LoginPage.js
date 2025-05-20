import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import UserService from '../Services/UserService'; // Your UserService
import './LoginPage.css'; // Custom CSS for styling

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    // Check if the user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/user-usermanagment'); // Redirect to UserProfile if already logged in
        }
    }, [navigate]);

    const handleLogin = async () => {
        try {
            // Call the login method from UserService
            const response = await UserService.login(email, password);

            // Check if the login was successful
            if (response && response.token && response.role) {
                // Save token and role in localStorage
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role);

                // Show success message
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Welcome back!',
                    timer: 2000,
                    showConfirmButton: false,
                });

                // Navigate to the UserProfile page
                if(response.role=="ADMIN"){
                    navigate('/usermanagment');
                }
                else{
                    navigate('/userdashboard'); 
                }
            } else {
                // Handle unexpected response
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid response from the server.',
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            // Handle login error
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.response?.data?.message || 'Invalid credentials',
                timer: 2000,
                showConfirmButton: false,
            });
            console.error('Login Error:', error);
        }
    };

    const handleForgotPassword = () => {
        Swal.fire({
            icon: 'info',
            title: 'Forgot Password?',
            text: 'Please contact support to reset your password.',
            confirmButtonText: 'OK',
        });
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Login</h1>
                <div className="input-group">
                    <FontAwesomeIcon icon={faUser} className="input-icon" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                    />
                </div>
                <div className="input-group">
                    <FontAwesomeIcon icon={faLock} className="input-icon" />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                    />
                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="password-toggle-icon"
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </div>
                <div className="remember-me">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="rememberMe">Remember Me</label>
                </div>
                <button onClick={handleLogin} className="login-button">
                    Login
                </button>
                <p className="forgot-password" onClick={handleForgotPassword}>
                    Forgot Password?
                </p>
            </div>
        </div>
    );
};

export default LoginPage;