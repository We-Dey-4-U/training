import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import TaskForm from './components/Task/TaskForm';
import TaskList from './components/Task/TaskList';
import InventoryList from './components/Inventory/InventoryList';
import AddInventoryForm from './components/Inventory/AddInventoryForm';
import UpdateInventoryForm from './components/Inventory/UpdateInventoryForm';
import AdminPage from './components/AdminPage';
import ProductList from './components/product/ProductList';
import AddProductForm from './components/product/ProductForm';
import CheckoutPage from './components/CheckoutPage'; // Import CheckoutPage component
import { CartProvider } from './context/CartContext'; // Import CartProvider
import OrderPage from './components/OrderPage';
import ThankYouPage from './components/ThankYouPage';

function App() {
  return (
    <Router>
      <CartProvider> {/* Wrap Routes with CartProvider */}
      <div className="App">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/tasks" element={<TaskForm />} />
          <Route path="/taskList" element={<TaskList />} />
          <Route path="/inventory" element={<InventoryList />} />
          <Route path="/inventory/add" element={<AddInventoryForm />} />
          <Route path="/inventory/:id/update" element={<UpdateInventoryForm />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/add" element={<AddProductForm />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/checkout" element={<CheckoutPage />} /> {/* Route for CheckoutPage */}
          <Route path="/order/:orderId" element={<OrderPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </div>
      </CartProvider>
    </Router>
  );
}

export default App;