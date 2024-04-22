import React, { useState, useEffect, useRef } from 'react';
import api from '../../api';
import Hammer from 'hammerjs';

const SERVER_URL = 'http://localhost:3000';

const getImageUrl = (imageName) => `${SERVER_URL}/uploads/${imageName}`;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const imageRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      const hammer = new Hammer(imageRef.current);
      hammer.on('swipeleft', handleSwipeLeft);
      hammer.on('swiperight', handleSwipeRight);
      return () => {
        hammer.off('swipeleft', handleSwipeLeft);
        hammer.off('swiperight', handleSwipeRight);
        hammer.destroy();
      };
    }
  }, [products]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = (productId) => {
    const productToAdd = products.find(product => product.id === productId);
    if (productToAdd) {
      setCart([...cart, productToAdd]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleSwipeLeft = () => {
    if (imageRef.current) {
      imageRef.current.style.transition = 'transform 0.5s ease'; // Optional: Add a transition effect
      imageRef.current.style.transform = 'rotate(-90deg)';
    }
  };

  const handleSwipeRight = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = 'rotate(90deg)';
    }
  };

  

  return (
    <div>
      <h2>Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <img
              ref={imageRef}
              src={getImageUrl(product.image)}
              alt={product.name}
            />
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <h2>Cart</h2>
      <div className="cart">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;