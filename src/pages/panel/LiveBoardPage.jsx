import { useState } from 'react';
import { useDispatchContext } from '../../context/DispatchContext';
import { 
  CarFront, Users, MapPin, CheckCircle, Clock, AlertTriangle, User, Calendar, RefreshCcw, Search, Car
} from 'lucide-react';
import './PanelPages.css';

const LiveBoardPage = () => {
  const { cars, drivers, bookings, verifications, approveVerification, rejectVerification } = useDispatchContext();
  const [loading, setLoading] = useState(false);

  const refreshBoard = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div className="animate-fadeIn">
      <div className="panel-page-header">
        <div>
          <h1 className="panel-page-title">Live Status Board</h1>
          <p className="panel-page-subtitle">Real-time view of all vehicles and drivers.</p>
        </div>
        <button className="panel-btn panel-btn-outline" onClick={refreshBoard}>
          <RefreshCcw size={15} className={loading ? 'spin' : ''} /> Refresh
        </button>
      </div>

      <div className="panel-grid-2" style={{ marginBottom: '24px' }}>
        {/* Quick Availability Checker */}
        <div className="dispatch-card" style={{ background: '#eff6ff', border: '1px solid #bfdbfe', margin: 0 }}>
          <h3 className="section-title" style={{ borderBottomColor: '#bfdbfe', color: '#1e3a8a' }}>
            <Search size={16} style={{ display:'inline', marginRight:'8px' }}/> 
            Quick Availability Checker
          </h3>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '130px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#1e3a8a' }}>Pickup Date</label>
              <input type="date" className="panel-input" style={{ borderColor: '#bfdbfe' }} />
            </div>
            <div style={{ flex: 1, minWidth: '130px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#1e3a8a' }}>Return Date</label>
              <input type="date" className="panel-input" style={{ borderColor: '#bfdbfe' }} />
            </div>
            <button className="panel-btn panel-btn-primary" onClick={() => alert('Search logic here...')}>
              Check Free Cars
            </button>
          </div>
        </div>

        {/* Quick Hishab Khata (Daily Cash Log) */}
        <div className="dispatch-card" style={{ flex: '1 1 300px' }}>
          <h3 style={{ margin: '0 0 15px', fontSize: '1rem', color: '#1e293b' }}>Daily Hishab Khata</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={{ background: '#ecfdf5', padding: '15px', borderRadius: '8px', border: '1px solid #d1fae5' }}>
              <p style={{ margin: '0 0 5px', fontSize: '0.8rem', color: '#059669' }}>Total Cash In</p>
              <h2 style={{ margin: 0, color: '#047857' }}>৳12,500</h2>
            </div>
            <div style={{ background: '#fef2f2', padding: '15px', borderRadius: '8px', border: '1px solid #fee2e2' }}>
              <p style={{ margin: '0 0 5px', fontSize: '0.8rem', color: '#dc2626' }}>Total Expense</p>
              <h2 style={{ margin: 0, color: '#b91c1c' }}>৳3,200</h2>
            </div>
          </div>
          <button className="panel-btn panel-btn-primary" style={{ width: '100%', marginTop: '15px' }}>+ Add Expense</button>
        </div>
      </div>

      {/* Driver Verifications Queue */}
      {verifications.filter(v => v.status === 'Pending').length > 0 && (
        <div className="dispatch-card" style={{ marginBottom: '20px', borderLeft: '4px solid #f59e0b' }}>
          <h3 style={{ margin: '0 0 15px', fontSize: '1rem', color: '#b45309', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={18} /> Pending Driver Verifications
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {verifications.filter(v => v.status === 'Pending').map(req => (
              <div key={req.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '12px 15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div>
                  <h4 style={{ margin: '0 0 4px', color: '#1e293b' }}>{req.driverName} • Trip {req.tripId}</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                    Status: <strong style={{ color: '#2563eb' }}>{req.statusRequest}</strong> | 
                    Expense: <strong style={{ color: '#ef4444' }}>৳{req.expenseClaim}</strong> | 
                    Note: "{req.note}"
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => approveVerification(req.id)} className="panel-btn panel-btn-primary" style={{ background: '#10b981', borderColor: '#10b981' }}>Approve</button>
                  <button onClick={() => rejectVerification(req.id)} className="panel-btn panel-btn-outline" style={{ color: '#ef4444', borderColor: '#ef4444' }}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="panel-grid-2">
        {/* Cars List */}
        <div className="dispatch-card">
          <h3 className="section-title"><Car size={16} style={{ display:'inline', marginRight:'8px' }}/> Vehicle Roster</h3>
          <table className="panel-table">
            <thead>
              <tr>
                <th>Car</th>
                <th>Plate</th>
                <th>Status</th>
                <th>Passenger</th>
              </tr>
            </thead>
            <tbody style={{ opacity: loading ? 0.5 : 1, transition: '0.3s' }}>
              {cars.map((car, idx) => {
                const isBusy = idx === 1 || idx === 3;
                
                // Mock passenger details if the car is busy
                const passengerName = isBusy ? (idx === 1 ? 'Anisur Rahman' : 'Jamal Bhuiyan') : null;
                const passengerPhoto = isBusy ? (idx === 1 ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80') : null;

                return (
                  <tr key={car.id}>
                    <td><strong>{car.name}</strong></td>
                    <td>{car.plate.split(' ')[1]}</td>
                    <td>
                      <span className={`status-badge ${isBusy ? 'status-busy' : 'status-free'}`}>
                        {isBusy ? 'On Trip' : 'At Garage'}
                      </span>
                    </td>
                    <td>
                      {isBusy && passengerName ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img 
                            src={passengerPhoto} 
                            alt={passengerName} 
                            style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #e2e8f0' }} 
                          />
                          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                            {passengerName}
                          </span>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Drivers List */}
        <div className="dispatch-card">
          <h3 className="section-title"><User size={16} style={{ display:'inline', marginRight:'8px' }}/> Driver Duty Roster</h3>
          <table className="panel-table">
            <thead>
              <tr>
                <th>Driver Name</th>
                <th>Phone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody style={{ opacity: loading ? 0.5 : 1, transition: '0.3s' }}>
              {drivers.map((drv, idx) => {
                // Mock some drivers as busy
                const isBusy = idx === 0 || idx === 2;
                return (
                  <tr key={drv.id}>
                    <td><strong>{drv.name}</strong></td>
                    <td>{drv.phone}</td>
                    <td>
                      <span className={`status-badge ${isBusy ? 'status-busy' : 'status-free'}`}>
                        {isBusy ? 'Driving' : 'Standby'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LiveBoardPage;
