import React, { useState, useEffect } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import LogoImage from "../assets/logo12.png"; // Replace with your logo path

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update state when screen resizes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#1E3A8A",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "70px",
    zIndex: 50,
  };

  const leftSection = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  };

  const logoStyle = {
    maxHeight: "70px",
    width: "auto",
    objectFit: "contain",
    cursor: "pointer",
  };

  const ulStyle = {
    display: "flex",
    gap: "30px",
    listStyle: "none",
    margin: 0,
    padding: 0,
    alignItems: "center",
  };

  const socialStyle = {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  };

  const socialIcon = {
    color: "#ffffff",
    fontSize: "18px",
    transition: "color 0.3s",
  };

  const mobileMenuStyle = {
    display: menuOpen ? "flex" : "none",
    flexDirection: "column",
    position: "absolute",
    top: "70px",
    right: "20px",
    backgroundColor: "#1E3A8A",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    gap: "15px",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "500",
    transition: "color 0.3s ease",
  };

  const hoverStyle = { color: "#93C5FD" };

  const buttonStyle = {
    padding: "8px 16px",
    backgroundColor: "#F59E0B", // Amber/Gold for contrast
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "600",
    borderRadius: "8px",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
  };

  const hamburgerStyle = {
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    gap: "5px",
  };

  const barStyle = {
    width: "25px",
    height: "3px",
    backgroundColor: "#ffffff",
    borderRadius: "3px",
  };

  return (
    <nav style={navStyle}>
      {/* ✅ Left side: Logo + Socials */}
      <div style={leftSection}>
        <img src={LogoImage} alt="Logo" style={logoStyle} />
        {!isMobile && (
          <div style={socialStyle}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={socialIcon}>
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={socialIcon}>
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={socialIcon}>
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/chieke-ikenna" target="_blank" rel="noopener noreferrer" style={socialIcon}>
              <FaLinkedinIn />
            </a>
          </div>
        )}
      </div>

      {/* ✅ Desktop Menu */}
      {!isMobile && (
        <ul style={ulStyle}>
          {["About", "Services", "Portfolio", "Contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                style={linkStyle}
                onMouseOver={(e) => (e.target.style.color = hoverStyle.color)}
                onMouseOut={(e) => (e.target.style.color = "#ffffff")}
              >
                {item}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/ikennacv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={buttonStyle}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#D97706")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#F59E0B")}
            >
              Download CV
            </a>
          </li>
        </ul>
      )}

      {/* ✅ Hamburger for Mobile */}
      {isMobile && (
        <div style={hamburgerStyle} onClick={() => setMenuOpen(!menuOpen)}>
          <div style={barStyle}></div>
          <div style={barStyle}></div>
          <div style={barStyle}></div>
        </div>
      )}

      {/* ✅ Mobile Dropdown */}
      {isMobile && (
        <div style={mobileMenuStyle}>
          {["About", "Services", "Portfolio", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={linkStyle}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="/ikennacv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={buttonStyle}
            onClick={() => setMenuOpen(false)}
          >
            Download CV
          </a>
          {/* ✅ Socials in Mobile Dropdown */}
          <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={socialIcon}>
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={socialIcon}>
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={socialIcon}>
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/chieke-ikenna" target="_blank" rel="noopener noreferrer" style={socialIcon}>
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}