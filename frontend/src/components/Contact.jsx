import React, { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";

export default function Contact() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sectionStyle = {
    padding: "80px 20px",
    backgroundColor: "#F3F4F6",
  };

  const containerStyle = {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
    gap: "40px",
    alignItems: "start",
  };

  const titleStyle = {
    fontSize: isMobile ? "28px" : "36px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "16px",
    color: "#1F2937",
  };

  const subtitleStyle = {
    fontSize: isMobile ? "16px" : "18px",
    color: "#4B5563",
    textAlign: "center",
    marginBottom: "50px",
    lineHeight: "1.6",
  };

  const advertBox = {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  };

  const advertHeading = {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "16px",
    color: "#111827",
  };

  const advertList = {
    lineHeight: "1.8",
    color: "#374151",
    fontSize: "16px",
    paddingLeft: "20px",
  };

  const formStyle = {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const inputStyle = {
    padding: "14px 18px",
    borderRadius: "12px",
    border: "1px solid #D1D5DB",
    fontSize: isMobile ? "14px" : "16px",
    outline: "none",
    transition: "all 0.3s ease",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: isMobile ? "120px" : "150px",
    resize: "none",
  };

  const buttonStyle = {
    padding: "14px 0",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#4F46E5",
    color: "#FFFFFF",
    fontSize: isMobile ? "16px" : "18px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const handleHover = (e) =>
    (e.currentTarget.style.backgroundColor = "#4338CA");
  const handleLeave = (e) =>
    (e.currentTarget.style.backgroundColor = "#4F46E5");

  // 🔹 Formspree integration with form key
  const [state, handleSubmit] = useForm("xpznvjqe");

  return (
    <section id="contact" style={sectionStyle}>
      <h2 style={titleStyle}>Get In Touch</h2>
      <p style={subtitleStyle}>
        Have a project in mind? Let’s collaborate and make it happen!
      </p>

      <div style={containerStyle}>
        {/* Advert Section */}
        <div style={advertBox}>
          <h3 style={advertHeading}>🚀 What We Can Do For You</h3>
          <ul style={advertList}>
            <li>✔ Build professional, modern websites & web apps</li>
            <li>✔ Automate and streamline your business processes</li>
            <li>✔ Set up robust network infrastructures & Data Centres</li>
            <li>✔ Install advanced Security & Surveillance Systems</li>
          </ul>
          <p style={{ marginTop: "16px", color: "#4B5563", fontSize: "15px" }}>
            Whatever your needs are — we deliver reliable, scalable, and secure
            solutions tailored to your goals.
          </p>
        </div>

        {/* Contact Form */}
        <form style={formStyle} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            name="name"
            style={inputStyle}
            required
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} />

          <input
            type="email"
            placeholder="Your Email"
            name="email"
            style={inputStyle}
            required
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />

          <textarea
            placeholder="Your Message"
            name="message"
            style={textareaStyle}
            required
          ></textarea>
          <ValidationError prefix="Message" field="message" errors={state.errors} />

          {state.succeeded && (
            <div style={{ color: "green", fontWeight: "600" }}>
              ✅ Your message has been sent successfully!
            </div>
          )}

          <button
            type="submit"
            disabled={state.submitting}
            style={buttonStyle}
            onMouseOver={handleHover}
            onMouseOut={handleLeave}
          >
            {state.submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}