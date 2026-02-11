import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import AddPlace from "./pages/AddPlace";
import About from "./pages/About";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";

function App() {
  return (
    <div className="app">
      <nav className="nav">
        <Link to="/">Home</Link> |{" "}
        <Link to="/addplace">Add Place</Link> |{" "}
        <Link to="/about">About</Link>
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
  )
}

export default App
