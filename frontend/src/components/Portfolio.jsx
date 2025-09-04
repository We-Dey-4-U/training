import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "Web3 Token & DApp",
    description:
      "A decentralized application where I wrote and deployed smart contracts to create tokens and manage blockchain-based transactions.",
    images: ["/utrx23.jpg", "/pol.jpg", "/tokenvalue.jpg"],
    link: "https://utrxtoken.org/",
  },
  {
    title: "Artisan Connect App",
    description:
      "A platform connecting local artisans with customers, providing service booking, real-time communication, and secure payments.",
    images: ["/artisan1.jpg", "/artisan2.jpg", "/artisan3.jpg"],
    link: "https://artsanconnectltd-3.onrender.com/",
  },
  {
    title: "Multi-School Management System",
    description:
      "A comprehensive solution with role-based access for super admins, school admins, teachers, students, and parents.",
    images: ["/school.jpg", "/school2.jpg"],
    link: "https://salmon-lark-841503.hostingersite.com/",
  },
  {
    title: "Portfolio Website",
    description:
      "A responsive and professional personal portfolio built with React and modern UI libraries to showcase my skills, projects, and CV.",
    images: ["/ik.jpg", "/ik.jpg"],
    link: "https://ikenna-digital.onrender.com/", // 🔗 replace with your real portfolio link
  },
  {
    title: "E-commerce Platform",
    description:
      "An online store with product catalog, shopping cart, user authentication, and secure checkout for seamless shopping experiences.",
    images: ["/ecom1.jpg", "/ecom2.jpg", "/ecom3.jpg"],
    link: "https://your-ecommerce-link.com/", // 🔗 replace with your deployed e-commerce project
  },
];

function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((current - 1 + images.length) % images.length);
  const nextSlide = () => setCurrent((current + 1) % images.length);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const carouselStyle = {
    position: "relative",
    width: "100%",
    height: "300px",
    overflow: "hidden",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity 1s ease-in-out, transform 0.7s ease-in-out",
    position: "absolute",
    top: 0,
    left: 0,
  };

  const overlayStyle = {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.25), transparent)",
  };

  const buttonStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(255,255,255,0.8)",
    border: "none",
    borderRadius: "50%",
    padding: "8px",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  };

  return (
    <div style={carouselStyle}>
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt="Project"
          style={{
            ...imgStyle,
            opacity: index === current ? 1 : 0,
            zIndex: index === current ? 1 : 0,
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      ))}

      <div style={overlayStyle}></div>

      <button onClick={prevSlide} style={{ ...buttonStyle, left: "10px" }}>
        <ChevronLeft size={20} />
      </button>

      <button onClick={nextSlide} style={{ ...buttonStyle, right: "10px" }}>
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

export default function Portfolio() {
  const sectionStyle = {
    padding: "80px 24px",
    backgroundColor: "#f9fafb",
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "800",
    textAlign: "center",
    marginBottom: "56px",
    color: "#1f2937",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const cardStyle = {
    display: "block",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    overflow: "hidden",
    textDecoration: "none",
    color: "inherit",
    transition: "transform 0.3s, box-shadow 0.3s",
  };

  const cardHover = (e) => {
    e.currentTarget.style.transform = "translateY(-8px)";
    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
  };

  const cardLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
  };

  const textContainerStyle = {
    padding: "24px",
  };

  const projectTitleStyle = {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#4f46e5",
    transition: "color 0.3s",
  };

  const projectDescStyle = {
    fontSize: "0.95rem",
    color: "#4b5563",
    lineHeight: "1.5",
  };

  return (
    <section style={sectionStyle}>
      <h2 style={titleStyle}>My Projects</h2>
      <div style={gridStyle}>
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={cardStyle}
            onMouseOver={cardHover}
            onMouseOut={cardLeave}
          >
            <ImageCarousel images={project.images} />
            <div style={textContainerStyle}>
              <h3
                style={projectTitleStyle}
                onMouseOver={(e) => (e.currentTarget.style.color = "#4338ca")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#4f46e5")}
              >
                {project.title}
              </h3>
              <p style={projectDescStyle}>{project.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}