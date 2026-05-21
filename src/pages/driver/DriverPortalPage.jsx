import { useState } from 'react';
import { useDispatchContext } from '../../context/DispatchContext';
import { Phone, MapPin, User, CheckCircle, FileText, IndianRupee, Send, LogOut } from 'lucide-react';
import './DriverPortalPage.css';

const DriverPortalPage = () => {
  const { drivers, bookings, submitDriverUpdate } = useDispatchContext();
  const [currentDriverId, setCurrentDriverId] = useState('');
  
  // Update Form State
  const [statusReq, setStatusReq] = useState('Completed');
  const [expense, setExpense] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Login Screen
  if (!currentDriverId) {
    return (
      <div className="driver-portal-wrap">
        <div className="driver-login-screen animate-slide-up">
          <div className="login-avatar">
            <User size={40} color="white" />
          </div>
          <h2 style={{ marginBottom: '10px' }}>Driver Portal</h2>
          <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Select your profile to continue</p>
          
          <div style={{ width: '100%', maxWidth: '320px' }}>
            <select 
              className="driver-select"
              onChange={(e) => setCurrentDriverId(e.target.value)}
              value={currentDriverId}
            >
              <option value="">Choose your name...</option>
              {drivers.map(d => (
                <option key={d.id} value={d.name}>{d.name} ({d.id})</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }

  // Find active trip for this driver
  const myTrip = bookings.find(b => b.driverName === currentDriverId && (b.status === 'Ongoing' || b.status === 'Confirmed'));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const expenseNum = Number(expense) || 0;

    // VALIDATION 1: Cannot submit negative expenses
    if (expenseNum < 0) {
      setError('Expense cannot be negative.');
      return;
    }

    // VALIDATION 2: If expense > 0, note is required
    if (expenseNum > 0 && note.trim().length === 0) {
      setError('Please add a note explaining the expense (e.g., Toll, Fuel).');
      return;
    }

    submitDriverUpdate(currentDriverId, myTrip ? myTrip.id : null, {
      status: statusReq,
      expense: expenseNum,
      note: note.trim()
    });
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setExpense('');
      setNote('');
      setStatusReq('Completed');
    }, 3000);
  };

  return (
    <div className="driver-portal-wrap">
      <div className="driver-portal-container animate-slide-up">
        
        {/* Header */}
        <header className="glass-card driver-header">
          <div className="driver-profile">
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={20} color="white" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem' }}>{currentDriverId}</h3>
              <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <span className="status-dot"></span> Online
              </span>
            </div>
          </div>
          <button onClick={() => setCurrentDriverId('')} className="logout-btn" title="Logout">
            <LogOut size={18} />
          </button>
        </header>

        {/* Active Trip Info */}
        {!myTrip ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
            <CheckCircle size={48} color="#10b981" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ margin: '0 0 0.5rem 0' }}>No Active Trips</h3>
            <p style={{ color: '#94a3b8', margin: 0 }}>You have no ongoing trips assigned to you. Relax or contact your dispatcher.</p>
          </div>
        ) : (
          <>
            <div className="glass-card">
              <div className="trip-header-info">
                <span className="trip-id">Trip ID: {myTrip.id}</span>
                <span className="trip-status-badge">{myTrip.status}</span>
              </div>
              
              <h2 className="customer-name">{myTrip.customerName}</h2>
              
              <div className="info-row">
                <Phone size={16} color="#60a5fa"/> 
                <span>{myTrip.customerPhone}</span>
              </div>

              <div className="destination-box">
                <MapPin size={20} color="#ef4444" style={{ marginTop: '2px' }}/> 
                <div>
                  <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.85rem', color: '#94a3b8' }}>Destination</p>
                  <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 500 }}>{myTrip.destination}</p>
                </div>
              </div>
            </div>

            {/* Update Form */}
            <div className="glass-card">
              <h3 style={{ margin: '0 0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                <FileText size={20} color="#60a5fa" /> Submit Update
              </h3>
              
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', color: '#10b981' }}>
                  <CheckCircle size={36} style={{ margin: '0 auto 1rem' }} />
                  <h4 style={{ margin: '0 0 0.5rem' }}>Update Sent!</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>Waiting for manager verification.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label className="form-label">Trip Status *</label>
                    <select 
                      className="glass-input"
                      value={statusReq} 
                      onChange={(e) => setStatusReq(e.target.value)}
                    >
                      <option value="Completed">Trip Completed successfully</option>
                      <option value="Garage">Car returned to Garage</option>
                      <option value="Breakdown">Breakdown / Maintenance issue</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Extra Expense (Toll, Fuel, etc.)</label>
                    <div className="expense-input-wrapper">
                      <span style={{ color: '#94a3b8', fontSize: '1.1rem' }}>৳</span>
                      <input 
                        type="number" 
                        className="glass-input"
                        placeholder="0"
                        value={expense}
                        onChange={(e) => setExpense(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Notes (Required if expense added)</label>
                    <input 
                      type="text" 
                      className="glass-input"
                      placeholder="e.g. Paid Padma bridge toll"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>

                  {error && <span className="error-text">{error}</span>}

                  <button type="submit" className="submit-btn" style={{ marginTop: '0.5rem' }}>
                    <Send size={18} /> Send for Verification
                  </button>
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DriverPortalPage;
