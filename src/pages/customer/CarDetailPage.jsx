import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star, Users, Fuel, Settings2, MapPin, Calendar, Compass,
  Activity, ShieldCheck, HelpCircle, ArrowLeft, CheckCircle,
  MessageSquare, Sparkles, Award
} from 'lucide-react';
import { cars, reviews } from '../../data/mockData';
import './CarDetailPage.css';

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find((c) => c.id === Number(id));
  const [activeImage, setActiveImage] = useState(car ? car.image : '');
  const [activeTab, setActiveTab] = useState('specs'); // specs, features, reviews

  if (!car) {
    return (
      <div className="customer-site" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'var(--c-text-secondary)' }}>
          <h2>Car Not Found</h2>
          <button className="btn btn-primary" onClick={() => navigate('/cars')} style={{ marginTop: '16px' }}>
            Back to Cars
          </button>
        </div>
      </div>
    );
  }

  // Filter reviews for this specific car type or brand just for representation
  const carReviews = reviews.filter((r) => r.car === car.name || car.name.includes(r.car));

  return (
    <div className="customer-site car-detail-page">
      {/* Background Glow */}
      <div className="detail-bg-glow" />

      <div className="container">
        {/* Back Link */}
        <button className="detail-back-btn" onClick={() => navigate('/cars')} id="detail-back-btn">
          <ArrowLeft size={16} /> Back to Fleet
        </button>

        {/* main layout */}
        <div className="detail-layout">
          {/* Left Column: Gallery & Details */}
          <div className="detail-main-content">
            {/* Title / Header */}
            <div className="detail-header" id="detail-header">
              <div className="detail-header-left">
                <span className="badge badge-gold">{car.type}</span>
                <h1 className="detail-title">{car.name}</h1>
                <div className="detail-meta">
                  <div className="detail-rating">
                    <Star size={14} fill="currentColor" className="star-filled" />
                    <span>{car.rating} ({car.reviews} reviews)</span>
                  </div>
                  <span className="meta-separator">•</span>
                  <div className="detail-location">
                    <MapPin size={14} />
                    <span>{car.location}, Bangladesh</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="detail-gallery" id="detail-gallery">
              <div className="gallery-main-wrapper">
                <img
                  src={activeImage || car.image}
                  alt={car.name}
                  className="gallery-main-img"
                  onError={(e) => {
                    e.target.src = `https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80`;
                  }}
                />
                <span className={`gallery-status-badge ${car.available ? 'status-avail' : 'status-booked'}`}>
                  {car.available ? 'Available' : 'Booked'}
                </span>
              </div>
              <div className="gallery-thumbnails">
                {(car.images || [car.image]).map((img, idx) => (
                  <div
                    key={idx}
                    className={`gallery-thumb ${activeImage === img || (!activeImage && idx === 0) ? 'active' : ''}`}
                    onClick={() => setActiveImage(img)}
                  >
                    <img src={img} alt={`${car.name} view ${idx + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Content Tabs */}
            <div className="detail-tabs-container">
              <div className="detail-tabs">
                <button
                  className={`detail-tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('specs')}
                  id="tab-btn-specs"
                >
                  <Activity size={16} /> Specifications
                </button>
                <button
                  className={`detail-tab-btn ${activeTab === 'features' ? 'active' : ''}`}
                  onClick={() => setActiveTab('features')}
                  id="tab-btn-features"
                >
                  <Sparkles size={16} /> Premium Features
                </button>
                <button
                  className={`detail-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                  onClick={() => setActiveTab('reviews')}
                  id="tab-btn-reviews"
                >
                  <MessageSquare size={16} /> Customer Reviews ({carReviews.length || 3})
                </button>
              </div>

              <div className="detail-tab-content">
                {/* Tab: Specs */}
                {activeTab === 'specs' && (
                  <div className="specs-grid animate-fadeIn" id="specs-content">
                    <div className="spec-card">
                      <Users className="spec-icon" />
                      <div className="spec-info">
                        <span className="spec-label">Capacity</span>
                        <span className="spec-value">{car.seats} Passenger Seats</span>
                      </div>
                    </div>
                    <div className="spec-card">
                      <Fuel className="spec-icon" />
                      <div className="spec-info">
                        <span className="spec-label">Fuel Type</span>
                        <span className="spec-value">{car.fuel}</span>
                      </div>
                    </div>
                    <div className="spec-card">
                      <Settings2 className="spec-icon" />
                      <div className="spec-info">
                        <span className="spec-label">Transmission</span>
                        <span className="spec-value">{car.transmission}</span>
                      </div>
                    </div>
                    <div className="spec-card">
                      <Calendar className="spec-icon" />
                      <div className="spec-info">
                        <span className="spec-label">Year Model</span>
                        <span className="spec-value">{car.model} Edition</span>
                      </div>
                    </div>
                    <div className="spec-card">
                      <Compass className="spec-icon" />
                      <div className="spec-info">
                        <span className="spec-label">Mileage</span>
                        <span className="spec-value">{car.mileage || '12 km/L'}</span>
                      </div>
                    </div>
                    <div className="spec-card">
                      <Award className="spec-icon" />
                      <div className="spec-info">
                        <span className="spec-label">License Plate</span>
                        <span className="spec-value">{car.plate || 'DHAKA-METRO'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Features */}
                {activeTab === 'features' && (
                  <div className="features-list animate-fadeIn" id="features-content">
                    <div className="features-grid">
                      {car.features.map((feature, index) => (
                        <div key={index} className="feature-item">
                          <CheckCircle className="feature-check" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      <div className="feature-item">
                        <CheckCircle className="feature-check" />
                        <span>Dual-Zone Climate Control AC</span>
                      </div>
                      <div className="feature-item">
                        <CheckCircle className="feature-check" />
                        <span>Dual Front & Side Airbags</span>
                      </div>
                      <div className="feature-item">
                        <CheckCircle className="feature-check" />
                        <span>24/7 Roadside Assistance Covered</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Reviews */}
                {activeTab === 'reviews' && (
                  <div className="reviews-section animate-fadeIn" id="reviews-content">
                    {carReviews.length > 0 ? (
                      <div className="reviews-list-block">
                        {carReviews.map((rev) => (
                          <div key={rev.id} className="review-item-card">
                            <div className="review-user-header">
                              <img src={rev.avatar} alt={rev.customerName} className="review-avatar" />
                              <div className="review-user-info">
                                <h4 className="review-user-name">{rev.customerName}</h4>
                                <span className="review-date">{rev.date}</span>
                              </div>
                              <div className="review-rating-stars">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    size={12}
                                    fill={i < rev.rating ? 'var(--gold-primary)' : 'none'}
                                    stroke={i < rev.rating ? 'var(--gold-primary)' : 'currentColor'}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="review-comment">"{rev.comment}"</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="reviews-list-block">
                        {/* Fallback to custom placeholder reviews if no match */}
                        {[
                          {
                            id: 1,
                            name: 'Tanvir Ahmed',
                            date: '2024-12-14',
                            rating: 5,
                            text: 'The absolute best car rental service in Dhaka. Smooth booking, premium vehicle, and top notch service.'
                          },
                          {
                            id: 2,
                            name: 'Nusrat Jahan',
                            date: '2024-11-28',
                            rating: 5,
                            text: 'Super high quality and professional driver. Highly recommended for corporate events and personal tours.'
                          }
                        ].map((rev) => (
                          <div key={rev.id} className="review-item-card">
                            <div className="review-user-header">
                              <div className="review-avatar-text">{rev.name.charAt(0)}</div>
                              <div className="review-user-info">
                                <h4 className="review-user-name">{rev.name}</h4>
                                <span className="review-date">{rev.date}</span>
                              </div>
                              <div className="review-rating-stars">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    size={12}
                                    fill={i < rev.rating ? 'var(--gold-primary)' : 'none'}
                                    stroke={i < rev.rating ? 'var(--gold-primary)' : 'currentColor'}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="review-comment">"{rev.text}"</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="detail-desc-block">
              <h3 className="desc-title">About this Vehicle</h3>
              <p className="desc-text">{car.description}</p>
            </div>
          </div>

          {/* Right Column: Floating Pricing & Booking Action */}
          <div className="detail-sidebar">
            <div className="pricing-sticky-card">
              <div className="sticky-price-header">
                <span className="price-tag-label">Pricing Options</span>
                <div className="sticky-price-row">
                  <span className="price-num">৳{car.pricePerDay.toLocaleString()}</span>
                  <span className="price-unit">/ day (Self Drive)</span>
                </div>
              </div>

              <div className="sticky-divider" />

              <div className="pricing-breakdown">
                <div className="pricing-opt-row">
                  <span>Standard Per Day</span>
                  <strong>৳{car.pricePerDay.toLocaleString()}</strong>
                </div>
                <div className="pricing-opt-row">
                  <span>Hourly Rate</span>
                  <strong>৳{car.pricePerHour.toLocaleString()}</strong>
                </div>
                <div className="pricing-opt-row spotlight">
                  <span>With Chauffeur</span>
                  <strong>৳{car.priceWithDriver.toLocaleString()} / day</strong>
                </div>
              </div>

              <div className="safety-guarantee">
                <div className="safety-item">
                  <ShieldCheck size={16} />
                  <span>Fully Sanitized Fleet</span>
                </div>
                <div className="safety-item">
                  <ShieldCheck size={16} />
                  <span>24/7 Support in BD</span>
                </div>
                <div className="safety-item">
                  <ShieldCheck size={16} />
                  <span>Zero Hidden Charges</span>
                </div>
              </div>

              {car.available ? (
                <Link
                  to={`/booking/${car.id}`}
                  className="btn btn-primary btn-lg sticky-book-btn"
                  id="detail-book-now-btn"
                >
                  Book This Vehicle
                </Link>
              ) : (
                <button
                  className="btn btn-ghost btn-lg sticky-book-btn disabled"
                  disabled
                  id="detail-booked-btn"
                >
                  Currently Booked
                </button>
              )}

              <div className="booking-help">
                <HelpCircle size={14} />
                <span>Need help? Call us at <strong>09612-445566</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
