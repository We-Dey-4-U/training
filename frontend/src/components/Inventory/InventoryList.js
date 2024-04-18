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
    <div>
      <h2>Inventory List</h2>
      <ul>
        {inventory.map(item => (
          <li key={item._id}>
            {item.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryList;