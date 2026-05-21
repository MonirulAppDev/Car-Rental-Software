import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import './AdminLoginPage.css';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState({ email: 'admin@drivebd.com', password: 'admin123' });
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/admin-panel/dashboard');
    }, 1200);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-bg">
        <div className="admin-login-gradient" />
        <div className="admin-login-grid" />
      </div>

      <div className="admin-login-container">
        <div className="admin-login-card" id="admin-login-card">
          {/* Header */}
          <div className="admin-login-header">
            <div className="admin-login-logo">
              <div className="admin-logo-icon">
                <Car size={22} strokeWidth={2.5} />
              </div>
              <div>
                <div className="admin-logo-text">
                  <span style={{ color: '#1e293b', fontWeight: 800 }}>Drive</span>
                  <span style={{ color: '#f5c518', fontWeight: 800 }}>BD</span>
                </div>
                <span className="admin-panel-badge">Admin Panel</span>
              </div>
            </div>
            <div className="admin-login-shield">
              <Shield size={20} />
            </div>
          </div>

          <h2 className="admin-login-title">Administrator Login</h2>
          <p className="admin-login-subtitle">Secure access to DriveBD management system</p>

          <form onSubmit={handleLogin} id="admin-login-form">
            <div className="admin-form-group">
              <label className="admin-form-label">Email Address</label>
              <input
                type="email"
                className="admin-form-input"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                id="admin-email-input"
                placeholder="admin@drivebd.com"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPwd ? 'text' : 'password'}
                  className="admin-form-input"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  id="admin-password-input"
                  placeholder="Enter your password"
                  style={{ paddingRight: '44px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  id="admin-toggle-password"
                  style={{
                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--a-text-secondary)',
                    display: 'flex'
                  }}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="admin-login-hint" id="admin-login-hint">
              <span>Demo credentials: admin@drivebd.com / admin123</span>
            </div>

            <button
              type="submit"
              className="admin-btn admin-btn-primary admin-login-btn"
              disabled={loading}
              id="admin-login-submit-btn"
            >
              {loading ? (
                <>
                  <span className="spinner" style={{ width: '18px', height: '18px', borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff' }} />
                  Signing in...
                </>
              ) : (
                <>
                  <Lock size={16} />
                  Sign In to Admin Panel
                </>
              )}
            </button>
          </form>

          <div className="admin-login-footer">
            <a href="/" className="admin-login-back">← Back to Customer Site</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
