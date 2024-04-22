import React from 'react';
import { Link } from 'react-router-dom';
import SalesReport from './SalesReport'; // Import your SalesReport component
import InventoryReport from './InventoryReport'; // Import your InventoryReport component

import '../index.css'; // Import your CSS file

function AdminPage() {
    return (
        <div>
            <header className="header">
                <nav className="primary-nav">
                    <ul>
                        <li><Link to="/inventory/add">Add Inventory</Link></li>
                        <li><Link to="/products/add">Create Product</Link></li>
                        <li><Link to="/tasks">Create Task</Link></li>
                        <li><Link to="/home">Shop</Link></li>
                    </ul>
                </nav>
            </header>

            <div className="admin-content">
                <section className="chart-section">
                    <h2>Sales Chart</h2>
                    
                </section>

                <section className="report-section">
                    <h2>Sales Report</h2>
                    <SalesReport />
                </section>

                <section className="report-section">
                    <h2>Inventory Report</h2>
                    <InventoryReport />
                </section>
            </div>

            <footer className="footer">
                <div className="footer-links">
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/terms">Terms of Service</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                </div>
            </footer>
        </div>
    );
}

export default AdminPage;