import { Link } from 'react-router-dom';
import {
  TrendingUp, Car, CalendarCheck, Users, Clock,
  CheckCircle, XCircle, ArrowUpRight, DollarSign, Star
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { dashboardStats, monthlyRevenue, bookings, cars, carUtilization } from '../../data/mockData';
import './DashboardPage.css';

const DashboardPage = () => {
  const statCards = [
    {
      id: 'total-revenue',
      title: 'Total Revenue',
      value: `৳${(dashboardStats.totalRevenue / 100000).toFixed(1)}L`,
      change: '+32%',
      icon: <DollarSign size={20} />,
      color: 'gold',
      desc: 'This fiscal year',
    },
    {
      id: 'total-bookings',
      title: 'Total Bookings',
      value: dashboardStats.totalBookings,
      change: '+18%',
      icon: <CalendarCheck size={20} />,
      color: 'blue',
      desc: `${dashboardStats.pendingBookings} pending`,
    },
    {
      id: 'active-cars',
      title: 'Fleet Status',
      value: `${dashboardStats.availableCars}/${dashboardStats.totalCars}`,
      change: 'available',
      icon: <Car size={20} />,
      color: 'green',
      desc: `${dashboardStats.totalCars - dashboardStats.availableCars} on trip`,
    },
    {
      id: 'total-drivers',
      title: 'Drivers',
      value: `${dashboardStats.availableDrivers}/${dashboardStats.totalDrivers}`,
      change: 'online',
      icon: <Users size={20} />,
      color: 'purple',
      desc: 'Active drivers today',
    },
    {
      id: 'avg-rating',
      title: 'Avg. Rating',
      value: dashboardStats.avgRating,
      change: '+0.2',
      icon: <Star size={20} />,
      color: 'orange',
      desc: 'Customer satisfaction',
    },
    {
      id: 'completed-trips',
      title: 'Completed Trips',
      value: dashboardStats.completedTrips,
      change: '+24%',
      icon: <CheckCircle size={20} />,
      color: 'teal',
      desc: `${dashboardStats.cancelledBookings} cancelled`,
    },
  ];

  const pieData = [
    { name: 'Confirmed', value: 45, color: '#3b82f6' },
    { name: 'Completed', value: 35, color: '#22c55e' },
    { name: 'Pending', value: 12, color: '#f59e0b' },
    { name: 'Cancelled', value: 8, color: '#ef4444' },
  ];

  const recentBookings = bookings.slice(0, 5);

  const getStatusBadge = (status) => {
    const map = {
      confirmed: 'admin-badge-info',
      completed: 'admin-badge-success',
      pending: 'admin-badge-warning',
      cancelled: 'admin-badge-danger',
    };
    return map[status] || 'admin-badge-gray';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="chart-tooltip-label">{label}</p>
          {payload.map((entry) => (
            <p key={entry.name} style={{ color: entry.color, fontSize: '0.85rem' }}>
              {entry.name}: {entry.name === 'revenue' ? `৳${(entry.value / 1000).toFixed(0)}K` : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard-page" id="admin-dashboard-page">
      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-subtitle">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="dashboard-header-actions">
          <span className="dashboard-date">
            <Clock size={14} /> {new Date().toLocaleDateString('en-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <Link to="/admin-panel/bookings" className="admin-btn admin-btn-primary" id="dashboard-view-bookings-btn">
            View All Bookings <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stat-cards-grid" id="stat-cards-grid">
        {statCards.map((card) => (
          <div key={card.id} className={`stat-card stat-card--${card.color}`} id={card.id}>
            <div className="stat-card__icon">{card.icon}</div>
            <div className="stat-card__body">
              <p className="stat-card__title">{card.title}</p>
              <p className="stat-card__value">{card.value}</p>
              <p className="stat-card__desc">
                <span className="stat-card__change">{card.change}</span>
                {' '}{card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="charts-grid">
        {/* Revenue Chart */}
        <div className="admin-card" id="revenue-chart-card">
          <div className="admin-card-header">
            <div>
              <h3 className="admin-card-title">Revenue Overview</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--a-text-secondary)', marginTop: '2px' }}>Monthly revenue vs target</p>
            </div>
            <div className="chart-legend">
              <span className="legend-item"><span className="legend-dot" style={{ background: '#3b82f6' }} /> Revenue</span>
              <span className="legend-item"><span className="legend-dot" style={{ background: '#e2e8f0', border: '1px dashed #94a3b8' }} /> Target</span>
            </div>
          </div>
          <div className="admin-card-body">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={monthlyRevenue} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `৳${(v/1000).toFixed(0)}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="target" stroke="#e2e8f0" strokeWidth={2} fill="none" strokeDasharray="5 5" name="target" />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2.5} fill="url(#revenueGrad)" name="revenue" dot={{ fill: '#3b82f6', r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Booking Status Pie */}
        <div className="admin-card" id="booking-status-chart-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Booking Status</h3>
          </div>
          <div className="admin-card-body">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend formatter={(value) => <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{value}</span>} />
                <Tooltip formatter={(value) => [`${value}%`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Trips Bar + Car Utilization */}
      <div className="charts-grid">
        {/* Monthly Trips */}
        <div className="admin-card" id="monthly-trips-chart-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Monthly Trips</h3>
          </div>
          <div className="admin-card-body">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyRevenue} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="trips" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Trips" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Car Utilization */}
        <div className="admin-card" id="car-utilization-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Car Utilization</h3>
          </div>
          <div className="admin-card-body">
            <div className="utilization-list">
              {carUtilization.slice(0, 5).map((item) => (
                <div key={item.name} className="utilization-item" id={`util-${item.name.replace(/\s/g, '-')}`}>
                  <div className="utilization-info">
                    <span className="utilization-name">{item.name}</span>
                    <span className="utilization-percent">{item.utilization}%</span>
                  </div>
                  <div className="utilization-bar-track">
                    <div
                      className="utilization-bar-fill"
                      style={{
                        width: `${item.utilization}%`,
                        background: item.utilization > 80 ? '#22c55e' : item.utilization > 60 ? '#3b82f6' : '#f59e0b',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="admin-card" id="recent-bookings-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Recent Bookings</h3>
          <Link to="/admin-panel/bookings" className="admin-btn admin-btn-outline admin-btn-sm" id="dashboard-all-bookings-link">
            View All <ArrowUpRight size={13} />
          </Link>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table" id="recent-bookings-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Car</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id} id={`recent-booking-row-${booking.id}`}>
                  <td>
                    <span className="booking-id-text">{booking.id}</span>
                  </td>
                  <td>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.88rem' }}>{booking.customerName}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--a-text-secondary)' }}>{booking.customerPhone}</p>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.88rem' }}>{booking.carName}</td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--a-text-secondary)' }}>{booking.startDate}</td>
                  <td style={{ fontWeight: 700 }}>৳{booking.totalAmount.toLocaleString()}</td>
                  <td>
                    <span className={`admin-badge ${getStatusBadge(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <Link
                      to="/admin-panel/bookings"
                      className="admin-btn admin-btn-outline admin-btn-sm"
                      id={`dashboard-view-booking-${booking.id}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fleet Status */}
      <div className="admin-card" id="fleet-status-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Fleet Status</h3>
          <Link to="/admin-panel/cars" className="admin-btn admin-btn-outline admin-btn-sm" id="dashboard-fleet-link">
            Manage Fleet <ArrowUpRight size={13} />
          </Link>
        </div>
        <div className="fleet-grid">
          {cars.map((car) => (
            <div key={car.id} className="fleet-car-item" id={`fleet-car-${car.id}`}>
              <div className="fleet-car-image">
                <img src={car.image} alt={car.name} />
              </div>
              <div className="fleet-car-info">
                <p className="fleet-car-name">{car.name}</p>
                <p className="fleet-car-type">{car.type} • {car.location}</p>
              </div>
              <span className={`admin-badge ${car.available ? 'admin-badge-success' : 'admin-badge-warning'}`}>
                {car.available ? 'Available' : 'On Trip'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
