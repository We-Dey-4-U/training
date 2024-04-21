import React, { createContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  
  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item._id !== productId);
    setCart(updatedCart);
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Function to calculate the total price of the cart
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  // Function to update the quantity of a product in the cart
  const updateCartItemQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map(item => {
      if (item._id === productId) {
        return { ...item, quantity: parseInt(newQuantity) };
      }
      return item;
    });
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, calculateTotalPrice, updateCartItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;