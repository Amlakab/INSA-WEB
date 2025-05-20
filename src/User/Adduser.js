import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import UserService from './UserService'; // Import the UserService
import "./AddUser.css"; // Custom styles for the form

export default function AddUser() {
  const navigate = useNavigate(); // For redirection after form submission

  // Form state
  const [user, setUser] = useState({
    name: "",
    email: "",
    city: "",
    password: "",
    role: "USER", // Default role is "USER"
  });

  const [loading, setLoading] = useState(false); // For loading state
  const [errors, setErrors] = useState({}); // For validation errors

  // Handle input change
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!user.name) newErrors.name = "Name is required";
    if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "A valid email is required";
    }
    if (!user.city) newErrors.city = "City is required";
    if (!user.password) newErrors.password = "Password is required";
    return newErrors;
  };

  // Handle form submit
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true); // Start loading

    try {
      // Use UserService to register the user
      await UserService.register(user, localStorage.getItem('token'));
      setLoading(false);
      // Success alert using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'User successfully registered!',
        showConfirmButton: false,
        timer: 2000,
      });

      // Redirect to home page after submission
      setTimeout(() => {
        navigate("/dashboard/");
      }, 2000);

    } catch (error) {
      setLoading(false);

      // Error alert using SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There was an error while submitting the form. Please try again.',
      });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 add-user-form border rounded p-4 mt-5 shadow-lg">
          <h2 className="text-center mb-4">User Registration</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Enter Your Name"
                name="name"
                value={user.name}
                onChange={onInputChange}
                required
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter Your Email"
                name="email"
                value={user.email}
                onChange={onInputChange}
                required
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                className={`form-control ${errors.city ? "is-invalid" : ""}`}
                placeholder="Enter Your City"
                name="city"
                value={user.city}
                onChange={onInputChange}
                required
              />
              {errors.city && <div className="invalid-feedback">{errors.city}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                placeholder="Enter Your Password"
                name="password"
                value={user.password}
                onChange={onInputChange}
                required
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <select
                className="form-control"
                name="role"
                value={user.role}
                onChange={onInputChange}
                required
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            {/* Loading Spinner */}
            {loading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-primary w-48">Submit</button>
                  <button
                    type="button"
                    className="btn btn-danger w-48"
                    onClick={() => navigate("/dashboard/")}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
