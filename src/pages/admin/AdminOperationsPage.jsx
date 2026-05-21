import { useState } from 'react';
import { 
  FileText, Wrench, Activity, MessageSquare, Shield, Briefcase, 
  Download, Plus, AlertTriangle, CheckCircle, Clock 
} from 'lucide-react';
import './AdminOperationsPage.css';

const AdminOperationsPage = () => {
  const [activeTab, setActiveTab] = useState('finance');

  const tabs = [
    { id: 'finance', label: 'Finance & Ops', icon: <FileText size={16} /> },
    { id: 'maintenance', label: 'Fleet Maintenance', icon: <Wrench size={16} /> },
    { id: 'analytics', label: 'Advanced Analytics', icon: <Activity size={16} /> },
    { id: 'communications', label: 'Communications', icon: <MessageSquare size={16} /> },
    { id: 'security', label: 'Security & Roles', icon: <Shield size={16} /> },
    { id: 'corporate', label: 'Corporate B2B', icon: <Briefcase size={16} /> },
  ];

  return (
    <div className="admin-page operations-page animate-fadeIn">
      <div className="admin-card-header" style={{ padding: '0 0 24px', borderBottom: 'none' }}>
        <div>
          <h1 className="admin-card-title" style={{ fontSize: '1.6rem' }}>Advanced Operations</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--a-text-secondary)' }}>
            Manage enterprise-level modules: Finance, Maintenance, Security, and Corporate bookings.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="operations-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`operations-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="operations-content">
        
        {/* FINANCE */}
        {activeTab === 'finance' && (
          <div className="module-grid animate-fadeInUp">
            <div className="module-card">
              <h3><FileText size={18} /> Invoice Generation</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--a-text-secondary)', marginBottom: '16px' }}>Generate official tax invoices for completed bookings.</p>
              <div className="admin-form-group">
                <input type="text" className="admin-form-input" placeholder="Booking ID (e.g. BK-2024-...)" />
              </div>
              <button className="admin-btn admin-btn-primary" style={{ width: '100%' }}><Download size={14} /> Generate PDF Invoice</button>
            </div>
            
            <div className="module-card">
              <h3><AlertTriangle size={18} /> Refund Requests</h3>
              <table className="finance-table">
                <thead><tr><th>Booking</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  <tr><td>BK-2024-001</td><td>৳5,000</td><td><span className="badge badge-warning">Pending</span></td><td><button className="admin-btn admin-btn-sm">Process</button></td></tr>
                  <tr><td>BK-2024-098</td><td>৳2,500</td><td><span className="badge badge-success">Refunded</span></td><td>-</td></tr>
                </tbody>
              </table>
            </div>

            <div className="module-card">
              <h3><FileText size={18} /> Fuel Policy Management</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--a-text-secondary)', marginBottom: '16px' }}>Current active policy: Full-to-Full.</p>
              <select className="admin-form-input" style={{ marginBottom: '12px' }}>
                <option>Full-to-Full (Recommended)</option>
                <option>Same-to-Same</option>
                <option>Pre-purchase Fuel</option>
              </select>
              <button className="admin-btn admin-btn-outline" style={{ width: '100%' }}>Update Policy</button>
            </div>
          </div>
        )}

        {/* MAINTENANCE */}
        {activeTab === 'maintenance' && (
          <div className="module-grid animate-fadeInUp">
            <div className="module-card" style={{ gridColumn: 'span 2' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0 }}><Wrench size={18} /> Service Reminders</h3>
                <button className="admin-btn admin-btn-primary admin-btn-sm"><Plus size={14} /> Add Reminder</button>
              </div>
              <table className="finance-table">
                <thead><tr><th>Vehicle</th><th>Task</th><th>Due Date</th><th>Status</th></tr></thead>
                <tbody>
                  <tr>
                    <td>Toyota Alphard (Ga 23-4891)</td>
                    <td>Engine Oil Change</td>
                    <td>2024-06-15</td>
                    <td><span className="badge badge-warning">Upcoming</span></td>
                  </tr>
                  <tr>
                    <td>Mercedes E-Class (Ka 11-2345)</td>
                    <td>Brake Pad Replacement</td>
                    <td>2024-05-20</td>
                    <td><span className="badge badge-danger">Overdue</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="module-card">
              <h3><Shield size={18} /> Insurance Documents</h3>
              <div className="log-item">
                <div className="log-icon"><FileText size={16} /></div>
                <div className="log-content" style={{ flex: 1 }}>
                  <h4>Comprehensive Policy (BMW X5)</h4>
                  <p>Expires: 2025-01-10</p>
                </div>
                <span className="badge badge-success">Valid</span>
              </div>
              <div className="log-item">
                <div className="log-icon"><FileText size={16} /></div>
                <div className="log-content" style={{ flex: 1 }}>
                  <h4>Third-party (Hiace)</h4>
                  <p>Expires: 2024-06-01</p>
                </div>
                <span className="badge badge-warning">Expiring Soon</span>
              </div>
            </div>
          </div>
        )}

        {/* ANALYTICS & LOGS */}
        {activeTab === 'analytics' && (
          <div className="module-grid animate-fadeInUp">
            <div className="module-card">
              <h3><AlertTriangle size={18} style={{ color: '#ef4444' }} /> Fraud Detection Alerts</h3>
              <div className="log-item">
                <div className="log-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}><AlertTriangle size={16} /></div>
                <div className="log-content">
                  <h4>Suspicious Card Activity</h4>
                  <p>Multiple failed attempts from user U-1092.</p>
                  <p style={{ fontSize: '0.7rem', color: '#ef4444', marginTop: '4px' }}>Action Required: Block User</p>
                </div>
              </div>
              <div className="log-item">
                <div className="log-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}><AlertTriangle size={16} /></div>
                <div className="log-content">
                  <h4>Duplicate NID Upload</h4>
                  <p>NID 123456789 matches existing user U-1001.</p>
                </div>
              </div>
            </div>

            <div className="module-card" style={{ gridColumn: 'span 2' }}>
              <h3><Activity size={18} /> System Activity Logs</h3>
              <table className="finance-table">
                <thead><tr><th>Timestamp</th><th>Admin</th><th>Action</th><th>IP Address</th></tr></thead>
                <tbody>
                  <tr><td>2024-05-21 10:45 AM</td><td>Super Admin</td><td>Updated Pricing Rules</td><td>192.168.1.1</td></tr>
                  <tr><td>2024-05-21 09:30 AM</td><td>Support Agent 1</td><td>Cancelled Booking BK-2024-00231</td><td>192.168.1.2</td></tr>
                  <tr><td>2024-05-20 18:15 PM</td><td>System</td><td>Generated Monthly Report</td><td>localhost</td></tr>
                  <tr><td>2024-05-20 14:00 PM</td><td>Super Admin</td><td>Added New Vehicle (Toyota Alphard)</td><td>192.168.1.1</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* COMMUNICATIONS */}
        {activeTab === 'communications' && (
          <div className="module-grid animate-fadeInUp">
            <div className="module-card" style={{ gridColumn: 'span 2' }}>
              <h3><MessageSquare size={18} /> Broadcast Messages</h3>
              <div className="admin-form-group">
                <label className="admin-form-label">Message Title</label>
                <input type="text" className="admin-form-input" placeholder="e.g. Eid Special Discount!" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Message Body</label>
                <textarea className="admin-form-input" rows="4" placeholder="Type your message here..."></textarea>
              </div>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <label className="checkbox-container"><input type="checkbox" defaultChecked /> <span className="checkbox-label">Push Notification</span></label>
                <label className="checkbox-container"><input type="checkbox" /> <span className="checkbox-label">SMS</span></label>
                <label className="checkbox-container"><input type="checkbox" /> <span className="checkbox-label">Email Alert</span></label>
              </div>
              <button className="admin-btn admin-btn-primary"><MessageSquare size={14} /> Send Broadcast</button>
            </div>
            
            <div className="module-card">
              <h3>Preview</h3>
              <div className="comms-preview">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ width: '24px', height: '24px', background: 'var(--gold-primary)', borderRadius: '4px' }}></div>
                  <strong style={{ fontSize: '0.85rem' }}>DriveBD App</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--a-text-secondary)', marginLeft: 'auto' }}>now</span>
                </div>
                <h4 style={{ margin: '0 0 4px', fontSize: '0.9rem' }}>Eid Special Discount!</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--a-text-secondary)' }}>Get 30% off on all SUV rentals this Eid. Use code EIDSPECIAL.</p>
              </div>
            </div>
          </div>
        )}

        {/* SECURITY & ROLES */}
        {activeTab === 'security' && (
          <div className="module-grid animate-fadeInUp">
            <div className="module-card" style={{ gridColumn: 'span 3' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0 }}><Shield size={18} /> Role Management</h3>
                <button className="admin-btn admin-btn-primary admin-btn-sm"><Plus size={14} /> Create Role</button>
              </div>
              <table className="finance-table">
                <thead><tr><th>Role Name</th><th>Permissions</th><th>Users</th><th>Actions</th></tr></thead>
                <tbody>
                  <tr>
                    <td><strong>Super Admin</strong></td>
                    <td><span className="badge badge-success">Full Access</span></td>
                    <td>1</td>
                    <td><button className="admin-btn admin-btn-sm" disabled>System</button></td>
                  </tr>
                  <tr>
                    <td><strong>Fleet Manager</strong></td>
                    <td><span className="role-badge">View Cars</span> <span className="role-badge">Edit Cars</span> <span className="role-badge">View Maintenance</span></td>
                    <td>3</td>
                    <td><button className="admin-btn admin-btn-outline admin-btn-sm">Edit</button></td>
                  </tr>
                  <tr>
                    <td><strong>Support Agent</strong></td>
                    <td><span className="role-badge">View Bookings</span> <span className="role-badge">Edit Bookings</span> <span className="role-badge">Chat</span></td>
                    <td>5</td>
                    <td><button className="admin-btn admin-btn-outline admin-btn-sm">Edit</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CORPORATE B2B */}
        {activeTab === 'corporate' && (
          <div className="module-grid animate-fadeInUp">
            <div className="module-card" style={{ gridColumn: 'span 3' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0 }}><Briefcase size={18} /> Corporate Clients (B2B)</h3>
                <button className="admin-btn admin-btn-primary admin-btn-sm"><Plus size={14} /> Add Client</button>
              </div>
              <table className="finance-table">
                <thead><tr><th>Company Name</th><th>Contact Person</th><th>Active Rentals</th><th>Contract Expiry</th><th>Status</th></tr></thead>
                <tbody>
                  <tr>
                    <td><strong>Rahim Corporation</strong></td>
                    <td>Mr. Rahim (01955-889900)</td>
                    <td>3 Vehicles</td>
                    <td>2025-12-31</td>
                    <td><span className="badge badge-success">Active</span></td>
                  </tr>
                  <tr>
                    <td><strong>TechBD IT Solutions</strong></td>
                    <td>Ariful Islam (01788-667788)</td>
                    <td>1 Vehicle</td>
                    <td>2024-08-15</td>
                    <td><span className="badge badge-warning">Expiring Soon</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminOperationsPage;
