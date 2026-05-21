import { useState } from 'react';
import { manualStaff } from '../../data/mockData';
import { Shield, UserCog, UserMinus, UserPlus } from 'lucide-react';
import './PanelPages.css';

const StaffRolesPage = () => {
  const [staffList, setStaffList] = useState(manualStaff);

  const toggleRole = (id) => {
    setStaffList(staffList.map(staff => {
      if (staff.id === id) {
        const nextRole = staff.role === 'Dispatcher' ? 'Manager' 
                       : staff.role === 'Manager' ? 'Super Admin' 
                       : 'Dispatcher';
        return { ...staff, role: nextRole };
      }
      return staff;
    }));
  };

  const toggleActive = (id) => {
    setStaffList(staffList.map(staff => 
      staff.id === id ? { ...staff, active: !staff.active } : staff
    ));
  };

  return (
    <div className="animate-fadeIn">
      <div className="panel-page-header">
        <div>
          <h1 className="panel-page-title">Staff & Roles (Super Admin)</h1>
          <p className="panel-page-subtitle">Manage offline panel users and their permissions.</p>
        </div>
        <button className="panel-btn panel-btn-primary">
          <UserPlus size={15} /> Add New Staff
        </button>
      </div>

      <div className="dispatch-card">
        <h3 className="section-title"><Shield size={16} style={{ display:'inline', marginRight:'8px' }}/> Access Management</h3>
        <table className="panel-table">
          <thead>
            <tr>
              <th>Staff ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map(staff => (
              <tr key={staff.id} style={{ opacity: staff.active ? 1 : 0.6 }}>
                <td><strong>{staff.id}</strong></td>
                <td>{staff.name}</td>
                <td>{staff.phone}</td>
                <td>
                  <span style={{
                    padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600,
                    background: staff.role === 'Super Admin' ? '#fef3c7' : staff.role === 'Manager' ? '#e0e7ff' : '#f1f5f9',
                    color: staff.role === 'Super Admin' ? '#b45309' : staff.role === 'Manager' ? '#4338ca' : '#475569'
                  }}>
                    {staff.role}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${staff.active ? 'status-free' : 'status-busy'}`}>
                    {staff.active ? 'Active' : 'Suspended'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => toggleRole(staff.id)}
                      className="panel-btn panel-btn-outline" 
                      style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                      title="Change Role"
                    >
                      <UserCog size={14} /> Change Role
                    </button>
                    <button 
                      onClick={() => toggleActive(staff.id)}
                      className="panel-btn panel-btn-outline" 
                      style={{ padding: '4px 8px', fontSize: '0.75rem', color: staff.active ? '#ef4444' : '#10b981' }}
                    >
                      {staff.active ? <UserMinus size={14} /> : <UserPlus size={14} />} 
                      {staff.active ? ' Suspend' : ' Activate'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffRolesPage;
