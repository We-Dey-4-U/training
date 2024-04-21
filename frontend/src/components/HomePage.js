import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <header className="header">
        <h1>Welcome to Your App</h1>
        <nav className="primary-nav">
          <ul>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <h2>Discover Great Products</h2>
        <p>Explore our wide range of products and find exactly what you need.</p>
        <Link to="/shop" className="cta-button">Shop Now</Link>
      </section>

      <section className="featured-products">
        {/* Add featured products here */}
      </section>

      <footer className="footer">
        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;