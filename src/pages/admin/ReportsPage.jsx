import { useState } from 'react';
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Download, TrendingUp, DollarSign, Car, Calendar } from 'lucide-react';
import { monthlyRevenue, carUtilization, dashboardStats, bookings } from '../../data/mockData';
import './ReportsPage.css';

const ReportsPage = () => {
  const [period, setPeriod] = useState('monthly');

  const totalRevenue = monthlyRevenue.reduce((s, m) => s + m.revenue, 0);
  const totalTrips   = monthlyRevenue.reduce((s, m) => s + m.trips, 0);
  const avgPerTrip   = Math.round(totalRevenue / totalTrips);

  const paymentBreakdown = [
    { name: 'bKash',  value: 42, color: '#e2136e' },
    { name: 'Nagad',  value: 28, color: '#f56c2d' },
    { name: 'Cash',   value: 20, color: '#22c55e'  },
    { name: 'Card',   value: 10, color: '#3b82f6'  },
  ];

  const summaryCards = [
    { label: 'Total Revenue', value: `৳${(totalRevenue / 100000).toFixed(1)}L`, icon: <DollarSign size={20} />, color: '#f5c518' },
    { label: 'Total Trips',   value: totalTrips, icon: <Car size={20} />, color: '#3b82f6' },
    { label: 'Avg Per Trip',  value: `৳${avgPerTrip.toLocaleString()}`, icon: <TrendingUp size={20} />, color: '#22c55e' },
    { label: 'Cancellations', value: dashboardStats.cancelledBookings, icon: <Calendar size={20} />, color: '#ef4444' },
  ];

  return (
    <div className="reports-page" id="admin-reports-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Reports & Analytics</h1>
          <p className="admin-page-subtitle">Business performance overview and insights</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div className="period-tabs">
            {['monthly', 'quarterly'].map((p) => (
              <button
                key={p}
                className={`period-tab ${period === p ? 'active' : ''}`}
                onClick={() => setPeriod(p)}
                id={`period-tab-${p}`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
          <button className="admin-btn admin-btn-outline" id="export-report-btn">
            <Download size={15} /> Export PDF
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="report-summary-grid" id="report-summary-grid">
        {summaryCards.map((card) => (
          <div key={card.label} className="report-summary-card" id={`report-card-${card.label.replace(/\s/g,'-')}`}>
            <div className="report-card-icon" style={{ color: card.color, background: `${card.color}15` }}>
              {card.icon}
            </div>
            <div>
              <p className="report-card-label">{card.label}</p>
              <p className="report-card-value" style={{ color: card.color }}>{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="admin-card" id="report-revenue-chart">
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">Monthly Revenue & Trip Trend</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--a-text-secondary)', marginTop: '2px' }}>Jul–Dec 2024</p>
          </div>
        </div>
        <div className="admin-card-body">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyRevenue} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f5c518" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#f5c518" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `৳${(v/1000).toFixed(0)}K`} />
              <Tooltip
                formatter={(val, name) => [
                  name === 'revenue' || name === 'target' ? `৳${val.toLocaleString()}` : val,
                  name.charAt(0).toUpperCase() + name.slice(1),
                ]}
              />
              <Area type="monotone" dataKey="target" stroke="#f5c518" strokeWidth={1.5} fill="url(#targetGrad)" strokeDasharray="5 5" name="target" />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2.5} fill="url(#revGrad)" name="revenue" dot={{ fill: '#3b82f6', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Charts */}
      <div className="report-charts-row">
        {/* Payment Breakdown */}
        <div className="admin-card" id="payment-breakdown-chart">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Payment Method Breakdown</h3>
          </div>
          <div className="admin-card-body">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={paymentBreakdown} cx="50%" cy="50%" outerRadius={80} dataKey="value" paddingAngle={3}>
                  {paymentBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Legend formatter={(v) => <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{v}</span>} />
                <Tooltip formatter={(v) => [`${v}%`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Trips Bar */}
        <div className="admin-card" id="trips-bar-chart">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Monthly Trip Count</h3>
          </div>
          <div className="admin-card-body">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyRevenue} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v) => [v, 'Trips']} />
                <Bar dataKey="trips" radius={[5, 5, 0, 0]}>
                  {monthlyRevenue.map((_, i) => (
                    <Cell key={i} fill={i === monthlyRevenue.length - 1 ? '#f5c518' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Car Utilization Table */}
      <div className="admin-card" id="car-utilization-report">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Vehicle Utilization Report</h3>
          <button className="admin-btn admin-btn-outline admin-btn-sm" id="export-utilization-btn">
            <Download size={13} /> Export
          </button>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table" id="utilization-table">
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Total Trips</th>
                <th>Utilization</th>
                <th>Revenue</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {carUtilization.map((item) => (
                <tr key={item.name} id={`utilization-row-${item.name.replace(/\s/g,'-')}`}>
                  <td style={{ fontWeight: 600, fontSize: '0.88rem' }}>{item.name}</td>
                  <td>{item.trips}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ flex: 1, height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${item.utilization}%`,
                          height: '100%',
                          borderRadius: '3px',
                          background: item.utilization > 80 ? '#22c55e' : item.utilization > 60 ? '#3b82f6' : '#f59e0b',
                        }} />
                      </div>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, minWidth: '36px' }}>{item.utilization}%</span>
                    </div>
                  </td>
                  <td style={{ fontWeight: 700 }}>৳{item.revenue.toLocaleString()}</td>
                  <td>
                    <span className={`admin-badge ${item.utilization > 80 ? 'admin-badge-success' : item.utilization > 60 ? 'admin-badge-info' : 'admin-badge-warning'}`}>
                      {item.utilization > 80 ? 'Excellent' : item.utilization > 60 ? 'Good' : 'Average'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Summary */}
      <div className="admin-card" id="booking-summary-report">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Recent Booking Summary</h3>
        </div>
        <div className="booking-summary-stats">
          {[
            { label: 'Total Bookings', value: dashboardStats.totalBookings, color: '#3b82f6' },
            { label: 'Confirmed', value: Math.round(dashboardStats.totalBookings * 0.45), color: '#3b82f6' },
            { label: 'Completed', value: dashboardStats.completedTrips, color: '#22c55e' },
            { label: 'Pending', value: dashboardStats.pendingBookings, color: '#f59e0b' },
            { label: 'Cancelled', value: dashboardStats.cancelledBookings, color: '#ef4444' },
          ].map((stat) => (
            <div key={stat.label} className="summary-stat-box" id={`summary-stat-${stat.label.replace(/\s/g,'-')}`}>
              <p className="summary-stat-value" style={{ color: stat.color }}>{stat.value}</p>
              <p className="summary-stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
