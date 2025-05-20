import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear authentication tokens or session data
    localStorage.removeItem("authToken"); // Example for JWT token
    sessionStorage.removeItem("authToken"); // If using sessionStorage instead

    // Redirect the user to the home page or login page after logout
    navigate("/"); // Redirect to Home page or login page
  }, [navigate]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
