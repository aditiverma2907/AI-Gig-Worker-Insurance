import React from 'react';
import Dashboard from './pages/Dashboard';
import './AdminApp.css';

function AdminApp() {
  return (
    <div className="admin-app">
      <nav className="admin-nav">
        <h2>SmartShield Admin</h2>
      </nav>
      <Dashboard />
    </div>
  );
}

export default AdminApp;
