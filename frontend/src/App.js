import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import TaskForm from './components/Task/TaskForm';
import TaskList from './components/Task/TaskList'; 
import InventoryList from './components/Inventory/InventoryList'; // Import InventoryList component
import AddInventoryForm from './components/Inventory/AddInventoryForm'; // Import AddInventoryForm component
import UpdateInventoryForm from './components/Inventory/UpdateInventoryForm'; // Import UpdateInventoryForm component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
           <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/tasks" element={<TaskForm />} />
          <Route path="/taskList" element={<TaskList />} />
          <Route path="/inventory" element={<InventoryList />} /> {/* Route for InventoryList */}
          <Route path="/inventory/add" element={<AddInventoryForm />} /> {/* Route for AddInventoryForm */}
          <Route path="/inventory/:id/update" element={<UpdateInventoryForm />} /> {/* Route for UpdateInventoryForm */}
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;