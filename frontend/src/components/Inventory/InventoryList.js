// InventoryList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api'; // Import the Axios instance
import '../../index.css'; // Import the CSS file for styling

function InventoryList() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    api.get('/api/inventory')
      .then(response => {
        setInventory(response.data);
      })
      .catch(error => {
        console.error('Error fetching inventory:', error);
      });
  }, []);

  return (
    <div className="table-container">
      <h2>Inventory List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.total_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/inventory/add">Add Inventory</Link>
    </div>
  );
}

export default InventoryList;