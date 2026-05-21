import { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Clock, Eye, User, Car, MapPin, Phone } from 'lucide-react';
import { bookings, drivers } from '../../data/mockData';
import './BookingsPage.css';

const BookingsPage = () => {
  const [bookingList, setBookingList] = useState(bookings);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [assignDriver, setAssignDriver] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAction = (id, action) => {
    setBookingList((prev) =>
      prev.map((b) => b.id === id ? { ...b, status: action === 'accept' ? 'confirmed' : 'cancelled' } : b)
    );
    showToast(action === 'accept' ? `Booking ${id} confirmed!` : `Booking ${id} cancelled.`, action === 'accept' ? 'success' : 'error');
    if (selectedBooking?.id === id) setSelectedBooking(null);
  };

  const handleAssignDriver = (bookingId) => {
    if (!assignDriver) return;
    const driver = drivers.find((d) => d.id === Number(assignDriver));
    setBookingList((prev) =>
      prev.map((b) => b.id === bookingId ? { ...b, driverId: driver.id, driverName: driver.name } : b)
    );
    showToast(`Driver ${driver.name} assigned!`, 'success');
    setAssignDriver('');
    setSelectedBooking(null);
  };

  const filtered = bookingList.filter((b) => {
    const matchSearch = !search || b.customerName.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase()) || b.carName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusCount = (s) => bookingList.filter((b) => b.status === s).length;

  const getStatusBadge = (status) => {
    const map = { confirmed: 'admin-badge-info', completed: 'admin-badge-success', pending: 'admin-badge-warning', cancelled: 'admin-badge-danger' };
    return map[status] || 'admin-badge-gray';
  };

  return (
    <div className="bookings-page" id="admin-bookings-page">
      {/* Toast */}
      {toast && (
        <div className={`admin-toast admin-toast--${toast.type}`} id="admin-toast">
          {toast.type === 'success' ? <CheckCircle size={16} /> : <XCircle size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Booking Management</h1>
          <p className="admin-page-subtitle">Accept, reject, and manage all customer bookings</p>
        </div>
      </div>

      {/* Status Summary */}
      <div className="booking-status-summary" id="booking-status-summary">
        {[
          { key: 'all', label: 'All', count: bookingList.length, color: '#64748b' },
          { key: 'pending', label: 'Pending', count: statusCount('pending'), color: '#f59e0b' },
          { key: 'confirmed', label: 'Confirmed', count: statusCount('confirmed'), color: '#3b82f6' },
          { key: 'completed', label: 'Completed', count: statusCount('completed'), color: '#22c55e' },
          { key: 'cancelled', label: 'Cancelled', count: statusCount('cancelled'), color: '#ef4444' },
        ].map((item) => (
          <button
            key={item.key}
            className={`status-summary-btn ${statusFilter === item.key ? 'active' : ''}`}
            onClick={() => setStatusFilter(item.key)}
            id={`filter-status-${item.key}`}
            style={{ '--status-color': item.color }}
          >
            <span className="status-summary-count">{item.count}</span>
            <span className="status-summary-label">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="admin-card" id="bookings-table-card">
        <div className="admin-card-header">
          <div className="bookings-search-wrapper">
            <Search size={15} className="bookings-search-icon" />
            <input
              type="text"
              placeholder="Search by customer, booking ID, or car..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bookings-search-input"
              id="bookings-search-input"
            />
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table" id="bookings-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Car</th>
                <th>Trip Details</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((booking) => (
                <tr key={booking.id} id={`booking-row-${booking.id}`}>
                  <td>
                    <p className="bk-id">{booking.id}</p>
                    <p className="bk-date">{booking.bookingDate}</p>
                  </td>
                  <td>
                    <div className="bk-customer">
                      <div className="bk-avatar">{booking.customerName.charAt(0)}</div>
                      <div>
                        <p className="bk-customer-name">{booking.customerName}</p>
                        <p className="bk-customer-phone">{booking.customerPhone}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="bk-car-name">{booking.carName}</p>
                    <p className="bk-driver-opt">{booking.driverOption === 'with-driver' ? '🚗 With Driver' : '🔑 Self Drive'}</p>
                  </td>
                  <td>
                    <p className="bk-date-info">{booking.startDate}</p>
                    <p className="bk-duration">{booking.duration} {booking.durationType}</p>
                  </td>
                  <td>
                    <p className="bk-amount">৳{booking.totalAmount.toLocaleString()}</p>
                    <p className="bk-advance">Adv: ৳{booking.advancePaid.toLocaleString()}</p>
                  </td>
                  <td>
                    <span className="bk-payment-method">{booking.paymentMethod}</span>
                    {booking.transactionId && (
                      <p className="bk-txn">{booking.transactionId}</p>
                    )}
                  </td>
                  <td>
                    <span className={`admin-badge ${getStatusBadge(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="bk-actions">
                      <button
                        className="admin-btn admin-btn-outline admin-btn-sm"
                        onClick={() => setSelectedBooking(booking)}
                        id={`view-booking-${booking.id}`}
                        title="View Details"
                      >
                        <Eye size={13} />
                      </button>
                      {booking.status === 'pending' && (
                        <>
                          <button
                            className="admin-btn admin-btn-success admin-btn-sm"
                            onClick={() => handleAction(booking.id, 'accept')}
                            id={`accept-booking-${booking.id}`}
                            title="Accept"
                          >
                            <CheckCircle size={13} />
                          </button>
                          <button
                            className="admin-btn admin-btn-danger admin-btn-sm"
                            onClick={() => handleAction(booking.id, 'reject')}
                            id={`reject-booking-${booking.id}`}
                            title="Reject"
                          >
                            <XCircle size={13} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="admin-empty-state" id="bookings-empty-state">
              <Clock size={36} />
              <p>No bookings found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="admin-modal-overlay" id="booking-detail-modal" onClick={() => setSelectedBooking(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <p className="admin-modal-booking-id">{selectedBooking.id}</p>
                <h3 className="admin-modal-title">Booking Details</h3>
              </div>
              <button className="admin-modal-close" onClick={() => setSelectedBooking(null)} id="close-booking-modal">✕</button>
            </div>

            <div className="admin-modal-body">
              <div className="modal-info-grid">
                <div className="modal-info-section">
                  <p className="modal-section-label"><User size={13} /> Customer Info</p>
                  <p className="modal-info-value">{selectedBooking.customerName}</p>
                  <p className="modal-info-sub">{selectedBooking.customerPhone}</p>
                  <p className="modal-info-sub">{selectedBooking.customerEmail}</p>
                </div>
                <div className="modal-info-section">
                  <p className="modal-section-label"><Car size={13} /> Vehicle</p>
                  <p className="modal-info-value">{selectedBooking.carName}</p>
                  <p className="modal-info-sub">{selectedBooking.driverOption === 'with-driver' ? 'With Driver' : 'Self Drive'}</p>
                  <p className="modal-info-sub">{selectedBooking.duration} {selectedBooking.durationType}</p>
                </div>
                <div className="modal-info-section">
                  <p className="modal-section-label"><MapPin size={13} /> Route</p>
                  <p className="modal-info-value" style={{ fontSize: '0.85rem' }}>{selectedBooking.pickupLocation}</p>
                  <p className="modal-info-sub">→ {selectedBooking.dropLocation}</p>
                </div>
                <div className="modal-info-section">
                  <p className="modal-section-label">💳 Payment</p>
                  <p className="modal-info-value">৳{selectedBooking.totalAmount.toLocaleString()}</p>
                  <p className="modal-info-sub">{selectedBooking.paymentMethod}</p>
                  {selectedBooking.transactionId && (
                    <p className="modal-info-sub">TXN: {selectedBooking.transactionId}</p>
                  )}
                </div>
              </div>

              {/* Driver Assignment */}
              {selectedBooking.driverOption === 'with-driver' && (
                <div className="modal-driver-assign" id="driver-assign-section">
                  <p className="modal-section-label"><User size={13} /> Assign Driver</p>
                  {selectedBooking.driverName ? (
                    <p className="assigned-driver">✅ {selectedBooking.driverName}</p>
                  ) : (
                    <div className="driver-assign-form">
                      <select
                        value={assignDriver}
                        onChange={(e) => setAssignDriver(e.target.value)}
                        className="admin-form-select"
                        id="assign-driver-select"
                      >
                        <option value="">Select a driver</option>
                        {drivers.filter((d) => d.status === 'available').map((d) => (
                          <option key={d.id} value={d.id}>{d.name} — {d.rating}★ ({d.trips} trips)</option>
                        ))}
                      </select>
                      <button
                        className="admin-btn admin-btn-primary"
                        onClick={() => handleAssignDriver(selectedBooking.id)}
                        id="confirm-assign-driver-btn"
                      >
                        Assign Driver
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              {selectedBooking.status === 'pending' && (
                <div className="modal-actions">
                  <button
                    className="admin-btn admin-btn-danger"
                    onClick={() => handleAction(selectedBooking.id, 'reject')}
                    id="modal-reject-btn"
                  >
                    <XCircle size={15} /> Reject Booking
                  </button>
                  <button
                    className="admin-btn admin-btn-success"
                    onClick={() => handleAction(selectedBooking.id, 'accept')}
                    id="modal-accept-btn"
                  >
                    <CheckCircle size={15} /> Accept Booking
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
