import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import LogoImage from "../assets/logo12.png"; // ✅ replace with your logo path

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with ${email}`);
    setEmail("");
  };

  const styles = {
    footer: {
      backgroundColor: "#111827",
      color: "#fff",
      padding: "60px 20px 30px 20px",
      textAlign: "center",
      fontFamily: "sans-serif",
    },
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "40px",
      maxWidth: "1200px",
      margin: "0 auto 30px auto",
      textAlign: "left",
    },
    logo: {
      height: "100px", // ✅ increased height
      width: "100px", // ✅ increased width
      objectFit: "contain",
      marginBottom: "15px",
    },
    brandDesc: {
      fontSize: "14px",
      lineHeight: "1.6",
      color: "#D1D5DB",
    },
    sectionTitle: { fontSize: "18px", fontWeight: "600", marginBottom: "15px" },
    link: {
      display: "block",
      color: "#D1D5DB",
      textDecoration: "none",
      marginBottom: "8px",
      fontSize: "14px",
      transition: "color 0.3s",
    },
    linkHover: { color: "#4F46E5" },
    form: { display: "flex", flexDirection: "column", gap: "10px" },
    input: {
      padding: "12px",
      borderRadius: "8px",
      border: "none",
      fontSize: "14px",
      outline: "none",
    },
    btn: {
      padding: "12px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#4F46E5",
      color: "#fff",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background 0.3s",
    },
    btnHover: { backgroundColor: "#4338CA" },
    social: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginBottom: "20px",
    },
    socialIcon: {
      color: "#fff",
      fontSize: "18px",
      textDecoration: "none",
      transition: "color 0.3s",
    },
    copy: { fontSize: "13px", color: "#9CA3AF" },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* ✅ Brand Logo & About */}
        <div>
          <img src={LogoImage} alt="Logo" style={styles.logo} />
          <p style={styles.brandDesc}>
            Passionate software developer crafting modern web and mobile applications.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={styles.sectionTitle}>Quick Links</h3>
          {["About", "Services", "Portfolio", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={styles.link}
              onMouseOver={(e) => (e.currentTarget.style.color = styles.linkHover.color)}
              onMouseOut={(e) => (e.currentTarget.style.color = styles.link.color)}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Services */}
        <div>
          <h3 style={styles.sectionTitle}>My Services</h3>
          {["Web Development", "Mobile Apps", "UI/UX Design", "Web3 Solutions"].map((service) => (
            <p key={service} style={styles.link}>
              {service}
            </p>
          ))}
        </div>

        {/* Newsletter */}
        <div>
          <h3 style={styles.sectionTitle}>Subscribe</h3>
          <form onSubmit={handleSubscribe} style={styles.form}>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
            <button
              type="submit"
              style={styles.btn}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = styles.btnHover.backgroundColor)
              }
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.btn.backgroundColor)}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Social Media */}
      <div style={styles.social}>
        {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
          <a
            key={index}
            href="#"
            style={styles.socialIcon}
            onMouseOver={(e) => (e.currentTarget.style.color = "#4F46E5")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
          >
            <Icon />
          </a>
        ))}
      </div>

      {/* Copyright */}
      <p style={styles.copy}>
        &copy; {new Date().getFullYear()} Chieke Ikenna. All rights reserved.
      </p>
    </footer>
  );
}