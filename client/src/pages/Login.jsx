import { useState } from "react";
import Button from "../components/Button";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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

    try {
      const response = await fetch("http://localhost:8080/api/places/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (data.success) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.data));
        window.location.href = "/";
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Login to Journey Log</h1>

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
            placeholder="Enter your password"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="btn-primary btn-full"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <p style={{ textAlign: "center", marginTop: "1rem", color: "#555" }}>
          Don't have an account?{" "}
          <a
            href="/register"
            style={{ color: "#A1CCA5", textDecoration: "none" }}
          >
            Sign up here
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
