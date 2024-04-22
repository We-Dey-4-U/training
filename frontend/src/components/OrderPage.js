import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import '../index.css'; // Import your CSS file

function OrderPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setLoading(false);
        setError('Order ID is not provided');
        return;
      }

      try {
        const response = await api.get(`/orders/${orderId}`);
        const orderData = response.data.order;
        const productsWithDetails = await fetchProductDetails(orderData.products);
        orderData.products = productsWithDetails;
        setOrder(orderData);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch order details');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const fetchProductDetails = async (products) => {
    const productDetails = [];
    try {
      for (const product of products) {
        const response = await api.get(`/api/products/${product.product}`);
        const fetchedProduct = response.data;
        productDetails.push({
          _id: fetchedProduct._id,
          name: fetchedProduct.name,
          price: fetchedProduct.price,
          quantity: product.quantity,
          image: getImageUrl(fetchedProduct.image) // Construct image URL
        });
      }
    } catch (error) {
      console.error('Failed to fetch product details:', error);
    }
    return productDetails;
  };

  // Function to construct image URLs
  const getImageUrl = (imageName) => {
    const SERVER_URL = 'http://localhost:3000'; // Update with your server URL
    return `${SERVER_URL}/uploads/${imageName}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="order-details-container">
      <h2>Order Details</h2>
      <p className="order-id">Order ID: {orderId}</p>
      {order && (
        <div>
          <p className="shipping-address">Shipping Address: {order.shippingAddress && `${order.shippingAddress.fullName}, ${order.shippingAddress.address}, ${order.shippingAddress.city}`}</p>
          <h3 className="products-header">Products Ordered:</h3>
          <ul className="product-list">
            {order.products.map((product, index) => (
              <li key={index} className="product-item">
                <p className="product-name">Name: {product.name}</p>
                <p className="product-price">Price: ${product.price}</p>
                <p className="order-quantity">Quantity: {product.quantity}</p>
                {/* Display image if available */}
                {product.image && <img src={product.image} alt={product.name} className="product-image" />}
              </li>
            ))}
          </ul>
          <p className="total-price">Total Price: ${order.totalPrice}</p>
          {order.paymentMethod && <p className="payment-method">Payment Method: {order.paymentMethod}</p>}
        </div>
      )}
    </div>
  );
}

export default OrderPage;