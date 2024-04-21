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
        setOrder(response.data.order);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch order details');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

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
                <img src={product.image} alt={product.name} className="product-image" />
                {/* Add more details as needed */}
              </li>
            ))}
          </ul>
          <p className="total-price">Total Price: ${order.totalPrice}</p>
          <p className="payment-method">Payment Method: {order.paymentMethod}</p>
        </div>
      )}
    </div>
  );
}

export default OrderPage;