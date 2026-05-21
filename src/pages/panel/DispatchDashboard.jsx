import { useState, useEffect } from 'react';
import { useDispatchContext } from '../../context/DispatchContext';
import { DollarSign, TrendingUp, CreditCard, CalendarCheck, Car, Wallet, Clock, Activity } from 'lucide-react';
import './DispatchDashboard.css';

const DispatchDashboard = () => {
  const { bookings, cars } = useDispatchContext();
  const [metrics, setMetrics] = useState({
    totalIncome: 0,
    totalCost: 0,
    netProfit: 0,
    totalBookings: 0,
    pendingDues: 0
  });
  
  const [filter, setFilter] = useState('This Month');

  useEffect(() => {
    // Calculate base metrics from manualBookings
    let income = 0;
    let cost = 0;
    let dues = 0;

    bookings.forEach(booking => {
      income += booking.totalFare;
      cost += booking.khoraaki;
      dues += booking.due;
    });

    // Apply mock multipliers based on the selected filter to simulate real data changes
    let multiplier = 1;
    if (filter === 'Today') multiplier = 0.15;
    else if (filter === 'This Week') multiplier = 0.4;
    else if (filter === 'This Month') multiplier = 1;
    else if (filter === 'This Year') multiplier = 12;

    setMetrics({
      totalIncome: income * multiplier,
      totalCost: cost * multiplier,
      netProfit: (income - cost) * multiplier,
      totalBookings: Math.max(1, Math.floor(bookings.length * multiplier)),
      pendingDues: dues * multiplier
    });
  }, [filter, bookings]);

  return (
    <div className="animate-fadeIn">
      <div className="panel-page-header" style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="panel-page-title">Financial Dashboard</h1>
          <p className="panel-page-subtitle">Overview of your business performance and revenue.</p>
        </div>
        
        {/* Time Filter Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Filter:</label>
          <select 
            className="panel-input" 
            style={{ width: '150px', padding: '8px 12px', cursor: 'pointer', background: '#fff' }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="This Year">This Year</option>
          </select>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="dashboard-grid-top">
        <div className="metric-card metric-card-income">
          <div className="metric-header">
            <h3 className="metric-title">Total Income (Revenue)</h3>
            <div className="metric-icon"><DollarSign size={20} /></div>
          </div>
          <p className="metric-value">৳{metrics.totalIncome.toLocaleString()}</p>
          <p className="metric-subtitle">Gross fare from all bookings</p>
        </div>

        <div className="metric-card metric-card-cost">
          <div className="metric-header">
            <h3 className="metric-title">Total Cost (Khoraaki)</h3>
            <div className="metric-icon"><TrendingUp size={20} /></div>
          </div>
          <p className="metric-value">৳{metrics.totalCost.toLocaleString()}</p>
          <p className="metric-subtitle">Driver allowances & expenses</p>
        </div>

        <div className="metric-card metric-card-profit">
          <div className="metric-header">
            <h3 className="metric-title">Net Profit</h3>
            <div className="metric-icon"><Wallet size={20} /></div>
          </div>
          <p className="metric-value">৳{metrics.netProfit.toLocaleString()}</p>
          <p className="metric-subtitle">Total Income - Total Cost</p>
        </div>

        <div className="metric-card metric-card-bookings">
          <div className="metric-header">
            <h3 className="metric-title">Total Bookings</h3>
            <div className="metric-icon"><CalendarCheck size={20} /></div>
          </div>
          <p className="metric-value">{metrics.totalBookings}</p>
          <p className="metric-subtitle">Active and completed trips</p>
        </div>

        <div className="metric-card metric-card-dues">
          <div className="metric-header">
            <h3 className="metric-title">Pending Dues</h3>
            <div className="metric-icon"><Clock size={20} /></div>
          </div>
          <p className="metric-value">৳{metrics.pendingDues.toLocaleString()}</p>
          <p className="metric-subtitle">Amount left to collect</p>
        </div>
      </div>

      {/* Bottom Layout */}
      <div className="dashboard-grid-bottom">
        {/* Recent Bookings Feed */}
        <div className="dashboard-widget">
          <h3 className="widget-title"><Activity size={18} color="#2563eb" /> Recent Transactions</h3>
          <div className="recent-bookings-list">
            {bookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="recent-booking-item">
                <div className="rb-info">
                  <h4>{booking.customerName} - {booking.carName}</h4>
                  <p>{booking.destination} • {booking.startDate}</p>
                </div>
                <div className="rb-amount">
                  <h4>৳{booking.advancePaid.toLocaleString()} Paid</h4>
                  {booking.due > 0 ? <p>৳{booking.due.toLocaleString()} Due</p> : <p style={{color: '#64748b'}}>Fully Paid</p>}
                </div>
              </div>
            ))}
            {/* Add a dummy transaction for visual filling */}
            <div className="recent-booking-item">
              <div className="rb-info">
                <h4>Faisal Ahmed - BMW X5</h4>
                <p>Airport Drop • 2024-05-20 06:00 AM</p>
              </div>
              <div className="rb-amount">
                <h4>৳3,000 Paid</h4>
                <p style={{color: '#64748b'}}>Fully Paid</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Cars */}
        <div className="dashboard-widget">
          <h3 className="widget-title"><Car size={18} color="#8b5cf6" /> Most Booked Vehicles</h3>
          <div className="top-cars-list">
            {cars.slice(0, 3).map((car, idx) => (
              <div key={car.id} className="top-car-item">
                <img src={car.image} alt={car.name} className="tc-img" />
                <div className="tc-info">
                  <h4>{car.name}</h4>
                  <p>{car.plate}</p>
                </div>
                <div className="tc-count">{15 - idx * 3} Trips</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DispatchDashboard;
