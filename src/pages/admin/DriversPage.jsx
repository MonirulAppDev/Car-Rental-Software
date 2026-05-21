import { useState } from 'react';
import { Star, Phone, CheckCircle, X, Plus, Edit2 } from 'lucide-react';
import { drivers as initialDrivers } from '../../data/mockData';
import './DriversPage.css';

const DriversPage = () => {
  const [driverList, setDriverList] = useState(initialDrivers);
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', experience: '', license: '', status: 'available', address: '', languages: 'Bangla' });

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleStatus = (id) => {
    setDriverList((prev) => prev.map((d) => {
      if (d.id !== id) return d;
      const next = d.status === 'available' ? 'off-duty' : 'available';
      return { ...d, status: next };
    }));
  };

  const handleAddDriver = () => {
    if (!form.name || !form.phone) { showToast('Fill required fields', 'error'); return; }
    const newDriver = { ...form, id: Date.now(), rating: 4.5, trips: 0, photo: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80`, joinedDate: new Date().toISOString().split('T')[0], currentBooking: null, languages: form.languages.split(',').map((l) => l.trim()) };
    setDriverList((prev) => [...prev, newDriver]);
    setShowForm(false);
    showToast(`Driver ${form.name} added!`);
    setForm({ name: '', phone: '', experience: '', license: '', status: 'available', address: '', languages: 'Bangla' });
  };

  const getStatusBadge = (status) => {
    if (status === 'available') return 'admin-badge-success';
    if (status === 'on-trip') return 'admin-badge-info';
    return 'admin-badge-gray';
  };

  const getStatusLabel = (status) => {
    if (status === 'available') return 'Available';
    if (status === 'on-trip') return 'On Trip';
    return 'Off Duty';
  };

  return (
    <div className="drivers-page" id="admin-drivers-page">
      {toast && (
        <div className={`admin-toast admin-toast--${toast.type}`}>
          {toast.type === 'success' ? <CheckCircle size={16} /> : <X size={16} />}
          {toast.msg}
        </div>
      )}

      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Driver Management</h1>
          <p className="admin-page-subtitle">{driverList.filter((d) => d.status === 'available').length} available • {driverList.filter((d) => d.status === 'on-trip').length} on trip</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => setShowForm(true)} id="add-driver-btn">
          <Plus size={16} /> Add Driver
        </button>
      </div>

      {/* Driver Cards Grid */}
      <div className="driver-cards-grid" id="driver-cards-grid">
        {driverList.map((driver) => (
          <div key={driver.id} className="driver-card" id={`driver-card-${driver.id}`}>
            <div className="driver-card__header">
              <div className="driver-photo-wrapper">
                <img src={driver.photo} alt={driver.name} className="driver-photo"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80'; }} />
                <div className={`driver-status-dot status-dot--${driver.status}`} />
              </div>
              <div className="driver-basic-info">
                <h3 className="driver-name">{driver.name}</h3>
                <div className="driver-rating">
                  <Star size={13} fill="currentColor" color="#f59e0b" />
                  <span>{driver.rating} ({driver.trips} trips)</span>
                </div>
                <div className={`admin-badge ${getStatusBadge(driver.status)}`} style={{ marginTop: '6px', width: 'fit-content' }}>
                  {getStatusLabel(driver.status)}
                </div>
              </div>
            </div>

            <div className="driver-details">
              <div className="driver-detail-row">
                <span className="driver-detail-label">Phone</span>
                <a href={`tel:${driver.phone}`} className="driver-detail-value driver-phone">
                  <Phone size={12} /> {driver.phone}
                </a>
              </div>
              <div className="driver-detail-row">
                <span className="driver-detail-label">Experience</span>
                <span className="driver-detail-value">{driver.experience}</span>
              </div>
              <div className="driver-detail-row">
                <span className="driver-detail-label">License</span>
                <span className="driver-detail-value driver-license">{driver.license}</span>
              </div>
              <div className="driver-detail-row">
                <span className="driver-detail-label">Languages</span>
                <span className="driver-detail-value">{driver.languages.join(', ')}</span>
              </div>
              <div className="driver-detail-row">
                <span className="driver-detail-label">Address</span>
                <span className="driver-detail-value">{driver.address}</span>
              </div>
              {driver.currentBooking && (
                <div className="driver-detail-row">
                  <span className="driver-detail-label">Current</span>
                  <span className="driver-detail-value" style={{ color: 'var(--blue-primary)', fontWeight: 600 }}>{driver.currentBooking}</span>
                </div>
              )}
            </div>

            <div className="driver-card__footer">
              <button
                className={`admin-btn admin-btn-sm ${driver.status === 'available' ? 'admin-btn-warning' : 'admin-btn-success'}`}
                onClick={() => toggleStatus(driver.id)}
                id={`toggle-driver-${driver.id}`}
              >
                {driver.status === 'available' ? 'Set Off Duty' : 'Set Available'}
              </button>
              <button className="admin-btn admin-btn-outline admin-btn-sm" id={`edit-driver-${driver.id}`}>
                <Edit2 size={12} /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Driver Modal */}
      {showForm && (
        <div className="admin-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Add New Driver</h3>
              <button className="admin-modal-close" onClick={() => setShowForm(false)} id="close-driver-form">✕</button>
            </div>
            <div className="admin-modal-body">
              <div className="car-form-grid">
                <div className="admin-form-group">
                  <label className="admin-form-label">Full Name *</label>
                  <input type="text" className="admin-form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Driver's full name" id="driver-form-name" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Phone Number *</label>
                  <input type="tel" className="admin-form-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="01XXXXXXXXX" id="driver-form-phone" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Experience</label>
                  <input type="text" className="admin-form-input" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} placeholder="e.g. 5 years" id="driver-form-experience" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">License Number</label>
                  <input type="text" className="admin-form-input" value={form.license} onChange={(e) => setForm({ ...form, license: e.target.value })} placeholder="PRO-XXXX-XXXXX" id="driver-form-license" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Languages (comma separated)</label>
                  <input type="text" className="admin-form-input" value={form.languages} onChange={(e) => setForm({ ...form, languages: e.target.value })} placeholder="Bangla, English" id="driver-form-languages" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Address</label>
                  <input type="text" className="admin-form-input" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Area, City" id="driver-form-address" />
                </div>
              </div>
              <div className="car-form-actions">
                <button className="admin-btn admin-btn-outline" onClick={() => setShowForm(false)} id="cancel-driver-form">Cancel</button>
                <button className="admin-btn admin-btn-primary" onClick={handleAddDriver} id="save-driver-btn">
                  <CheckCircle size={15} /> Add Driver
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriversPage;
