import React, { useContext, useState } from 'react';
import CartContext from '../context/CartContext';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useNavigate } from 'react-router-dom'; 
import '../index.css'; // Import your CSS file
import api from '../api'; // Import the API base URL

function CheckoutPage() {
  const { cart, calculateTotalPrice, clearCart, updateCartItemQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [isProcessing, setIsProcessing] = useState(false); // State to track order processing
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: ''
  }); // State to store shipping address

  // Handle input change for shipping address
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value
    });
  };

  const handleQuantityChange = (productId, newQuantity) => {
    // Check if updateCartItemQuantity function is available
    if (updateCartItemQuantity) {
      // Update quantity for the specified product in the cart
      updateCartItemQuantity(productId, newQuantity);
    } else {
      console.error('updateCartItemQuantity function is not available');
    }
  };

  const handleRemoveItemClick = (productId) => {
    // Remove the specified product from the cart
    removeFromCart(productId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true); // Set state to indicate processing
  
    try {
      // Modify the mapping of the cart array to include productId and quantity properties
      const processedCart = cart.map(item => ({ productId: item._id, quantity: item.quantity }));
  
      const response = await api.post('/orders/process-order', {
        cart: processedCart,
        totalPrice: calculateTotalPrice(),
        shippingAddress
      });
      
      const { orderId } = response.data; // Extract orderId from the response data
      if (!orderId) {
        throw new Error('Order ID not found in response');
      }
      clearCart(); // Clear cart after successful order processing
      navigate(`/order/${orderId}`); // Redirect to order page with order ID
    } catch (error) {
      console.error('Error processing order:', error);
      setIsProcessing(false); // Reset processing state
      // Handle error, show message to the user, etc.
    }
  };
  

  // Handle PayPal payment completion
  const handlePaymentSuccess = (details, data) => {
    console.log('Payment successful:', details);
    handleSubmit(); // Submit the order upon successful payment
  };

  // Handle PayPal payment cancellation
  const handlePaymentCancel = (data) => {
    console.log('Payment cancelled:', data);
    // Implement logic to handle payment cancellation
  };

  return (
    <div className="checkout-container">
      <div className="left-container">
        <h2>Checkout</h2>
        <div className="cart-items">
          <h3>Cart Items</h3>
          <ul>
            {cart.map((item, index) => (
              <li key={item._id || index} className="cart-item">
                <img src={`http://localhost:3000/uploads/${item.image}`} alt={item.name} className="product-image" />
                <div className="product-details">
                  <p>{item.name}</p>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                    min="1"
                  />
                  <p>Total: ${item.price * item.quantity}</p>
                  <button onClick={() => handleRemoveItemClick(item._id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="checkout-summary">
          <h3>Summary</h3>
          <p>Total Price: ${calculateTotalPrice()}</p>
        </div>
        <div className="shipping-address">
          <h3>Shipping Address</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Full Name:
              <input type="text" name="fullName" value={shippingAddress.fullName} onChange={handleInputChange} />
            </label>
            <label>
              Address:
              <input type="text" name="address" value={shippingAddress.address} onChange={handleInputChange} />
            </label>
            <label>
              City:
              <input type="text" name="city" value={shippingAddress.city} onChange={handleInputChange} />
            </label>
            {/* Add more address fields as needed */}
            <button type="submit" disabled={isProcessing}>Submit Order</button>
          </form>
        </div>
      </div>
      <div className="right-container">
        <div className="paypal-button">
          <PayPalScriptProvider options={{ 'client-id': 'AUZfGvEgrryvFBhpS4ioMns0ECGCehJHJBEDEHNNcekDqM-IDNOqnit1g5oIrdCDqCcnGqSU-QDf-h_l' }}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: calculateTotalPrice(),
                      currency_code: 'USD'
                    }
                  }]
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(function(details) {
                  handlePaymentSuccess(details, data);
                });
              }}
              onCancel={(data) => {
                handlePaymentCancel(data);
              }}
              style={{ layout: 'horizontal' }} // Customize button layout
              disabled={isProcessing} // Disable button while processing order
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;