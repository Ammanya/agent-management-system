
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CsvUpload from './components/CsvUpload';
import TaskList from './components/TaskList';
import AddAgent from './components/AddAgent';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <h1 style={styles.header}>🧠 Agent Task Manager</h1>

        {isLoggedIn && (
          <nav style={styles.navbar}>
            <div style={styles.navLeft}>
              <Link to="/" style={styles.link}>Upload CSV</Link>
              <Link to="/tasks" style={styles.link}>View Tasks</Link>
              <Link to="/agents" style={styles.link}>Add Agent</Link>
            </div>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </nav>
        )}

        <div style={styles.pageContent}>
          <Routes>
            {!isLoggedIn ? (
              <Route path="*" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
            ) : (
              <>
                <Route path="/" element={<CsvUpload />} />
                <Route path="/tasks" element={<TaskList />} />
                <Route path="/agents" element={<AddAgent />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const styles = {
  header: {
    textAlign: 'center',
    margin: '30px 0 10px',
    color: '#1e293b',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#f1f5f9',
    padding: '12px 20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
    margin: '0 auto 30px',
    maxWidth: '1000px',
    alignItems: 'center',
  },
  navLeft: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    textDecoration: 'none',
    color: '#334155',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '8px 12px',
    borderRadius: '6px',
    transition: 'background-color 0.2s',
  },
  logoutBtn: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  pageContent: {
    padding: '0 20px',
  },
};

export default App;
