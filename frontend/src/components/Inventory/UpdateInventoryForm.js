import React, { useState, useEffect } from 'react';
import api from '../../api'; // Import the Axios instance
import '../../index.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';

function UpdateInventoryForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: '',
    price: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch inventory item to pre-populate form
  useEffect(() => {
    const itemId = window.location.pathname.split('/').pop(); // Extract item ID from URL
    api.get(`/api/inventory/${itemId}`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching inventory item:', error);
      });
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const itemId = window.location.pathname.split('/').pop(); // Extract item ID from URL
    api.put(`/api/inventory/${itemId}`, formData)
      .then(response => {
        console.log('Inventory item updated successfully');
        // Add any additional logic here, such as redirecting to the inventory list page
        navigate('/inventory');
      })
      .catch(error => {
        console.error('Error updating inventory item:', error);
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Update Inventory Item</h2>
      <form onSubmit={handleSubmit} className="update-form">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="form-input" />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="form-input" />
        <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} className="form-input" />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="form-input" />
        <button type="submit" className="submit-button">Update Item</button>
      </form>
    </div>
  );
}

export default UpdateInventoryForm;