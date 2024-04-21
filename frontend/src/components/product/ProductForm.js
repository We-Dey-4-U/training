import React, { useState } from 'react';
import api from '../../api'; // Import the Axios instance
import '../../index.css'; // Import the CSS file


function ProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append('name', formData.name);
      formDataWithImage.append('description', formData.description);
      formDataWithImage.append('price', formData.price);
      formDataWithImage.append('quantity', formData.quantity);
      formDataWithImage.append('image', formData.image);

      await api.post('/api/products', formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product created successfully!');
      // Reset form data
      setFormData({
        name: '',
        description: '',
        price: '',
        quantity: '',
        image: null,
      });
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product. Please try again.');
    }
  };

  return (
    <div className="product-form-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" name="image" onChange={handleImageChange} required />
        </div>
        <button type="submit" className="submit-button">Add Product</button>
      </form>
    </div>
  );
}

export default ProductForm;