import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

function AdminDashboard({ history }) {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const fetchRequests = () => {
    fetch('/api/admin/developer-requests/', { credentials: 'include' })
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then(setRequests)
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
        if (res.ok) fetchRequests();
        else setError(`❌ Failed to ${action} request`);
      })
      .catch(() => setError(`❌ Error: Could not ${action} request`));
  };

  const handleLogout = () => {
    fetch('/logout/', {
      method: 'POST',
      headers: {
        'X-CSRFToken': getCookie('csrftoken'),
      },
      credentials: 'include',
    }).then(() => {
      history.push('/login'); // ← using history instead of useNavigate
    });
  };

  return (
    <div style={{
      maxWidth: '900px',
      margin: '40px auto',
      padding: '30px',
      background: '#f4f7f6',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '28px', color: '#2c3e50', marginBottom: '20px' }}>👤 Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          🔒 Logout
        </button>
      </div>

      <h3 style={{ fontSize: '22px', marginBottom: '20px', color: '#34495e' }}>Developer Requests</h3>

      {error && <p style={{ color: '#e74c3c', textAlign: 'center', marginBottom: '20px' }}>{error}</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {requests.map((req) => (
          <li key={req.id} style={{
            padding: '20px',
            marginBottom: '20px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            <div style={{ marginBottom: '10px' }}>
              <strong style={{ fontSize: '18px' }}>{req.full_name}</strong>
              <span style={{ marginLeft: '10px', fontSize: '14px', color: '#7f8c8d' }}>({req.email})</span>
            </div>
            <p style={{ marginBottom: '10px', color: '#555' }}><strong>Reason:</strong> {req.reason}</p>
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
                    fontWeight: 'bold'
                  }}
                  onClick={() => handleAction(req.id, 'approve')}
                >
                  ✅ Approve
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: '10px',
                    backgroundColor: '#c0392b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold'
                  }}
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

export default withRouter(AdminDashboard); // wraps the component to inject `history`
