import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User, Car, Phone, Mail, MapPin, Edit2, Star,
  Clock, CheckCircle, XCircle, AlertCircle, Wallet, Gift, MessageSquare, AlertTriangle, ShieldAlert
} from 'lucide-react';
import { bookings, currentUser, cars } from '../../data/mockData';
import './ProfilePage.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('bookings');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ongoing': return <Car size={14} />;
      case 'confirmed': return <CheckCircle size={14} />;
      case 'completed': return <CheckCircle size={14} />;
      case 'pending': return <Clock size={14} />;
      case 'cancelled': return <XCircle size={14} />;
      default: return <AlertCircle size={14} />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'ongoing': return 'badge-success';
      case 'confirmed': return 'badge-info';
      case 'completed': return 'badge-success';
      case 'pending': return 'badge-warning';
      case 'cancelled': return 'badge-danger';
      default: return 'badge-gray';
    }
  };

  const userBookings = bookings.slice(0, 5);

  return (
    <div className="customer-site profile-page">
      {/* Header */}
      <div className="profile-header" id="profile-header">
        <div className="profile-header-bg" />
        <div className="container">
          <div className="profile-header-content">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar-ring">
                <img src={currentUser.avatar} alt={currentUser.name} className="profile-avatar" />
              </div>
              <button className="profile-avatar-edit" id="edit-avatar-btn">
                <Edit2 size={12} />
              </button>
            </div>
            <div className="profile-info">
              <h1 className="profile-name">{currentUser.name}</h1>
              <div className="profile-meta">
                <span><Phone size={13} /> {currentUser.phone}</span>
                <span><Mail size={13} /> {currentUser.email}</span>
                <span><MapPin size={13} /> Gulshan-2, Dhaka</span>
              </div>
              <div className="profile-stats">
                <div className="profile-stat">
                  <span className="profile-stat-value">{currentUser.totalBookings}</span>
                  <span className="profile-stat-label">Total Bookings</span>
                </div>
                <div className="profile-stat-divider" />
                <div className="profile-stat">
                  <span className="profile-stat-value" style={{ color: 'var(--gold-primary)' }}>{currentUser.loyaltyPoints.toLocaleString()}</span>
                  <span className="profile-stat-label">Loyalty Points</span>
                </div>
                <div className="profile-stat-divider" />
                <div className="profile-stat">
                  <span className="profile-stat-value" style={{ color: 'var(--color-success)' }}>৳{currentUser.walletBalance.toLocaleString()}</span>
                  <span className="profile-stat-label">Wallet Balance</span>
                </div>
              </div>
            </div>
            <button className="btn btn-secondary" id="edit-profile-btn">
              <Edit2 size={14} /> Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Quick Cards */}
        <div className="profile-quick-cards">
          <div className="profile-quick-card" id="wallet-card">
            <div className="quick-card-icon" style={{ color: 'var(--color-success)' }}><Wallet size={22} /></div>
            <div>
              <p className="quick-card-label">Wallet Balance</p>
              <p className="quick-card-value">৳{currentUser.walletBalance.toLocaleString()}</p>
            </div>
            <button className="btn btn-success btn-sm" id="add-money-btn">Add Money</button>
          </div>
          <div className="profile-quick-card" id="loyalty-card">
            <div className="quick-card-icon" style={{ color: 'var(--gold-primary)' }}><Star size={22} /></div>
            <div>
              <p className="quick-card-label">Loyalty Points</p>
              <p className="quick-card-value">{currentUser.loyaltyPoints.toLocaleString()} pts</p>
            </div>
            <span className="badge badge-gold">Gold Member</span>
          </div>
          <div className="profile-quick-card" id="referral-card">
            <div className="quick-card-icon" style={{ color: 'var(--blue-light)' }}><Gift size={22} /></div>
            <div>
              <p className="quick-card-label">Referral Code</p>
              <p className="quick-card-value" style={{ fontSize: '1rem', letterSpacing: '2px' }}>{currentUser.referralCode}</p>
            </div>
            <button className="btn btn-blue btn-sm" id="share-referral-btn">Share</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs" id="profile-tabs">
          {[
            { key: 'bookings', label: 'My Bookings', icon: <Car size={15} /> },
            { key: 'wallet', label: 'Wallet & Rewards', icon: <Wallet size={15} /> },
            { key: 'referrals', label: 'Refer & Earn', icon: <Gift size={15} /> },
            { key: 'settings', label: 'Account Settings', icon: <User size={15} /> },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`profile-tab ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
              id={`profile-tab-${tab.key}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="profile-bookings animate-fadeInUp" id="profile-bookings-tab">
            {userBookings.length > 0 ? (
              <div className="bookings-list">
                {userBookings.map((booking) => {
                  const car = cars.find((c) => c.id === booking.carId);
                  return (
                    <div key={booking.id} className="booking-history-card" id={`booking-history-${booking.id}`}>
                      <div className="booking-history-image">
                        <img src={car?.image} alt={booking.carName} />
                      </div>
                      <div className="booking-history-content">
                        <div className="booking-history-header">
                          <div>
                            <p className="booking-history-id">{booking.id}</p>
                            <h4 className="booking-history-car">{booking.carName}</h4>
                          </div>
                          <div className={`badge ${getStatusClass(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            <span>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                          </div>
                        </div>
                        <div className="booking-history-meta">
                          <span><MapPin size={12} /> {booking.pickupLocation}</span>
                          <span><Clock size={12} /> {booking.startDate}</span>
                          <span><Car size={12} /> {booking.driverOption === 'with-driver' ? 'With Driver' : 'Self Drive'}</span>
                        </div>
                        <div className="booking-history-footer">
                          <span className="booking-history-amount">৳{booking.totalAmount.toLocaleString()}</span>
                          <div className="booking-history-actions">
                            {booking.status === 'pending' && (
                              <button className="btn btn-danger btn-sm" id={`cancel-booking-${booking.id}`}>Cancel</button>
                            )}
                            {booking.status === 'completed' && (
                              <button className="btn btn-blue btn-sm" id={`review-booking-${booking.id}`}>
                                <Star size={12} /> Review
                              </button>
                            )}
                            {(booking.status === 'completed' || booking.status === 'cancelled') && (
                              <Link to={`/booking/${booking.carId}`} className="btn btn-ghost btn-sm" id={`rebook-${booking.id}`}>
                                Re-book
                              </Link>
                            )}
                            {booking.status === 'ongoing' && (
                              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', width: '100%', marginTop: '8px', justifyContent: 'flex-end' }}>
                                <button className="btn btn-sm" style={{ background: '#3b82f6', color: 'white', borderColor: '#3b82f6' }}><MessageSquare size={12} /> Chat Driver</button>
                                <button className="btn btn-sm" style={{ background: '#f59e0b', color: 'white', borderColor: '#f59e0b' }}><Clock size={12} /> Extend Trip</button>
                                <button className="btn btn-sm" style={{ background: '#ef4444', color: 'white', borderColor: '#ef4444' }}><ShieldAlert size={12} /> SOS</button>
                                <button className="btn btn-sm" style={{ background: '#64748b', color: 'white', borderColor: '#64748b' }}><AlertTriangle size={12} /> Damage Report</button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="profile-empty">
                <Car size={48} />
                <h3>No Bookings Yet</h3>
                <p>Start your journey with DriveBD today!</p>
                <Link to="/cars" className="btn btn-primary" id="profile-browse-cars-btn">Browse Cars</Link>
              </div>
            )}
          </div>
        )}
        {/* Wallet Tab */}
        {activeTab === 'wallet' && (
          <div className="profile-wallet animate-fadeInUp" id="profile-wallet-tab">
            <div className="settings-card">
              <h3 className="settings-card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Wallet size={18} /> My Wallet</h3>
              <div className="wallet-balance-box" style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: 'var(--radius-lg)', textAlign: 'center', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ color: 'var(--c-text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>Available Balance</p>
                <h2 style={{ color: 'var(--color-success)', fontSize: '2.5rem', margin: '0 0 16px' }}>৳{currentUser.walletBalance.toLocaleString()}</h2>
                <button className="btn btn-success" id="add-money-wallet-btn">Add Money to Wallet</button>
              </div>
              <h4 style={{ marginBottom: '16px', color: 'var(--c-text-secondary)', fontSize: '1rem' }}>Recent Transactions</h4>
              <div className="wallet-transactions">
                <div style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                  <div><p style={{ fontWeight: 600, margin: '0 0 4px' }}>Added via bKash</p><span style={{ fontSize: '0.8rem', color: 'var(--c-text-muted)' }}>12 May 2024</span></div>
                  <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>+ ৳5,000</span>
                </div>
                <div style={{ padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
                  <div><p style={{ fontWeight: 600, margin: '0 0 4px' }}>Trip Payment (BK-2024-91823)</p><span style={{ fontSize: '0.8rem', color: 'var(--c-text-muted)' }}>10 May 2024</span></div>
                  <span style={{ color: 'var(--color-error)', fontWeight: 600 }}>- ৳3,500</span>
                </div>
              </div>
            </div>

            <div className="settings-card" style={{ marginTop: '24px' }}>
              <h3 className="settings-card-title" style={{ color: 'var(--gold-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}><Star size={18} /> Loyalty Points</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '16px', background: 'rgba(245,197,24,0.05)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(245,197,24,0.1)' }}>
                <div style={{ flex: 1 }}>
                  <h2 style={{ color: 'var(--gold-primary)', margin: '0 0 8px' }}>{currentUser.loyaltyPoints.toLocaleString()} pts</h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--c-text-muted)', margin: 0 }}>You are a <strong>Gold Member</strong>. Earn 10 points for every ৳1,000 spent.</p>
                </div>
                <button className="btn btn-primary" style={{ background: 'var(--gold-primary)', color: '#000', border: 'none' }}>Redeem</button>
              </div>
            </div>
          </div>
        )}

        {/* Referrals Tab */}
        {activeTab === 'referrals' && (
          <div className="profile-referrals animate-fadeInUp" id="profile-referrals-tab">
            <div className="settings-card text-center" style={{ padding: '40px 20px' }}>
              <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--blue-light)', marginBottom: '20px' }}>
                <Gift size={40} />
              </div>
              <h2 style={{ marginBottom: '12px' }}>Refer a Friend & Earn ৳500!</h2>
              <p style={{ color: 'var(--c-text-muted)', maxWidth: '400px', margin: '0 auto 24px', lineHeight: '1.5' }}>
                Share your referral code with friends. When they complete their first booking, you both get ৳500 added to your wallet.
              </p>
              
              <div style={{ display: 'flex', maxWidth: '300px', margin: '0 auto 32px' }}>
                <input 
                  type="text" 
                  readOnly 
                  value={currentUser.referralCode} 
                  className="form-input" 
                  style={{ textAlign: 'center', letterSpacing: '2px', fontWeight: 700, borderRadius: 'var(--radius-md) 0 0 var(--radius-md)', borderRight: 'none' }}
                />
                <button className="btn btn-blue" style={{ borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>Copy Code</button>
              </div>

              <h4 style={{ textAlign: 'left', marginBottom: '16px', color: 'var(--c-text-secondary)', fontSize: '1rem' }}>Your Referrals</h4>
              <div className="wallet-transactions" style={{ textAlign: 'left' }}>
                <div style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div><p style={{ fontWeight: 600, margin: '0 0 4px' }}>Rakib Hasan</p><span style={{ fontSize: '0.8rem', color: 'var(--c-text-muted)' }}>Joined 15 May 2024</span></div>
                  <span className="badge badge-success">Completed (৳500)</span>
                </div>
                <div style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div><p style={{ fontWeight: 600, margin: '0 0 4px' }}>Sadia Islam</p><span style={{ fontSize: '0.8rem', color: 'var(--c-text-muted)' }}>Joined 18 May 2024</span></div>
                  <span className="badge badge-warning">Pending Ride</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="profile-settings animate-fadeInUp" id="profile-settings-tab">
            <div className="settings-card">
              <h3 className="settings-card-title">Personal Information</h3>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" defaultValue={currentUser.name} className="form-input" id="settings-name-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="tel" defaultValue={currentUser.phone} className="form-input" id="settings-phone-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" defaultValue={currentUser.email} className="form-input" id="settings-email-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">NID Number</label>
                  <input type="text" defaultValue={currentUser.nid} className="form-input" id="settings-nid-input" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Full Address</label>
                <input type="text" defaultValue={currentUser.address} className="form-input" id="settings-address-input" />
              </div>
              <button className="btn btn-primary" id="save-profile-btn">Save Changes</button>
            </div>

            <div className="settings-card">
              <h3 className="settings-card-title">Change Password</h3>
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input type="password" placeholder="••••••••" className="form-input" id="current-password-input" />
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input type="password" placeholder="••••••••" className="form-input" id="new-password-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="form-input" id="confirm-password-input" />
                </div>
              </div>
              <button className="btn btn-primary" id="change-password-btn">Update Password</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
