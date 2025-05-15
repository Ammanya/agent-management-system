import React, { useState } from 'react';
import axios from 'axios';

const CsvUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a CSV file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/tasks/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessage(res.data.message || 'Upload successful!');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed.');
      setMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📤 Upload Task CSV</h2>
      <p style={styles.subtitle}>Distribute tasks to agents by uploading a CSV file.</p>

      <div style={styles.uploadBox}>
        <input type="file" accept=".csv" onChange={handleFileChange} style={styles.fileInput} />
        <button onClick={handleUpload} style={styles.uploadBtn}>Upload</button>
      </div>

      {message && <p style={{ color: 'green', marginTop: '15px' }}>{message}</p>}
      {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
    maxWidth: '600px',
    margin: '0 auto',
    marginTop: '40px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#1e293b',
  },
  subtitle: {
    color: '#475569',
    marginBottom: '20px',
  },
  uploadBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  fileInput: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
  },
  uploadBtn: {
    padding: '10px 15px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default CsvUpload;
