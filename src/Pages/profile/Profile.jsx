import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Profile.scss"; // Create this for styling

const Profile = () => {
  const { currentUser, updateUser } = useContext(AuthContext); 
  const [formData, setFormData] = useState({
    firstname: currentUser?.firstname || "",
    lastname: currentUser?.lastname || "",
    email: currentUser?.email || "",
    username: currentUser?.username || "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    const updatedData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      username: formData.username,
      ...(formData.password && { password: formData.password }),
    };

    updateUser(updatedData); // Make sure this updates your database/auth system
    setMessage("Profile updated successfully!");
    setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
  };

  return (
    <div className="profile-page">
      <h1>Admin Profile</h1>
      {message && <p className="message">{message}</p>}
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="update-btn">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
