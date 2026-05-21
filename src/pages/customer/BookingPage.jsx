import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Car, Users, Fuel, Settings2, MapPin, ChevronRight,
  CheckCircle, Clock, ArrowLeft, Shield, Star
} from 'lucide-react';
import { cars, pickupLocations } from '../../data/mockData';
import './BookingPage.css';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find((c) => c.id === Number(id));

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    driverOption: 'with-driver',
    durationType: 'days',
    duration: 1,
    startDate: '',
    startTime: '10:00',
    pickupLocation: '',
    dropLocation: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    nid: '',
    notes: '',
    paymentMethod: 'bKash',
    transactionId: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');
  
  // Payment Modal States
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [modalStep, setModalStep] = useState(1);

  // Promo Code States
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  if (!car) {
    return (
      <div className="customer-site" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'var(--c-text-secondary)' }}>
          <Car size={48} style={{ margin: '0 auto 16px', color: 'var(--c-text-muted)' }} />
          <h2>Car not found</h2>
          <Link to="/cars" className="btn btn-primary" style={{ marginTop: '16px' }}>Back to Cars</Link>
        </div>
      </div>
    );
  }

  const calculatePrice = () => {
    const base = form.driverOption === 'with-driver'
      ? car.priceWithDriver
      : form.durationType === 'days' ? car.pricePerDay : car.pricePerHour;
    return base * form.duration;
  };

  const baseTotal = calculatePrice();
  
  // Surge Pricing Simulation
  const isWeekend = form.startDate && (new Date(form.startDate).getDay() === 0 || new Date(form.startDate).getDay() === 6);
  const surgeAmount = isWeekend ? Math.floor(baseTotal * 0.1) : 0; // 10% surge
  const subtotal = baseTotal + surgeAmount;

  const discountAmount = promoApplied ? Math.floor((subtotal * discountPercent) / 100) : 0;
  const totalPrice = subtotal - discountAmount;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'NEW20') {
      setDiscountPercent(20);
      setPromoApplied(true);
      setPromoMessage('Promo applied! 20% off.');
    } else if (promoCode.toUpperCase() === 'BHALO10') {
      setDiscountPercent(10);
      setPromoApplied(true);
      setPromoMessage('Promo applied! 10% off.');
    } else {
      setPromoApplied(false);
      setDiscountPercent(0);
      setPromoMessage('Invalid promo code.');
    }
  };

  const steps = [
    { number: 1, label: 'Choose Options' },
    { number: 2, label: 'Details & Date' },
    { number: 3, label: 'Payment' },
  ];

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleConfirmClick = () => {
    if (form.paymentMethod === 'Cash') {
      handleSubmit();
    } else {
      setModalStep(1);
      setShowPaymentModal(true);
    }
  };

  const handleSubmit = () => {
    setShowPaymentModal(false);
    const id = 'BK-2024-' + Math.floor(10000 + Math.random() * 90000);
    setBookingId(id);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="customer-site booking-success-page" id="booking-success">
        <div className="container">
          <div className="booking-success">
            <div className="success-icon-ring">
              <CheckCircle size={48} />
            </div>
            <h2>Booking Submitted!</h2>
            <p>Your booking request has been received. We'll confirm within 2 hours.</p>
            <div className="success-booking-id">
              Booking ID: <strong>{bookingId}</strong>
            </div>
            <div className="success-details">
              <div className="success-detail-item">
                <span>Car</span>
                <strong>{car.name}</strong>
              </div>
              <div className="success-detail-item">
                <span>Driver Option</span>
                <strong>{form.driverOption === 'with-driver' ? 'With Driver' : 'Self Drive'}</strong>
              </div>
              <div className="success-detail-item">
                <span>Duration</span>
                <strong>{form.duration} {form.durationType}</strong>
              </div>
              <div className="success-detail-item">
                <span>Total Amount</span>
                <strong className="success-price">৳{totalPrice.toLocaleString()}</strong>
              </div>
              <div className="success-detail-item">
                <span>Payment</span>
                <strong>{form.paymentMethod}</strong>
              </div>
            </div>
            <div className="success-actions">
              <Link to="/profile" className="btn btn-primary" id="success-profile-btn">
                View My Bookings
              </Link>
              <Link to="/cars" className="btn btn-secondary" id="success-cars-btn">
                Book Another Car
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="customer-site booking-page">
      {/* Header */}
      <div className="booking-header" id="booking-page-header">
        <div className="container">
          <button className="back-btn" onClick={() => navigate(-1)} id="booking-back-btn">
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="booking-title">Book — <span className="gradient-text">{car.name}</span></h1>

          {/* Steps */}
          <div className="booking-steps" id="booking-steps">
            {steps.map((s, i) => (
              <div key={s.number} className="booking-step-wrapper">
                <div className={`booking-step ${step >= s.number ? 'active' : ''} ${step > s.number ? 'done' : ''}`}>
                  <div className="step-circle">
                    {step > s.number ? <CheckCircle size={16} /> : s.number}
                  </div>
                  <span className="step-label">{s.label}</span>
                </div>
                {i < steps.length - 1 && <div className={`step-connector ${step > s.number ? 'active' : ''}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="booking-layout">
          {/* Form */}
          <div className="booking-form-section">

            {/* Step 1 */}
            {step === 1 && (
              <div className="booking-step-content animate-fadeInUp" id="booking-step-1">
                <h3 className="step-title">Choose Your Booking Options</h3>

                {/* Driver Option */}
                <div className="option-group">
                  <label className="option-group-label">Driver Option</label>
                  <div className="option-cards">
                    {[
                      { value: 'with-driver', label: 'With Driver', desc: 'Professional driver included', icon: '🚗' },
                      { value: 'self-drive', label: 'Self Drive', desc: 'You drive the car', icon: '🔑' },
                    ].map((opt) => (
                      <div
                        key={opt.value}
                        className={`option-card ${form.driverOption === opt.value ? 'active' : ''}`}
                        onClick={() => handleChange('driverOption', opt.value)}
                        id={`driver-option-${opt.value}`}
                      >
                        <span className="option-icon">{opt.icon}</span>
                        <div>
                          <p className="option-card-label">{opt.label}</p>
                          <p className="option-card-desc">{opt.desc}</p>
                        </div>
                        {form.driverOption === opt.value && <CheckCircle size={18} className="option-check" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration Type */}
                <div className="option-group">
                  <label className="option-group-label">Rental Duration Type</label>
                  <div className="duration-tabs">
                    {[
                      { value: 'days', label: 'Per Day', price: `৳${(form.driverOption === 'with-driver' ? car.priceWithDriver : car.pricePerDay).toLocaleString()}/day` },
                      { value: 'hours', label: 'Per Hour', price: `৳${car.pricePerHour.toLocaleString()}/hr` },
                    ].map((tab) => (
                      <button
                        key={tab.value}
                        className={`duration-tab ${form.durationType === tab.value ? 'active' : ''}`}
                        onClick={() => { handleChange('durationType', tab.value); handleChange('duration', 1); }}
                        id={`duration-tab-${tab.value}`}
                      >
                        <span className="duration-tab-label">{tab.label}</span>
                        <span className="duration-tab-price">{tab.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration Count */}
                <div className="option-group">
                  <label className="option-group-label">
                    Number of {form.durationType === 'days' ? 'Days' : 'Hours'}
                  </label>
                  <div className="duration-counter">
                    <button
                      className="counter-btn"
                      onClick={() => handleChange('duration', Math.max(1, form.duration - 1))}
                      id="duration-minus-btn"
                    >–</button>
                    <span className="counter-value">{form.duration}</span>
                    <button
                      className="counter-btn"
                      onClick={() => handleChange('duration', form.duration + 1)}
                      id="duration-plus-btn"
                    >+</button>
                  </div>
                </div>

                <button
                  className="btn btn-primary btn-lg step-next-btn"
                  onClick={() => setStep(2)}
                  id="step1-next-btn"
                >
                  Continue <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="booking-step-content animate-fadeInUp" id="booking-step-2">
                <h3 className="step-title">Enter Trip & Personal Details</h3>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Pickup Date *</label>
                    <input
                      type="date"
                      className="form-input"
                      value={form.startDate}
                      onChange={(e) => handleChange('startDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      id="pickup-date-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Pickup Time *</label>
                    <input
                      type="time"
                      className="form-input"
                      value={form.startTime}
                      onChange={(e) => handleChange('startTime', e.target.value)}
                      id="pickup-time-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Pickup Location *</label>
                  <select
                    className="form-select"
                    value={form.pickupLocation}
                    onChange={(e) => handleChange('pickupLocation', e.target.value)}
                    id="pickup-location-select"
                  >
                    <option value="">Select pickup location</option>
                    {pickupLocations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Drop Location *</label>
                  <input
                    type="text"
                    placeholder="Enter drop-off address"
                    className="form-input"
                    value={form.dropLocation}
                    onChange={(e) => handleChange('dropLocation', e.target.value)}
                    id="drop-location-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="form-input"
                    value={form.customerName}
                    onChange={(e) => handleChange('customerName', e.target.value)}
                    id="customer-name-input"
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      className="form-input"
                      value={form.customerPhone}
                      onChange={(e) => handleChange('customerPhone', e.target.value)}
                      id="customer-phone-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="form-input"
                      value={form.customerEmail}
                      onChange={(e) => handleChange('customerEmail', e.target.value)}
                      id="customer-email-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">NID / Passport (for self-drive)</label>
                  <input
                    type="text"
                    placeholder="NID or Passport number"
                    className="form-input"
                    value={form.nid}
                    onChange={(e) => handleChange('nid', e.target.value)}
                    id="nid-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Special Notes</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    placeholder="Any special requirements..."
                    value={form.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    id="notes-textarea"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <div className="step-actions">
                  <button className="btn btn-ghost" onClick={() => setStep(1)} id="step2-back-btn">← Back</button>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => setStep(3)}
                    id="step2-next-btn"
                  >
                    Proceed to Payment <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="booking-step-content animate-fadeInUp" id="booking-step-3">
                <h3 className="step-title">Payment Method</h3>

                <div className="payment-methods" id="payment-methods">
                  {[
                    { value: 'bKash', label: 'bKash Auto Checkout', color: '#e2136e', number: 'Fast & Secure', icon: '💗' },
                    { value: 'Card', label: 'Credit / Debit Card', color: '#5469d4', number: 'Visa, Mastercard', icon: '💳' },
                    { value: 'Cash', label: 'Cash on Delivery', color: '#22c55e', number: 'Pay on pickup', icon: '💵' },
                  ].map((method) => (
                    <div
                      key={method.value}
                      className={`payment-method-card ${form.paymentMethod === method.value ? 'active' : ''}`}
                      onClick={() => handleChange('paymentMethod', method.value)}
                      id={`payment-method-${method.value}`}
                    >
                      <span className="payment-method-icon">{method.icon}</span>
                      <div className="payment-method-info">
                        <p className="payment-method-name">{method.label}</p>
                        <p className="payment-method-number">{method.number}</p>
                      </div>
                      {form.paymentMethod === method.value && <CheckCircle size={18} className="payment-check" />}
                    </div>
                  ))}
                </div>

                {form.paymentMethod !== 'Cash' && (
                  <div className="payment-instruction" id="payment-instruction" style={{ background: form.paymentMethod === 'bKash' ? 'rgba(226, 19, 110, 0.1)' : 'rgba(84, 105, 212, 0.1)', borderColor: form.paymentMethod === 'bKash' ? 'rgba(226, 19, 110, 0.2)' : 'rgba(84, 105, 212, 0.2)' }}>
                    <div className="payment-instruction__icon">🔒</div>
                    <div>
                      <p className="payment-instruction__title">
                        Secure Gateway Payment
                      </p>
                      <p className="payment-instruction__desc">
                        You will be redirected to the secure {form.paymentMethod} gateway to complete your payment of <strong>৳{totalPrice.toLocaleString()}</strong>.
                      </p>
                    </div>
                  </div>
                )}

                <div className="security-note" id="security-note">
                  <Shield size={14} />
                  <span>Your booking is protected. Refund available if we can't fulfill your booking.</span>
                </div>

                <div className="step-actions">
                  <button className="btn btn-ghost" onClick={() => setStep(2)} id="step3-back-btn">← Back</button>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handleConfirmClick}
                    id="confirm-booking-btn"
                  >
                    <CheckCircle size={18} /> {form.paymentMethod === 'Cash' ? 'Confirm Booking' : `Pay ৳${totalPrice.toLocaleString()}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="booking-summary" id="booking-summary">
            <div className="summary-car-image">
              <img src={car.image} alt={car.name} />
            </div>
            <div className="summary-content">
              <p className="summary-brand">{car.brand} • {car.type}</p>
              <h3 className="summary-name">{car.name}</h3>
              <div className="summary-rating">
                <Star size={12} fill="currentColor" style={{ color: 'var(--gold-primary)' }} />
                <span>{car.rating} ({car.reviews} reviews)</span>
              </div>

              <div className="summary-divider" />

              <div className="summary-details">
                <div className="summary-detail-row">
                  <span>Driver Option</span>
                  <strong>{form.driverOption === 'with-driver' ? '🚗 With Driver' : '🔑 Self Drive'}</strong>
                </div>
                <div className="summary-detail-row">
                  <span>Duration</span>
                  <strong>{form.duration} {form.durationType}</strong>
                </div>
                {form.startDate && (
                  <div className="summary-detail-row">
                    <span>Start Date</span>
                    <strong>{form.startDate}</strong>
                  </div>
                )}
                {form.pickupLocation && (
                  <div className="summary-detail-row">
                    <span>Pickup</span>
                    <strong style={{ fontSize: '0.8rem' }}>{form.pickupLocation}</strong>
                  </div>
                )}
              </div>

              <div className="summary-divider" />

              <div className="summary-pricing">
                <div className="summary-price-row">
                  <span>Base Rate</span>
                  <span>৳{(form.driverOption === 'with-driver' ? car.priceWithDriver : form.durationType === 'days' ? car.pricePerDay : car.pricePerHour).toLocaleString()}/{form.durationType === 'days' ? 'day' : 'hr'}</span>
                </div>
                <div className="summary-price-row">
                  <span>Duration</span>
                  <span>× {form.duration}</span>
                </div>
                {isWeekend && (
                  <div className="summary-price-row" style={{ color: 'var(--color-warning)' }}>
                    <span>Weekend Surge (10%)</span>
                    <span>+ ৳{surgeAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="summary-price-row">
                  <span>Subtotal</span>
                  <span>৳{subtotal.toLocaleString()}</span>
                </div>
                {promoApplied && (
                  <div className="summary-price-row" style={{ color: 'var(--color-success)' }}>
                    <span>Discount ({discountPercent}%)</span>
                    <span>- ৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                
                {/* Promo Code Input */}
                {!promoApplied ? (
                  <div className="promo-code-box" style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                    <input 
                      type="text" 
                      placeholder="Promo Code" 
                      className="form-input" 
                      style={{ padding: '8px 12px', fontSize: '0.85rem', flex: 1 }}
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      id="promo-code-input"
                    />
                    <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={handleApplyPromo} id="apply-promo-btn">Apply</button>
                  </div>
                ) : (
                  <div className="promo-code-box" style={{ marginTop: '12px', padding: '10px 12px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: '600' }}>{promoMessage}</span>
                    <button onClick={() => {setPromoApplied(false); setPromoCode(''); setDiscountPercent(0); setPromoMessage('');}} style={{ background: 'transparent', border: 'none', color: 'var(--c-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>✕</button>
                  </div>
                )}
                
                {promoMessage && !promoApplied && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-error)', marginTop: '6px' }}>{promoMessage}</div>
                )}

                <div className="summary-divider" />
                <div className="summary-price-total">
                  <span>Total Amount</span>
                  <span className="summary-total-value">৳{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="summary-features">
                <div className="summary-feature-item"><CheckCircle size={12} /> Free Cancellation (24hr notice)</div>
                <div className="summary-feature-item"><CheckCircle size={12} /> Instant Confirmation</div>
                <div className="summary-feature-item"><CheckCircle size={12} /> 24/7 Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal Overlay */}
      {showPaymentModal && (
        <div className="payment-modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div className="payment-modal-content animate-fadeInUp" style={{ background: form.paymentMethod === 'bKash' ? '#e2136e' : '#1a1f36', width: '90%', maxWidth: '400px', borderRadius: '12px', padding: '0', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', position: 'relative' }}>
            {form.paymentMethod === 'bKash' && (
              <div style={{ color: 'white' }}>
                <div style={{ padding: '24px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 800 }}>bKash</h2>
                  <p style={{ margin: '8px 0 0', opacity: 0.9 }}>DriveBD Checkout</p>
                  <h3 style={{ margin: '16px 0 0', fontSize: '28px' }}>৳{totalPrice.toLocaleString()}</h3>
                </div>
                <div style={{ padding: '24px' }}>
                  {modalStep === 1 ? (
                    <>
                      <p style={{ marginBottom: '8px', fontSize: '14px' }}>Enter bKash Account Number</p>
                      <input type="text" placeholder="e.g 017XXXXXXXX" style={{ width: '100%', padding: '12px', borderRadius: '4px', border: 'none', marginBottom: '16px', fontSize: '16px', color: '#000' }} />
                      <button onClick={() => setModalStep(2)} style={{ width: '100%', padding: '12px', background: '#fff', color: '#e2136e', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Proceed</button>
                    </>
                  ) : modalStep === 2 ? (
                    <>
                      <p style={{ marginBottom: '8px', fontSize: '14px' }}>Enter bKash PIN</p>
                      <input type="password" placeholder="••••" style={{ width: '100%', padding: '12px', borderRadius: '4px', border: 'none', marginBottom: '16px', fontSize: '16px', color: '#000' }} />
                      <button onClick={() => { setModalStep(3); setTimeout(handleSubmit, 1500); }} style={{ width: '100%', padding: '12px', background: '#fff', color: '#e2136e', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Confirm Payment</button>
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                      <p style={{ fontWeight: 600, fontSize: '1.2rem' }}>Processing Payment...</p>
                      <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '8px' }}>Please do not close this window.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {form.paymentMethod === 'Card' && (
              <div style={{ color: 'white' }}>
                <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <h2 style={{ margin: 0, fontSize: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span>Secure Checkout</span> <span>৳{totalPrice.toLocaleString()}</span></h2>
                </div>
                <div style={{ padding: '24px' }}>
                  {modalStep === 1 ? (
                    <>
                      <input type="text" placeholder="Card Number" style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white', marginBottom: '16px', fontSize: '16px', boxSizing: 'border-box' }} />
                      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                        <input type="text" placeholder="MM/YY" style={{ flex: 1, padding: '12px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '16px', minWidth: 0 }} />
                        <input type="text" placeholder="CVC" style={{ flex: 1, padding: '12px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '16px', minWidth: 0 }} />
                      </div>
                      <button onClick={() => { setModalStep(3); setTimeout(handleSubmit, 1500); }} style={{ width: '100%', padding: '14px', background: '#5469d4', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>Pay ৳{totalPrice.toLocaleString()}</button>
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                      <p style={{ fontWeight: 600, fontSize: '1.2rem' }}>Authenticating...</p>
                      <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '8px' }}>Contacting your bank.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {modalStep !== 3 && (
              <button onClick={() => setShowPaymentModal(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer', opacity: 0.6 }}>×</button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default BookingPage;
