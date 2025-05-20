import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiLogOut, FiEdit, FiSave } from "react-icons/fi";
import UserService from '../Services/UserService';

const UserDashboard = () => {
  const [user, setUser] = useState({ 
    name: "",
    email: "",
    profilePicture: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const profileData = await UserService.getYourProfile(token);
        setUser(profileData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch profile data.");
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Handle profile update
  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      await UserService.updateUser(user.id, user, token);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle logout
  const handleLogout = () => {
    UserService.logout();
    window.location.href = "/login"; // Redirect to login page
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            <FiLogOut className="mr-2" /> Logout
          </button>
        </div>

        {/* Profile Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Your Profile
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                />
              ) : (
                <p className="text-gray-800">{user.name}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-600">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                />
              ) : (
                <p className="text-gray-800">{user.email}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-600">Profile Picture</label>
              {isEditing ? (
                <input
                  type="text"
                  name="profilePicture"
                  value={user.profilePicture}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg"
                />
              ) : (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full"
                />
              )}
            </div>
          </div>
        </motion.div>

        {/* Edit/Save Button */}
        <div className="flex justify-end">
          {isEditing ? (
            <button
              onClick={handleUpdateProfile}
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              <FiSave className="mr-2" /> Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              <FiEdit className="mr-2" /> Edit Profile
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UserDashboard;