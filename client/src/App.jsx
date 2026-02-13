import { useState } from 'react'
import './App.css'
import { Routes, Route, NavLink } from "react-router-dom";
import AddPlace from "./pages/AddPlace";
import About from "./pages/About";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";

function App() {
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
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/addplace">Add Place</NavLink>
            <NavLink to="/about">About</NavLink>
          </div>
        </div>
      </nav>

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addplace" element={<AddPlace />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
    </div>
  );
}

export default App
