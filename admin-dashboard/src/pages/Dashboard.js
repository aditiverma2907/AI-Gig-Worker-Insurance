import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 1250,
    activePolices: 890,
    totalClaims: 3456,
    totalPayouts: 1250000,
    fraudDetected: 45,
    pendingClaims: 234
  });

  const [recentClaims, setRecentClaims] = useState([
    {
      id: 1,
      userId: 'USR001',
      amount: 300,
      type: 'rainfall',
      status: 'paid',
      date: '2024-04-04'
    },
    {
      id: 2,
      userId: 'USR002',
      amount: 200,
      type: 'heat',
      status: 'approved',
      date: '2024-04-03'
    },
    {
      id: 3,
      userId: 'USR003',
      amount: 500,
      type: 'flood',
      status: 'pending',
      date: '2024-04-03'
    }
  ]);

  const [fraudAlerts, setFraudAlerts] = useState([
    {
      id: 1,
      userId: 'USR045',
      fraudScore: 85,
      flag: 'Duplicate claims within 24h',
      action: 'blocked'
    },
    {
      id: 2,
      userId: 'USR089',
      fraudScore: 72,
      flag: 'GPS spoofing detected',
      action: 'review'
    }
  ]);

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>SmartShield Insurance Platform Analytics</p>
      </header>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-value">{dashboardStats.totalUsers.toLocaleString()}</p>
          <span className="stat-change">+12% this week</span>
        </div>

        <div className="stat-card">
          <h3>Active Policies</h3>
          <p className="stat-value">{dashboardStats.activePolices.toLocaleString()}</p>
          <span className="stat-change">+8% this week</span>
        </div>

        <div className="stat-card">
          <h3>Total Claims</h3>
          <p className="stat-value">{dashboardStats.totalClaims.toLocaleString()}</p>
          <span className="stat-change">+25% this month</span>
        </div>

        <div className="stat-card highlight">
          <h3>Total Payouts</h3>
          <p className="stat-value">₹{(dashboardStats.totalPayouts / 100000).toFixed(1)}L</p>
          <span className="stat-change">+18% this month</span>
        </div>

        <div className="stat-card alert">
          <h3>Fraud Detected</h3>
          <p className="stat-value">{dashboardStats.fraudDetected}</p>
          <span className="stat-change">Blocked this month</span>
        </div>

        <div className="stat-card">
          <h3>Pending Claims</h3>
          <p className="stat-value">{dashboardStats.pendingClaims}</p>
          <span className="stat-change">Needs review</span>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <h3>Claims by Type</h3>
          <div className="chart-placeholder">
            <div className="bar">
              <div className="label">Rainfall</div>
              <div className="bar-fill" style={{ width: '65%', height: '40px', background: '#667eea' }}></div>
              <span>1250</span>
            </div>
            <div className="bar">
              <div className="label">Heat</div>
              <div className="bar-fill" style={{ width: '35%', height: '40px', background: '#764ba2' }}></div>
              <span>680</span>
            </div>
            <div className="bar">
              <div className="label">Flood</div>
              <div className="bar-fill" style={{ width: '50%', height: '40px', background: '#f093fb' }}></div>
              <span>950</span>
            </div>
            <div className="bar">
              <div className="label">Curfew</div>
              <div className="bar-fill" style={{ width: '25%', height: '40px', background: '#4facfe' }}></div>
              <span>400</span>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3>Claim Status</h3>
          <div className="status-pie">
            <div className="status-item">
              <span className="dot paid"></span>
              <span>Paid: 2891 (84%)</span>
            </div>
            <div className="status-item">
              <span className="dot approved"></span>
              <span>Approved: 331 (10%)</span>
            </div>
            <div className="status-item">
              <span className="dot pending"></span>
              <span>Pending: 234 (6%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Claims Table */}
      <div className="table-card">
        <h3>Recent Claims</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recentClaims.map(claim => (
              <tr key={claim.id}>
                <td>{claim.userId}</td>
                <td>₹{claim.amount}</td>
                <td>
                  <span className="type-badge">{claim.type}</span>
                </td>
                <td>
                  <span className={`status-badge ${claim.status}`}>
                    {claim.status.toUpperCase()}
                  </span>
                </td>
                <td>{claim.date}</td>
                <td>
                  <button className="action-btn">Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fraud Alerts */}
      <div className="table-card alert-table">
        <h3>🚨 Fraud Alerts</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Fraud Score</th>
              <th>Flag</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {fraudAlerts.map(alert => (
              <tr key={alert.id} className="alert-row">
                <td>{alert.userId}</td>
                <td>
                  <span className="fraud-score">{alert.fraudScore}%</span>
                </td>
                <td>{alert.flag}</td>
                <td>
                  <button className={`action-btn ${alert.action}`}>{alert.action}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
