import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AddPlace from "./pages/AddPlace.jsx";
import About from "./pages/About.jsx";
import Error404 from "./pages/Error404.jsx"

const root = document.getElementById("root");

if (window.location.pathname === "/") {
  createRoot(root).render( 
  <StrictMode>
    <App />
  </StrictMode>,);
} else if (window.location.pathname === "/addplace") {
  createRoot(root).render( 
  <StrictMode>
    <AddPlace />
  </StrictMode>,);
} else if (window.location.pathname === "/about") {
  createRoot(root).render( 
  <StrictMode>
    <About />
  </StrictMode>,);
} else {
  createRoot(root).render(
    <StrictMode>
      <Error404 />
    </StrictMode>
  );
}
