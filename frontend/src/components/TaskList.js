import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tasks');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📋 Task List</h2>
      {loading ? (
        <p style={styles.loading}>Loading tasks...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : tasks.length === 0 ? (
        <p style={styles.empty}>No tasks available</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Task ID</th>
              <th style={styles.th}>First Name</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Notes</th>
              <th style={styles.th}>Agent Email</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} style={styles.tr}>
                <td style={styles.td}>{task._id}</td>
                <td style={styles.td}>{task.firstName}</td>
                <td style={styles.td}>{task.phone}</td>
                <td style={styles.td}>{task.notes}</td>
                <td style={styles.td}>{task.agent?.email || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  th: {
    backgroundColor: '#007BFF',
    color: '#fff',
    textAlign: 'left',
    padding: '12px',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
  },
  tr: {
    transition: 'background 0.2s ease-in',
  },
  loading: {
    fontSize: '16px',
    color: '#666',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
  empty: {
    fontSize: '16px',
    color: '#888',
  },
};

export default TaskList;
