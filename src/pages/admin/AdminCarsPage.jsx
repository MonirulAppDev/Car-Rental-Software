import { useState } from 'react';
import {
  Plus, Search, Edit2, Trash2, X, CheckCircle,
  Users, Fuel, Settings2, MapPin, Star
} from 'lucide-react';
import { cars as initialCars, carTypes } from '../../data/mockData';
import './AdminCarsPage.css';

const emptyForm = {
  name: '', brand: '', type: 'Sedan', model: '', seats: 5,
  fuel: 'Petrol', transmission: 'Automatic', pricePerDay: '',
  pricePerHour: '', priceWithDriver: '', location: 'Dhaka',
  available: true, description: '', mileage: '', plate: '',
  image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80',
};

const AdminCarsPage = () => {
  const [carList, setCarList] = useState(initialCars);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openAdd = () => {
    setEditingCar(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (car) => {
    setEditingCar(car.id);
    setForm({ ...car });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name || !form.pricePerDay) {
      showToast('Please fill required fields', 'error');
      return;
    }
    if (editingCar) {
      setCarList((prev) => prev.map((c) => c.id === editingCar ? { ...form, id: editingCar, rating: c.rating, reviews: c.reviews } : c));
      showToast(`${form.name} updated successfully!`);
    } else {
      const newCar = { ...form, id: Date.now(), rating: 4.5, reviews: 0 };
      setCarList((prev) => [...prev, newCar]);
      showToast(`${form.name} added to fleet!`);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setCarList((prev) => prev.filter((c) => c.id !== id));
    setDeleteConfirm(null);
    showToast('Car removed from fleet.', 'error');
  };

  const toggleAvailability = (id) => {
    setCarList((prev) => prev.map((c) => c.id === id ? { ...c, available: !c.available } : c));
  };

  const filtered = carList.filter((c) => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.brand.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'All' || c.type === typeFilter;
    return matchSearch && matchType;
  });

  const setField = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  return (
    <div className="admin-cars-page" id="admin-cars-page">
      {/* Toast */}
      {toast && (
        <div className={`admin-toast admin-toast--${toast.type}`} id="admin-cars-toast">
          {toast.type === 'success' ? <CheckCircle size={16} /> : <X size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Car Fleet Management</h1>
          <p className="admin-page-subtitle">{carList.length} vehicles registered • {carList.filter((c) => c.available).length} available</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd} id="add-car-btn">
          <Plus size={16} /> Add New Car
        </button>
      </div>

      {/* Filters */}
      <div className="admin-card" id="cars-table-card">
        <div className="admin-card-header" style={{ flexWrap: 'wrap', gap: '12px' }}>
          <div className="bookings-search-wrapper">
            <Search size={15} className="bookings-search-icon" />
            <input
              type="text"
              placeholder="Search by name or brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bookings-search-input"
              id="cars-search-input"
            />
          </div>
          <div className="car-type-filters">
            {carTypes.map((type) => (
              <button
                key={type}
                className={`car-type-filter-btn ${typeFilter === type ? 'active' : ''}`}
                onClick={() => setTypeFilter(type)}
                id={`car-type-filter-${type}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table" id="cars-table">
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Type</th>
                <th>Specs</th>
                <th>Daily Rate</th>
                <th>Hourly Rate</th>
                <th>W/ Driver</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((car) => (
                <tr key={car.id} id={`car-row-${car.id}`}>
                  <td>
                    <div className="car-table-info">
                      <div className="car-table-img">
                        <img src={car.image} alt={car.name} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=200&q=60'; }} />
                      </div>
                      <div>
                        <p className="car-table-name">{car.name}</p>
                        <p className="car-table-brand">{car.brand} • {car.model}</p>
                      </div>
                    </div>
                  </td>
                  <td><span className="admin-badge admin-badge-info">{car.type}</span></td>
                  <td>
                    <div className="car-specs-mini">
                      <span><Users size={11} /> {car.seats}</span>
                      <span><Fuel size={11} /> {car.fuel}</span>
                      <span><Settings2 size={11} /> {car.transmission.slice(0,4)}</span>
                    </div>
                  </td>
                  <td><span className="price-cell">৳{Number(car.pricePerDay).toLocaleString()}</span></td>
                  <td><span className="price-cell">৳{Number(car.pricePerHour).toLocaleString()}</span></td>
                  <td><span className="price-cell">৳{Number(car.priceWithDriver).toLocaleString()}</span></td>
                  <td>
                    <div className="rating-cell">
                      <Star size={12} fill="currentColor" color="#f5c518" />
                      <span>{car.rating}</span>
                      <span className="rating-count">({car.reviews})</span>
                    </div>
                  </td>
                  <td>
                    <button
                      className={`availability-toggle ${car.available ? 'available' : 'unavailable'}`}
                      onClick={() => toggleAvailability(car.id)}
                      id={`toggle-availability-${car.id}`}
                    >
                      {car.available ? '✓ Available' : '✗ Booked'}
                    </button>
                  </td>
                  <td>
                    <div className="bk-actions">
                      <button className="admin-btn admin-btn-warning admin-btn-sm" onClick={() => openEdit(car)} id={`edit-car-${car.id}`} title="Edit">
                        <Edit2 size={13} />
                      </button>
                      <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => setDeleteConfirm(car)} id={`delete-car-${car.id}`} title="Delete">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="admin-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="admin-modal car-form-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3 className="admin-modal-title">{editingCar ? 'Edit Car Details' : 'Add New Car'}</h3>
              </div>
              <button className="admin-modal-close" onClick={() => setShowForm(false)} id="close-car-form">✕</button>
            </div>
            <div className="admin-modal-body car-form-body">
              <div className="car-form-grid">
                <div className="admin-form-group">
                  <label className="admin-form-label">Car Name *</label>
                  <input type="text" className="admin-form-input" value={form.name} onChange={(e) => setField('name', e.target.value)} placeholder="e.g. Toyota Alphard" id="car-form-name" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Brand *</label>
                  <input type="text" className="admin-form-input" value={form.brand} onChange={(e) => setField('brand', e.target.value)} placeholder="e.g. Toyota" id="car-form-brand" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Type</label>
                  <select className="admin-form-select" value={form.type} onChange={(e) => setField('type', e.target.value)} id="car-form-type">
                    {['Sedan', 'SUV', 'MPV', 'Microbus', 'Hatchback'].map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Model Year</label>
                  <input type="text" className="admin-form-input" value={form.model} onChange={(e) => setField('model', e.target.value)} placeholder="2024" id="car-form-model" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Seats</label>
                  <input type="number" className="admin-form-input" value={form.seats} onChange={(e) => setField('seats', e.target.value)} min="2" max="50" id="car-form-seats" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Fuel Type</label>
                  <select className="admin-form-select" value={form.fuel} onChange={(e) => setField('fuel', e.target.value)} id="car-form-fuel">
                    {['Petrol', 'Diesel', 'Hybrid', 'Electric', 'CNG'].map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Transmission</label>
                  <select className="admin-form-select" value={form.transmission} onChange={(e) => setField('transmission', e.target.value)} id="car-form-transmission">
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Location</label>
                  <select className="admin-form-select" value={form.location} onChange={(e) => setField('location', e.target.value)} id="car-form-location">
                    {['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna'].map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Daily Rate (৳) *</label>
                  <input type="number" className="admin-form-input" value={form.pricePerDay} onChange={(e) => setField('pricePerDay', e.target.value)} placeholder="5000" id="car-form-day-rate" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Hourly Rate (৳)</label>
                  <input type="number" className="admin-form-input" value={form.pricePerHour} onChange={(e) => setField('pricePerHour', e.target.value)} placeholder="800" id="car-form-hour-rate" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">With Driver Rate (৳)</label>
                  <input type="number" className="admin-form-input" value={form.priceWithDriver} onChange={(e) => setField('priceWithDriver', e.target.value)} placeholder="7000" id="car-form-driver-rate" />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">License Plate</label>
                  <input type="text" className="admin-form-input" value={form.plate} onChange={(e) => setField('plate', e.target.value)} placeholder="Dhaka Metro-Ga XX-XXXX" id="car-form-plate" />
                </div>
              </div>

              <div className="admin-form-group" style={{ marginTop: '4px' }}>
                <label className="admin-form-label">Image URL</label>
                <input type="text" className="admin-form-input" value={form.image} onChange={(e) => setField('image', e.target.value)} placeholder="https://..." id="car-form-image" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Description</label>
                <textarea className="admin-form-input" value={form.description} onChange={(e) => setField('description', e.target.value)} rows={3} placeholder="Brief description..." id="car-form-desc" style={{ resize: 'vertical' }} />
              </div>

              <div className="car-form-actions">
                <button className="admin-btn admin-btn-outline" onClick={() => setShowForm(false)} id="cancel-car-form">Cancel</button>
                <button className="admin-btn admin-btn-primary" onClick={handleSave} id="save-car-btn">
                  <CheckCircle size={15} /> {editingCar ? 'Update Car' : 'Add Car'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="admin-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="admin-modal" style={{ maxWidth: '400px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-body" style={{ textAlign: 'center', padding: '32px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🗑️</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--a-text-primary)', marginBottom: '8px' }}>Remove {deleteConfirm.name}?</h3>
              <p style={{ fontSize: '0.87rem', color: 'var(--a-text-secondary)', marginBottom: '24px' }}>This action cannot be undone.</p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button className="admin-btn admin-btn-outline" onClick={() => setDeleteConfirm(null)} id="cancel-delete-btn">Cancel</button>
                <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(deleteConfirm.id)} id="confirm-delete-btn">Yes, Remove</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCarsPage;
