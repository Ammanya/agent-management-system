import React, { useState } from 'react';
import axios from 'axios';

const AddAgent = () => {
  const [agent, setAgent] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    countryCode: '+91',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgent((prev) => ({ ...prev, [name]: value }));
    setMessage('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...agent,
      mobile: `${agent.countryCode}${agent.mobile}`,
    };

    try {
      const res = await axios.post('http://localhost:5000/api/agents', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessage(res.data.message || 'Agent added successfully!');
      setAgent({ name: '', email: '', mobile: '', password: '', countryCode: '+91' });
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add agent');
      setMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👤 Add New Agent</h2>
      <p style={styles.subtitle}>Enter agent details to register them into the system.</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          value={agent.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          value={agent.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={styles.input}
        />

        <div style={styles.phoneContainer}>
          <select
            name="countryCode"
            value={agent.countryCode}
            onChange={handleChange}
            style={styles.countryCodeSelect}
            required
          >
            <option value="+91">🇮🇳 +91</option>
            <option value="+1">🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+61">🇦🇺 +61</option>
            <option value="+971">🇦🇪 +971</option>
          </select>

          <input
            type="tel"
            name="mobile"
            value={agent.mobile}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            style={{ ...styles.input, flex: 1 }}
          />
        </div>

        <input
          type="password"
          name="password"
          value={agent.password}
          onChange={handleChange}
          placeholder="Password"
          required
          style={styles.input}
        />

        <button type="submit" style={styles.submitBtn}>Add Agent</button>
      </form>

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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '16px',
  },
  submitBtn: {
    padding: '12px',
    backgroundColor: '#10b981',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  phoneContainer: {
    display: 'flex',
    gap: '8px',
  },
  countryCodeSelect: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '16px',
    minWidth: '100px',
    backgroundColor: '#fff',
  },
};

export default AddAgent;
