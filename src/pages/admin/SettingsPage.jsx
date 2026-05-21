import { useState } from 'react';
import {
  Save, Shield, Wallet, Settings, Bell, Info, CheckCircle
} from 'lucide-react';
import './SettingsPage.css';

const SettingsPage = () => {
  const [general, setGeneral] = useState({
    siteName: 'DriveBD Car Rental',
    contactEmail: 'support@drivebd.com',
    contactPhone: '09612-445566',
    address: 'House-12, Road-5, Gulshan-2, Dhaka',
    currency: '৳',
  });

  const [pricing, setPricing] = useState({
    driverFeeDay: 2500,
    hourlyMultiplier: 0.15,
    minDurationDays: 1,
    advancePercent: 25,
    vatPercent: 5,
  });

  const [payment, setPayment] = useState({
    bkashNumber: '01700-000000',
    nagadNumber: '01800-000000',
    cashOnPickup: true,
  });

  const [security, setSecurity] = useState({
    requireNid: true,
    autoApproveCash: false,
    enablePromoCodes: true,
  });

  const [toast, setToast] = useState('');

  const handleSave = (section) => {
    setToast(`${section} settings saved successfully!`);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="admin-page settings-page">
      {/* Toast Notification */}
      {toast && (
        <div className="admin-toast animate-fadeIn" id="settings-toast">
          <CheckCircle size={18} style={{ color: 'var(--color-success)' }} />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="admin-card-header" style={{ padding: '0 0 20px', borderBottom: 'none' }}>
        <div>
          <h1 className="admin-card-title" style={{ fontSize: '1.6rem' }}>System Settings</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--a-text-secondary)' }}>
            Configure global website metrics, booking rates, payment gateways, and security parameters.
          </p>
        </div>
      </div>

      <div className="settings-layout">
        {/* Left/Main Column: Settings forms */}
        <div className="settings-forms-wrapper">
          {/* General Section */}
          <section className="admin-card settings-section" id="settings-general">
            <div className="admin-card-header">
              <div className="section-title-wrapper">
                <Settings className="section-icon" />
                <h3 className="admin-card-title">General Configurations</h3>
              </div>
              <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => handleSave('General')} id="save-general-btn">
                <Save size={14} /> Save
              </button>
            </div>
            <div className="admin-card-body">
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label className="admin-form-label">System Name</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    value={general.siteName}
                    onChange={(e) => setGeneral({ ...general, siteName: e.target.value })}
                  />
                </div>
                <div className="admin-form-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Support Email</label>
                    <input
                      type="email"
                      className="admin-form-input"
                      value={general.contactEmail}
                      onChange={(e) => setGeneral({ ...general, contactEmail: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Support Helpline</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={general.contactPhone}
                      onChange={(e) => setGeneral({ ...general, contactPhone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Headquarters Address</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    value={general.address}
                    onChange={(e) => setGeneral({ ...general, address: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Pricing & Rules Section */}
          <section className="admin-card settings-section" id="settings-pricing">
            <div className="admin-card-header">
              <div className="section-title-wrapper">
                <Bell className="section-icon" />
                <h3 className="admin-card-title">Pricing & Rental Rules</h3>
              </div>
              <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => handleSave('Pricing')} id="save-pricing-btn">
                <Save size={14} /> Save
              </button>
            </div>
            <div className="admin-card-body">
              <div className="admin-form-grid-2">
                <div className="admin-form-group">
                  <label className="admin-form-label">Driver Fee / Day (৳)</label>
                  <input
                    type="number"
                    className="admin-form-input"
                    value={pricing.driverFeeDay}
                    onChange={(e) => setPricing({ ...pricing, driverFeeDay: Number(e.target.value) })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Advance Booking Fee (%)</label>
                  <input
                    type="number"
                    className="admin-form-input"
                    value={pricing.advancePercent}
                    onChange={(e) => setPricing({ ...pricing, advancePercent: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="admin-form-grid-2">
                <div className="admin-form-group">
                  <label className="admin-form-label">Minimum Rental Duration (Days)</label>
                  <input
                    type="number"
                    className="admin-form-input"
                    value={pricing.minDurationDays}
                    onChange={(e) => setPricing({ ...pricing, minDurationDays: Number(e.target.value) })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Global VAT / Tax Rate (%)</label>
                  <input
                    type="number"
                    className="admin-form-input"
                    value={pricing.vatPercent}
                    onChange={(e) => setPricing({ ...pricing, vatPercent: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Payment Credentials */}
          <section className="admin-card settings-section" id="settings-payment">
            <div className="admin-card-header">
              <div className="section-title-wrapper">
                <Wallet className="section-icon" />
                <h3 className="admin-card-title">Manual Merchant Gateways</h3>
              </div>
              <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => handleSave('Payment')} id="save-payment-btn">
                <Save size={14} /> Save
              </button>
            </div>
            <div className="admin-card-body">
              <div className="settings-info-alert">
                <Info size={16} />
                <span>
                  These numbers are displayed directly in the custom checkout page. Customers will send money to these manually.
                </span>
              </div>
              <div className="admin-form-grid-2" style={{ marginTop: '16px' }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">bKash Merchant Wallet</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    value={payment.bkashNumber}
                    onChange={(e) => setPayment({ ...payment, bkashNumber: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Nagad Merchant Wallet</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    value={payment.nagadNumber}
                    onChange={(e) => setPayment({ ...payment, nagadNumber: e.target.value })}
                  />
                </div>
              </div>
              <div className="admin-form-group">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={payment.cashOnPickup}
                    onChange={(e) => setPayment({ ...payment, cashOnPickup: e.target.checked })}
                  />
                  <span className="checkbox-label">Enable Cash on Pickup / Delivery Option</span>
                </label>
              </div>
            </div>
          </section>

          {/* Security & Access Section */}
          <section className="admin-card settings-section" id="settings-security">
            <div className="admin-card-header">
              <div className="section-title-wrapper">
                <Shield className="section-icon" />
                <h3 className="admin-card-title">Security & Booking Access</h3>
              </div>
              <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => handleSave('Access Control')} id="save-security-btn">
                <Save size={14} /> Save
              </button>
            </div>
            <div className="admin-card-body">
              <div className="checkbox-list">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={security.requireNid}
                    onChange={(e) => setSecurity({ ...security, requireNid: e.target.checked })}
                  />
                  <span className="checkbox-label">Require National ID (NID) verification for self-drive bookings</span>
                </label>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={security.autoApproveCash}
                    onChange={(e) => setSecurity({ ...security, autoApproveCash: e.target.checked })}
                  />
                  <span className="checkbox-label">Automatically approve bookings made via Cash payments</span>
                </label>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={security.enablePromoCodes}
                    onChange={(e) => setSecurity({ ...security, enablePromoCodes: e.target.checked })}
                  />
                  <span className="checkbox-label">Enable active coupon system & checkout promo validations</span>
                </label>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Info Section */}
        <aside className="settings-sidebar">
          <div className="admin-card system-info-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Platform Metadata</h3>
            </div>
            <div className="admin-card-body">
              <div className="info-row">
                <span>Core Framework:</span>
                <strong>React 18.3.1</strong>
              </div>
              <div className="info-row">
                <span>Build System:</span>
                <strong>Vite JS</strong>
              </div>
              <div className="info-row">
                <span>Theme Version:</span>
                <strong>2.0.1 (Premium Gold)</strong>
              </div>
              <div className="info-row">
                <span>Database Sync:</span>
                <span className="status-indicator online">Online (Mock)</span>
              </div>
              <div className="sticky-divider" style={{ margin: '14px 0' }} />
              <button
                className="admin-btn admin-btn-outline"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => handleSave('System Cache')}
              >
                Clear Platform Cache
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SettingsPage;
