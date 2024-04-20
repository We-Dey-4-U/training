import React from 'react';
import { Link } from 'react-router-dom';



function HomePage() {
  return (
    <div>
      <h1>Welcome to Your App</h1>
      <div>
        <Link to="/inventory/add">Add Inventory</Link>
        <Link to="/inventory">View Inventory List</Link>
        <Link to="/tasks">Create Task</Link>
        <Link to="/taskList">View Task List</Link>
      </div>
    </div>
  );
}

export default HomePage;