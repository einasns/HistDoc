import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function DeveloperRequestForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    reason: '',
  });

  const [status, setStatus] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const csrfToken = getCookie('csrftoken');

    fetch('/api/developer-requests/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      credentials: 'include',
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          setStatus('✅ Request sent successfully! Redirecting...');
          setTimeout(() => history.push('/'), 2000);
        } else {
          setStatus('❌ Failed to send request.');
        }
      })
      .catch(() => {
        setStatus('❌ An error occurred.');
      });
  };

  return (
      <div style={{
        maxWidth: '500px',
        margin: '20px auto',
        padding: '40px',
        background: '#fdfdfd',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '25px',
          color: '#2c3e50',
          fontSize: '28px'
        }}>
          Request Developer Account
        </h2>
        <form onSubmit={handleSubmit}>
          <input
              name="full_name"
              type="text"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '20px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                outline: 'none',
                transition: 'border-color 0.3s',
              }}
              onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
          <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '20px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                outline: 'none',
                transition: 'border-color 0.3s',
              }}
              onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
          <textarea
              name="reason"
              placeholder="Why do you need an account?"
              value={formData.reason}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '20px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                minHeight: '120px',
                outline: 'none',
                transition: 'border-color 0.3s',
              }}
              onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
          <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
          >
            Submit Request
          </button>
        </form>
        {status && (
            <p style={{
              textAlign: 'center',
              marginTop: '20px',
              fontWeight: 'bold',
              color: status.includes('✅') ? '#2ecc71' : '#e74c3c',
            }}>
              {status}
            </p>
        )}
        <button
            onClick={() => history.push('/')}
            style={{
              marginTop: '20px',
              width: '100%',
              padding: '12px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
        >
          Back to Home
        </button>
      </div>
  );
}

export default DeveloperRequestForm;
