import React from "react";
import { Routes, Route } from "react-router-dom";
import AppNavbar from "./Layout/Navbar";
import AddUser from "./User/Adduser";
import ViewAllUsers from "./User/ViewAll";
import EditUser from "./User/EditUser";
import ViewUser from "./User/ViewUser";
import AdminHome from "./User/AdminHome";
import UpdateProfile from "./User/UpdateProfile";
import UserProfile from "./User/UserProfile";

const Dashboard = ({ onLogout }) => {
  return (
    <div className="App">
      <AppNavbar />
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/manageuser" element={<ViewAllUsers />} />
        <Route path="adduser" element={<AddUser />} />
        <Route path="edituser/:id" element={<EditUser />} />
        <Route path="viewuser/:id" element={<ViewUser />} />
        <Route path="update-profile" element={<UpdateProfile />} />
        <Route path="profile" element={<UserProfile />} />
      </Routes>
    </div>
  );
};

export default Dashboard;

