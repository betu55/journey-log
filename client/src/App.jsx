import { useState } from 'react'
import './App.css'
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import AddPlace from "./pages/AddPlace";
import About from "./pages/About";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Personal from "./pages/Personal";
import AccountBanner from "./components/AccountBanner";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-logo">
            <NavLink to="/" className="home-link">
              Journey Log
            </NavLink>
          </div>

          <div className="nav-links">
            {currentUser && (
              <>
                <NavLink to="/" end>
                  Home
                </NavLink>
                <NavLink to="/addplace">Add Place</NavLink>
                <NavLink to="/personal">Personal</NavLink>
              </>
            )}
            <NavLink to="/about">About</NavLink>
            {currentUser ? (
              <AccountBanner currentUser={currentUser} onLogout={handleLogout} />
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </div>
        </div>
      </nav>

      <main className="main">
        <Routes>
          <Route
            path="/"
            element={currentUser ? <Home currentUser={currentUser} /> : <Navigate to="/login" replace />}
          />
          <Route path="/addplace" element={currentUser ? <AddPlace /> : <Navigate to="/login" replace />} />
          <Route path="/personal" element={currentUser ? <Personal /> : <Navigate to="/login" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={currentUser ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/register" element={currentUser ? <Navigate to="/" replace /> : <Register />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
    </div>
  );
}

export default App
