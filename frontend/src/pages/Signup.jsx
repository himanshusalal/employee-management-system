
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import API from "../api";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
 
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
   const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const { confirmPassword, ...data } = formData;

      const res = await API.post("/api/auth/signup", data);

      alert(res.data.message || "Account Created Successfully");

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        error.message ||
        "Signup Failed"
      );
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        {/* Logo */}

        <div className="logo">
          🏢
        </div>

        <h2>Employee Portal</h2>

        <p className="subtitle">
          Create your account to access the Employee Management System.
        </p>

        <form onSubmit={handleSignup}>

          <input
            type="text"
            name="name"
            placeholder="👤 Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="📧 Email Address"
            value={formData.email}
            onChange={handleChange}
             autoComplete="username"
            required
          />

<div className="password-box">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="🔒 Password"
    value={formData.password}
    onChange={handleChange}
    autoComplete="new-password"
    required
  />

  <button
    type="button"
    className="show-btn"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>

          <input
            type="password"
            name="confirmPassword"
            placeholder="🔐 Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
             autoComplete="new-password"
            required
          />

          <button type="submit">
            Create Account
          </button>

        </form>

        <div className="divider">
          OR
        </div>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Sign In →
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Signup;

