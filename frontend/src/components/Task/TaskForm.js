
import api from '../../api'; // Import the Axios instance



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Fetch featured products data from the backend API
    const fetchFeaturedProducts = async () => {
      try {
        const response = await api.get('/api/products/featured');
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

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
        <h2>Featured Products</h2>
        <div className="product-list">
          {featuredProducts.map(product => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <Link to={`/product/${product._id}`} className="cta-button">View Product</Link>
            </div>
          ))}
        </div>
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