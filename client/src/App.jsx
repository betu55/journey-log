import { useState, useEffect, useRef } from 'react'
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
import { io } from "socket.io-client";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);
  const [notification, setNotification] = useState(null);
  const clear = () => setNotification(null)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !currentUser) return;

    const newSocket = io("http://localhost:8080", {
      auth: { token }
    });

    socketRef.current = newSocket;
    setSocket(newSocket)

    newSocket.on("receive_msg", (msg) => {

      if (msg.username !== currentUser.username){
        setNotification({
          title: `New Comment on ${msg.placeName}`,
          text: `From User: ${msg.username}: ${msg.text.length > 40 ? msg.text.substring(0, 40) + "..." : msg.text}`
          
        });
      }

      const event = new CustomEvent("socket_msg_received", { detail: msg });
      window.dispatchEvent(event);
      setTimeout(() => setNotification(null), 5000);
  });

    return () => newSocket.disconnect();
  }, [currentUser]);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="app">
      {notification && (
      <div className = "notification">
        <div className = "notification-header">
          <strong>{notification.title}</strong>
          <p>{notification.text}</p>
        </div>
        <button className="close" onClick={clear}>&times;</button>
      </div>
      )}

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
            element={currentUser ? <Home currentUser={currentUser} socket={socket}/> : <Navigate to="/login" replace />}
          />
          <Route path="/addplace" element={currentUser ? <AddPlace socket={socket}/> : <Navigate to="/login" replace />} />
          <Route path="/personal" element={currentUser ? <Personal currentUser={currentUser} socket={socket}/> : <Navigate to="/login" replace />} />
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
