import React, { useEffect, useState } from 'react';

function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

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

  const fetchRequests = () => {
    fetch('/api/admin/developer-requests/', { credentials: 'include' })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Failed to load requests');
      })
      .then((data) => setRequests(data))
      .catch(() => setError('❌ Failed to load requests'));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = (id, action) => {
    const csrfToken = getCookie('csrftoken');
    fetch(`/api/admin/developer-requests/${id}/${action}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          fetchRequests();
        } else {
          setError(`❌ Failed to ${action} request`);
        }
      })
      .catch(() => setError(`❌ Error: Could not ${action} request`));
  };

  return (
    <div style={{
      maxWidth: '850px',
      margin: '10px auto',
      padding: '40px',
      background: '#f9f9f9',
      borderRadius: '16px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '30px',
        fontSize: '28px',
        color: '#2c3e50'
      }}>
        Developer Requests
      </h2>
      {error && <p style={{ color: '#e74c3c', textAlign: 'center', marginBottom: '20px' }}>{error}</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {requests.map((req) => (
          <li key={req.id} style={{
            padding: '20px',
            marginBottom: '20px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <div style={{ marginBottom: '10px' }}>
              <strong style={{ fontSize: '18px' }}>{req.full_name}</strong>
              <span style={{
                marginLeft: '10px',
                fontSize: '14px',
                color: '#7f8c8d'
              }}>
                ({req.email})
              </span>
            </div>
            <p style={{ marginBottom: '10px', color: '#555' }}>{req.reason}</p>
            <p style={{
              marginBottom: '15px',
              fontWeight: 'bold',
              color: req.is_approved ? '#27ae60' : '#e67e22'
            }}>
              Status: {req.is_approved ? '✅ Approved' : '⏳ Pending'}
            </p>
            {!req.is_approved && (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  style={{
                    flex: 1,
                    padding: '10px',
                    backgroundColor: '#27ae60',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#219150'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#27ae60'}
                  onClick={() => handleAction(req.id, 'approve')}
                >
                  ✅ Approve
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: '10px',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
                  onClick={() => handleAction(req.id, 'reject')}
                >
                  ❌ Reject
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
