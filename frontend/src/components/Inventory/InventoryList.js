import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api'; // Import the Axios instance
import '../../index.css'; // Import the CSS file for styling

function InventoryList() {
  const [inventory, setInventory] = useState([]);
  const [editableItemId, setEditableItemId] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = () => {
    api.get('/api/inventory')
      .then(response => {
        setInventory(response.data);
      })
      .catch(error => {
        console.error('Error fetching inventory:', error);
      });
  };

  const handleDelete = (id) => {
    api.delete(`/api/inventory/${id}`)
      .then(() => {
        fetchInventory();
      })
      .catch(error => {
        console.error('Error deleting inventory item:', error);
      });
  };

  const handleUpdate = (id) => {
    // Set the ID of the item being edited
    setEditableItemId(id);
  };

  const handleSave = (id, updatedFields) => {
    const nameInput = document.getElementById(`name_${id}`);
    const descriptionInput = document.getElementById(`description_${id}`);
    const quantityInput = document.getElementById(`quantity_${id}`);
    const priceInput = document.getElementById(`price_${id}`);
  
    if (nameInput && descriptionInput && quantityInput && priceInput) {
      const updatedItem = {
        name: nameInput.value,
        description: descriptionInput.value,
        quantity: quantityInput.value,
        price: priceInput.value,
        ...updatedFields // Merge with the provided updatedFields object
      };
  
      api.put(`/api/inventory/${id}`, updatedItem)
        .then(response => {
          console.log('Inventory item updated successfully');
          // Reset editable item ID after successful update
          setEditableItemId(null);
          fetchInventory();
        })
        .catch(error => {
          console.error('Error updating inventory item:', error);
        });
    } else {
      console.error('Input elements not found');
    }
  };

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {inventory.map(item => (
  <tr key={item._id}>
    <td>{editableItemId === item._id ? <input type="text" defaultValue={item.name} id={`name_${item._id}`} /> : item.name}</td>
    <td>{editableItemId === item._id ? <input type="text" defaultValue={item.description} id={`description_${item._id}`} /> : item.description}</td>
    <td>{editableItemId === item._id ? <input type="number" defaultValue={item.quantity} id={`quantity_${item._id}`} /> : item.quantity}</td>
    <td>{editableItemId === item._id ? <input type="number" defaultValue={item.price} id={`price_${item._id}`} /> : item.price}</td>
    <td>{item.total_price}</td>
    <td>
      {editableItemId === item._id ? (
        <button onClick={() => handleSave(item._id, {
          name: document.getElementById(`name_${item._id}`).value,
          description: document.getElementById(`description_${item._id}`).value,
          quantity: document.getElementById(`quantity_${item._id}`).value,
          price: document.getElementById(`price_${item._id}`).value
        })}>Save</button>
      ) : (
        <button onClick={() => handleUpdate(item._id)}>Update</button>
      )}
      <button onClick={() => handleDelete(item._id)}>Delete</button>
    </td>
  </tr>
))}
        </tbody>
      </table>
      <Link to="/inventory/add" className="add-inventory-button">Add Inventory</Link>
    </div>
  );
}

export default InventoryList;