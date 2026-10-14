
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <a href="#home" className="logo" onClick={closeMenu}>
        Barrywhite<span> Travel Agency.</span>
      </a>

      <button
        type="button"
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls="main-nav-links"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div
        id="main-nav-links"
        className={`nav-links ${menuOpen ? "active" : ""}`}
      >
        <a href="#home" onClick={closeMenu}>Home</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#services" onClick={closeMenu}>Services</a>
        <a href="#destinations" onClick={closeMenu}>Destinations</a>
        <a href="#packages" onClick={closeMenu}>Packages</a>
        <a
          href="#contact"
          className="nav-button"
          onClick={closeMenu}
        >
          Contact Us
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
