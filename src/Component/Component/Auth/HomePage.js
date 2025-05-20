import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar'; // Import the Navbar component
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    return (
        <div>
            {/* Navbar */}
            <NavBar />

            {/* Hero Section */}
            <section className="hero-section bg-primary text-white text-center py-5">
                <div className="container">
                    <h1 className="display-4">Welcome to Our Website</h1>
                    <p className="lead">
                        Discover amazing features and services tailored just for you.
                    </p>
                    <div className="mt-4">
                        <Link to="/login" className="btn btn-light btn-lg mx-2">
                            Login
                        </Link>
                        <Link to="/registration" className="btn btn-outline-light btn-lg mx-2">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section py-5">
                <div className="container">
                    <h2 className="text-center mb-5">Our Features</h2>
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <div className="feature-item p-4">
                                <h3>User Dashboard</h3>
                                <p>
                                    Manage your profile, view stats, and access personalized content.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 text-center">
                            <div className="feature-item p-4">
                                <h3>Secure Login</h3>
                                <p>
                                    Enjoy a secure and seamless login experience with advanced
                                    encryption.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 text-center">
                            <div className="feature-item p-4">
                                <h3>24/7 Support</h3>
                                <p>
                                    Get help anytime with our dedicated support team.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section bg-light py-5">
                <div className="container">
                    <h2 className="text-center mb-4">About Us</h2>
                    <p className="text-center lead">
                        We are a team of passionate developers dedicated to creating user-friendly
                        and innovative solutions for our clients. Our mission is to make technology
                        accessible and enjoyable for everyone.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer bg-dark text-white py-4">
                <div className="container text-center">
                    <p>&copy; 2023 MyWebsite. All rights reserved.</p>
                    <div className="mt-3">
                        <Link to="/privacy" className="text-white mx-2">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-white mx-2">
                            Terms of Service
                        </Link>
                        <Link to="/contact" className="text-white mx-2">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;