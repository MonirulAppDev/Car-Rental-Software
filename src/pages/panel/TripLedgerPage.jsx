import { useState } from 'react';
import { useDispatchContext } from '../../context/DispatchContext';
import { Search, Printer, Filter } from 'lucide-react';
import './PanelPages.css';

const TripLedgerPage = () => {
  const { bookings } = useDispatchContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTrips = bookings.filter(trip => {
    // Search filter
    const matchesSearch = trip.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          trip.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          trip.customerPhone.includes(searchTerm);
    
    // Status filter
    let matchesStatus = true;
    if (statusFilter === 'dues') matchesStatus = trip.due > 0;
    if (statusFilter === 'paid') matchesStatus = trip.due === 0;
    if (statusFilter === 'ongoing') matchesStatus = trip.status === 'Ongoing';

    return matchesSearch && matchesStatus;
  });
  return (
    <div className="animate-fadeIn">
      <div className="panel-page-header">
        <div>
          <h1 className="panel-page-title">Offline Trip Ledger</h1>
          <p className="panel-page-subtitle">History of all manual entries and bookings.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="panel-btn panel-btn-outline"><Printer size={15} /> Print Ledger</button>
        </div>
      </div>

      <div className="dispatch-card">
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', top: '10px', left: '12px', color: '#94a3b8' }} />
            <input 
              type="text" 
              className="panel-input" 
              placeholder="Search by ID, Name or Phone..." 
              style={{ paddingLeft: '36px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '0 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <Filter size={16} color="#64748b" />
            <select 
              className="panel-input" 
              style={{ width: '180px', border: 'none', background: 'transparent', paddingLeft: 0, outline: 'none' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Records</option>
              <option value="dues">Has Pending Dues</option>
              <option value="paid">Fully Paid (No Dues)</option>
              <option value="ongoing">Ongoing Trips</option>
            </select>
          </div>

          <select className="panel-input" style={{ width: '160px' }}>
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="panel-table">
            <thead>
              <tr>
                <th>Trip ID</th>
                <th>Passenger</th>
                <th>Destination</th>
                <th>Car & Driver</th>
                <th>Fare (৳)</th>
                <th>Due</th>
                <th>Entered By</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrips.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                    No trips match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredTrips.map((trip) => (
                  <tr key={trip.id}>
                  <td><strong style={{ color: '#2563eb' }}>{trip.id}</strong></td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{trip.customerName}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{trip.customerPhone}</div>
                  </td>
                  <td>
                    <div>{trip.destination}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{trip.reason}</div>
                  </td>
                  <td>
                    <div>{trip.carName.split(' ')[0]} {trip.carName.split(' ')[1]}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Drv: {trip.driverName}</div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{trip.totalFare.toLocaleString()}</td>
                  <td style={{ color: trip.due > 0 ? '#ef4444' : '#10b981', fontWeight: 600 }}>
                    {trip.due > 0 ? `৳${trip.due.toLocaleString()}` : 'Cleared'}
                  </td>
                  <td style={{ fontSize: '0.85rem' }}>{trip.enteredBy}</td>
                  <td>
                    <span className={`status-badge ${trip.status === 'Confirmed' ? 'status-free' : 'status-maint'}`}>
                      {trip.status}
                    </span>
                  </td>
                  <td>
                    <a href={`#/panel-only/invoice/${trip.id}`} target="_blank" rel="noreferrer" className="panel-btn panel-btn-outline" style={{ padding: '4px 8px', fontSize: '0.75rem' }}>
                      <Printer size={13} /> Print
                    </a>
                  </td>
                </tr>
              ))
            )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TripLedgerPage;
