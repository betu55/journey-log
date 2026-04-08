import { useState } from "react";
import Button from "../components/Button";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/places/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Account created successfully! Please login to continue.");
        window.location.href = "/login";
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Create Journey Log Account</h1>

      <form onSubmit={handleSubmit} className="add-form">
        {error && (
          <div
            style={{
              color: "#EB5f59",
              marginTop: "0.7rem",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <div className="form-group">
          <br />
          <label>Username *</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Enter your username"
          />
        </div>

        <div className="form-group">
          <label>Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password (min. 6 characters)"
          />
        </div>

        <div className="form-group">
          <label>Confirm Password *</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="btn-primary btn-full"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>

        <p style={{ textAlign: "center", marginTop: "1rem", color: "#555" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#A1CCA5", textDecoration: "none" }}>
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
