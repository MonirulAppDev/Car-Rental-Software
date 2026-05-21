import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, CalendarCheck, Car, Users, BarChart2,
  Settings, LogOut, ChevronLeft, ChevronRight, Bell,
  Menu, X, User, Shield, Briefcase, DollarSign
} from 'lucide-react';
import './AdminLayout.css';

const navItems = [
  { path: '/admin-panel/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { path: '/admin-panel/bookings', icon: <CalendarCheck size={18} />, label: 'Bookings' },
  { path: '/admin-panel/cars', icon: <Car size={18} />, label: 'Car Fleet' },
  { path: '/admin-panel/drivers', icon: <Users size={18} />, label: 'Drivers' },
  { path: '/admin-panel/accounting', icon: <DollarSign size={18} />, label: 'Accounting' },
  { path: '/admin-panel/operations', icon: <Briefcase size={18} />, label: 'Operations' },
  { path: '/admin-panel/reports', icon: <BarChart2 size={18} />, label: 'Reports' },
  { path: '/admin-panel/settings', icon: <Settings size={18} />, label: 'Settings' },
];

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 1, text: 'New booking from Farhan Ahmed', time: '2 min ago', type: 'booking' },
    { id: 2, text: 'Nusrat Jahan booking pending review', time: '15 min ago', type: 'pending' },
    { id: 3, text: 'Toyota Hiace service due next week', time: '1 hr ago', type: 'service' },
  ];

  return (
    <div className="admin-site admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${collapsed ? 'admin-sidebar--collapsed' : ''} ${mobileOpen ? 'admin-sidebar--mobile-open' : ''}`} id="admin-sidebar">
        {/* Logo */}
        <div className="admin-sidebar-logo" id="admin-sidebar-logo">
          <div className="admin-logo-icon">
            <Car size={18} strokeWidth={2.5} />
          </div>
          {!collapsed && (
            <div className="admin-logo-text">
              <span className="admin-logo-brand">Drive</span>
              <span className="admin-logo-accent">BD</span>
              <span className="admin-logo-label">Admin</span>
            </div>
          )}
        </div>

        {/* Role Badge */}
        {!collapsed && (
          <div className="admin-role-badge">
            <Shield size={12} />
            <span>Super Admin</span>
          </div>
        )}

        {/* Nav */}
        <nav className="admin-nav" id="admin-nav">
          <p className={`admin-nav-section-label ${collapsed ? 'hidden' : ''}`}>MAIN MENU</p>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? 'admin-nav-link--active' : ''}`
              }
              id={`admin-nav-${item.label.toLowerCase().replace(' ', '-')}`}
              onClick={() => setMobileOpen(false)}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              {!collapsed && <span className="admin-nav-label">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="admin-sidebar-user" id="admin-sidebar-user">
          <div className="admin-user-avatar">A</div>
          {!collapsed && (
            <div className="admin-user-info">
              <p className="admin-user-name">Admin User</p>
              <p className="admin-user-email">admin@drivebd.com</p>
            </div>
          )}
          {!collapsed && (
            <button
              className="admin-logout-btn"
              onClick={() => navigate('/admin-panel')}
              id="admin-logout-btn"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>

        {/* Collapse Toggle */}
        <button
          className="admin-collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          id="admin-collapse-btn"
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setMobileOpen(false)} id="admin-sidebar-overlay" />
      )}

      {/* Main Content */}
      <div className={`admin-main ${collapsed ? 'admin-main--expanded' : ''}`}>
        {/* Top Header */}
        <header className="admin-topbar" id="admin-topbar">
          <button
            className="admin-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            id="admin-mobile-menu-btn"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="admin-topbar-right">
            {/* Notifications */}
            <div className="admin-notif-wrapper" id="admin-notif-wrapper">
              <button
                className="admin-topbar-btn"
                onClick={() => setNotifOpen(!notifOpen)}
                id="admin-notif-btn"
              >
                <Bell size={18} />
                <span className="notif-badge">{notifications.length}</span>
              </button>

              {notifOpen && (
                <div className="admin-notif-dropdown" id="admin-notif-dropdown">
                  <div className="notif-header">
                    <p className="notif-title">Notifications</p>
                    <button className="notif-mark-all" id="mark-all-read-btn">Mark all read</button>
                  </div>
                  {notifications.map((n) => (
                    <div key={n.id} className="notif-item" id={`notif-${n.id}`}>
                      <div className="notif-dot" />
                      <div>
                        <p className="notif-text">{n.text}</p>
                        <p className="notif-time">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Admin Profile */}
            <div className="admin-topbar-user" id="admin-topbar-user">
              <div className="admin-user-avatar">A</div>
              <div className="hide-mobile">
                <p className="admin-user-name">Admin User</p>
                <p className="admin-user-email" style={{ fontSize: '0.72rem', color: 'var(--a-text-secondary)' }}>Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-content" id="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
