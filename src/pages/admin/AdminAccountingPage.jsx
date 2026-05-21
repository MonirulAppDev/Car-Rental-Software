import { useState } from 'react';
import { 
  DollarSign, TrendingUp, TrendingDown, Wallet, Download, Calendar
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './AdminAccountingPage.css';

// Mock Financial Data
const cashFlowData = [
  { month: 'Jan', income: 450000, expense: 280000 },
  { month: 'Feb', income: 520000, expense: 310000 },
  { month: 'Mar', income: 480000, expense: 290000 },
  { month: 'Apr', income: 610000, expense: 340000 },
  { month: 'May', income: 590000, expense: 330000 },
  { month: 'Jun', income: 720000, expense: 380000 },
];

const expenseBreakdown = [
  { name: 'Driver Salaries & Allowances', amount: 150000, color: '#3b82f6', percent: 45 },
  { name: 'Vehicle Maintenance & Parts', amount: 85000, color: '#f59e0b', percent: 25 },
  { name: 'Fuel Costs', amount: 65000, color: '#ef4444', percent: 18 },
  { name: 'Office Rent & Utilities', amount: 25000, color: '#8b5cf6', percent: 8 },
  { name: 'Marketing & Others', amount: 15000, color: '#10b981', percent: 4 },
];

const transactions = [
  { id: 'TX-901', date: '2024-06-15', desc: 'Booking Revenue (BK-2041)', type: 'income', amount: 12500, method: 'bKash' },
  { id: 'TX-902', date: '2024-06-14', desc: 'Engine Oil & Servicing (Toyota Hiace)', type: 'expense', amount: 8500, method: 'Bank Transfer' },
  { id: 'TX-903', date: '2024-06-12', desc: 'Booking Revenue (BK-2038)', type: 'income', amount: 8000, method: 'Cash' },
  { id: 'TX-904', date: '2024-06-10', desc: 'Driver Weekly Allowance (Karim)', type: 'expense', amount: 4500, method: 'Nagad' },
  { id: 'TX-905', date: '2024-06-08', desc: 'Corporate Contract (TechBD)', type: 'income', amount: 45000, method: 'Bank Transfer' },
];

const AdminAccountingPage = () => {
  return (
    <div className="admin-page accounting-page animate-fadeIn">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Accounting & Finance</h1>
          <p className="admin-page-subtitle">Complete financial overview, profit & loss, and expense tracking.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="admin-btn admin-btn-outline"><Calendar size={15} /> This Month</button>
          <button className="admin-btn admin-btn-primary"><Download size={15} /> Export P&L Report</button>
        </div>
      </div>

      {/* Top Overview Cards */}
      <div className="finance-overview-grid">
        <div className="finance-card finance-bg-income">
          <div>
            <h3><TrendingUp size={18} /> Total Income</h3>
            <h2>৳7,20,000</h2>
          </div>
          <span className="trend">+18% vs last month</span>
        </div>
        <div className="finance-card finance-bg-expense">
          <div>
            <h3><TrendingDown size={18} /> Total Expenses</h3>
            <h2>৳3,80,000</h2>
          </div>
          <span className="trend">+5% vs last month</span>
        </div>
        <div className="finance-card finance-bg-profit">
          <div>
            <h3><DollarSign size={18} /> Net Profit</h3>
            <h2>৳3,40,000</h2>
          </div>
          <span className="trend">+22% vs last month</span>
        </div>
        <div className="finance-card finance-bg-balance">
          <div>
            <h3><Wallet size={18} /> Cash Balance</h3>
            <h2>৳12,50,000</h2>
          </div>
          <span className="trend">Available in accounts</span>
        </div>
      </div>

      <div className="accounting-charts-grid">
        {/* Cash Flow Chart */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Cash Flow (Income vs Expense)</h3>
          </div>
          <div className="admin-card-body">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={cashFlowData} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
                <defs>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `৳${v/1000}K`} />
                <Tooltip formatter={(val) => `৳${val.toLocaleString()}`} />
                <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} fill="url(#incomeGrad)" name="Income" />
                <Area type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} fill="url(#expenseGrad)" name="Expense" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Expense Breakdown (This Month)</h3>
          </div>
          <div className="admin-card-body">
            <div className="expense-breakdown-list">
              {expenseBreakdown.map((exp) => (
                <div key={exp.name} className="expense-item">
                  <div className="expense-info">
                    <span style={{ fontWeight: 500 }}>{exp.name}</span>
                    <span style={{ fontWeight: 700 }}>৳{exp.amount.toLocaleString()}</span>
                  </div>
                  <div className="expense-bar-bg">
                    <div className="expense-bar-fill" style={{ width: `${exp.percent}%`, background: exp.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Recent Transactions & Ledger</h3>
          <button className="admin-btn admin-btn-outline admin-btn-sm">View Full Ledger</button>
        </div>
        <div className="admin-table-wrapper">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>TxID</th>
                <th>Date</th>
                <th>Description</th>
                <th>Method</th>
                <th>Type</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td><span style={{ color: 'var(--a-text-secondary)' }}>{tx.id}</span></td>
                  <td>{tx.date}</td>
                  <td><strong>{tx.desc}</strong></td>
                  <td>{tx.method}</td>
                  <td>
                    <span className={`admin-badge ${tx.type === 'income' ? 'admin-badge-success' : 'admin-badge-danger'}`}>
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }} className={tx.type === 'income' ? 'tx-income' : 'tx-expense'}>
                    {tx.type === 'income' ? '+' : '-'}৳{tx.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAccountingPage;
