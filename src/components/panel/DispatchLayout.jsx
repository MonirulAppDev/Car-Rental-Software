import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  Monitor, PlusCircle, FileText, Users, LogOut, CarFront, Activity, MapPin
} from 'lucide-react';
import './DispatchLayout.css';

const navItems = [
  { path: '/panel-only/board', icon: <Monitor size={18} />, label: 'Live Board' },
  { path: '/panel-only/new', icon: <PlusCircle size={18} />, label: 'Manual Entry' },
  { path: '/panel-only/ledger', icon: <FileText size={18} />, label: 'Trip Ledger' },
  { path: '/panel-only/staff', icon: <Users size={18} />, label: 'Staff & Roles' },
];

const DispatchLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="dispatch-layout">
      {/* Sidebar */}
      <aside className="dispatch-sidebar">
        <div className="dispatch-brand">
          <CarFront size={24} color="#2563eb" />
          <div>
            <span style={{ color: '#2563eb' }}>Drive</span>BD Offline
          </div>
        </div>
        
        <nav className="dispatch-nav">
          <ul>
            <li>
              <NavLink to="/panel-only/dashboard" className={({isActive}) => isActive ? "dispatch-nav-link active" : "dispatch-nav-link"}>
                <Activity size={18} /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/panel-only/tracking" className={({isActive}) => isActive ? "dispatch-nav-link active" : "dispatch-nav-link"}>
                <MapPin size={18} /> GPS Tracking
              </NavLink>
            </li>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `dispatch-nav-link ${isActive ? 'active' : ''}`}
                >
                  {item.icon} {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ padding: '20px', borderTop: '1px solid #e2e8f0' }}>
          <button 
            onClick={() => navigate('/')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              width: '100%', padding: '10px', background: 'transparent', 
              border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: 500 
            }}
          >
            <LogOut size={18} /> Exit System
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dispatch-main">
        <header className="dispatch-header">
          <h2 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 600 }}>Dispatcher Desk</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600 }}>Md. Shafiq</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Manager</p>
            </div>
            <div style={{ width: '36px', height: '36px', background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#475569' }}>
              MS
            </div>
          </div>
        </header>
        
        <div className="dispatch-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DispatchLayout;
