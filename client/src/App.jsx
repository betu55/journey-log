import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import AddPlace from "./pages/AddPlace";
import About from "./pages/About";
import Error404 from "./pages/Error404";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/addplace">Add Place</Link> |{" "}
        <Link to="/about">About</Link>
      </nav>


      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/addplace" element={<AddPlace />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
   
    </>
  )
}

export default App
