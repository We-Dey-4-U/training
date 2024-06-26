// HomePage.js
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import CartContext from '../context/CartContext';
import '@fortawesome/fontawesome-free/css/all.css';
import ProductImage from './ProductImage'; // Import the ProductImage component

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { cart, addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await api.get('/api/products');
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div>
      <header className="header">
        <nav className="primary-nav">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/checkout"><i className="fas fa-shopping-cart"></i>{cart.length > 0 && <span style={{ color: 'red', fontSize: '1.2rem', fontWeight: 'bold' }}>{cart.length}</span>}</Link></li>
            
          </ul>
        </nav>
      </header>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-list">
          {featuredProducts.map(product => (
            <div key={product._id} className="product-card">
              <img src={`http://localhost:3000/uploads/${product.image}`} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <div className="button-group">
                <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;