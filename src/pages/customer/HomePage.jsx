import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, Star, Shield, Clock, MapPin, Users,
  ChevronRight, CheckCircle, Zap, Award, Phone, Car,
  TrendingUp, Globe, HeartHandshake, Key, Calendar
} from 'lucide-react';
import CarCard from '../../components/customer/CarCard';
import { cars, reviews } from '../../data/mockData';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [pickupLocation, setPickupLocation] = useState('');
  const [bookingType, setBookingType] = useState('with-driver');
  const [pickupDateTime, setPickupDateTime] = useState('');
  const [returnDateTime, setReturnDateTime] = useState('');
  const [currentReview, setCurrentReview] = useState(0);

  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const featuredCars = cars.filter((c) => c.available).slice(0, 4);

  const handleQuickSearch = (e) => {
    e.preventDefault();
    navigate('/cars');
  };



  const stats = [
    { value: '500+', label: 'Happy Clients' },
    { value: '50+', label: 'Premium Cars' },
    { value: '10K+', label: 'Trips Completed' },
    { value: '4.9★', label: 'Average Rating' },
  ];

  const howItWorks = [
    {
      step: '01',
      icon: <Car size={28} />,
      title: 'Choose Your Car',
      desc: 'Browse our premium fleet. Filter by type, price, location, and availability.',
    },
    {
      step: '02',
      icon: <MapPin size={28} />,
      title: 'Set Your Route',
      desc: 'Select pickup & drop location. Choose "With Driver" or "Self Drive" option.',
    },
    {
      step: '03',
      icon: <Zap size={28} />,
      title: 'Confirm & Pay',
      desc: 'Get dynamic pricing instantly. Pay via Cash, bKash, or Nagad — easy & secure.',
    },
    {
      step: '04',
      icon: <CheckCircle size={28} />,
      title: 'Enjoy Your Ride',
      desc: 'Sit back and relax. Track your booking status from your profile anytime.',
    },
  ];

  return (
    <div className="customer-site home-page">
      {/* ========== HERO ========== */}
      <section className="hero" id="hero">
        {/* Background elements */}
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="hero-glow hero-glow--1" />
          <div className="hero-glow hero-glow--2" />
          <div className="hero-grid" />
        </div>

        <div className="container">
          <div className="hero-content">
            <div className="hero-text animate-fadeInUp">
              <div className="section-tag">
                <Star size={12} fill="currentColor" /> Bangladesh's #1 Car Rental Platform
              </div>
              <h1 className="hero-title">
                Drive in <span className="gradient-text">Luxury</span>,<br />
                Travel Without Limits
              </h1>
              <p className="hero-subtitle">
                Book premium cars with or without driver. Transparent pricing, instant confirmation,
                and 24/7 support across Bangladesh.
              </p>

              {/* Quick Search Widget */}
              <div className="premium-search-container animate-fadeInUp delay-200">
                {/* Segmented Booking Type Tabs */}
                <div className="search-tabs">
                  <button
                    type="button"
                    className={`search-tab ${bookingType === 'with-driver' ? 'active' : ''}`}
                    onClick={() => setBookingType('with-driver')}
                    id="tab-with-driver"
                  >
                    <Car size={15} />
                    <span>With Driver</span>
                  </button>
                  <button
                    type="button"
                    className={`search-tab ${bookingType === 'self-drive' ? 'active' : ''}`}
                    onClick={() => setBookingType('self-drive')}
                    id="tab-self-drive"
                  >
                    <Key size={15} />
                    <span>Self Drive</span>
                  </button>
                </div>

                <form className="hero-search-premium" onSubmit={handleQuickSearch} id="hero-search-form">
                  {/* Location Field */}
                  <div className="search-field-group">
                    <label className="hero-search-label">Pickup Location</label>
                    <select
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="hero-search-input"
                      id="hero-pickup-location"
                    >
                      <option value="">Select City</option>
                      {['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna'].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Pickup Date & Time Field */}
                  <div className="search-field-group">
                    <label className="hero-search-label">Pickup Date & Time</label>
                    <input
                      type="datetime-local"
                      value={pickupDateTime}
                      onChange={(e) => setPickupDateTime(e.target.value)}
                      className="hero-search-input"
                      id="hero-pickup-date-time"
                      min={new Date().toISOString().slice(0, 16)}
                    />
                  </div>

                  {/* Return Date & Time Field */}
                  <div className="search-field-group">
                    <label className="hero-search-label">Return Date & Time</label>
                    <input
                      type="datetime-local"
                      value={returnDateTime}
                      onChange={(e) => setReturnDateTime(e.target.value)}
                      className="hero-search-input"
                      id="hero-return-date-time"
                      min={pickupDateTime || new Date().toISOString().slice(0, 16)}
                    />
                  </div>

                  {/* Search CTA Button */}
                  <button type="submit" className="search-submit-btn" id="hero-search-btn">
                    <span>Search Cars</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              </div>

              <div className="hero-trust">
                {['No Hidden Charges', 'Free Cancellation', '24/7 Support'].map((item) => (
                  <div key={item} className="hero-trust-item">
                    <CheckCircle size={14} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Car Image */}
            <div className="hero-visual animate-fadeInUp delay-300">
              <div className="hero-car-card">
                <img
                  src="https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=900&q=80"
                  alt="Premium Car"
                  className="hero-car-img animate-float"
                />
                {/* Floating Info Cards */}
                <div className="hero-float-card hero-float-card--rating" id="hero-rating-card">
                  <Star size={16} fill="currentColor" style={{ color: 'var(--gold-primary)' }} />
                  <div>
                    <p className="float-card-value">4.9/5</p>
                    <p className="float-card-label">Customer Rating</p>
                  </div>
                </div>
                <div className="hero-float-card hero-float-card--trips" id="hero-trips-card">
                  <TrendingUp size={16} style={{ color: 'var(--color-success)' }} />
                  <div>
                    <p className="float-card-value">10,000+</p>
                    <p className="float-card-label">Trips Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="hero-stats" id="hero-stats">
          <div className="container">
            <div className="stats-grid">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-item">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="how-it-works section" id="how-it-works">
        <div className="container">
          <div className="section-header text-center">
            <div className="section-tag">
              <Zap size={12} /> Simple Process
            </div>
            <h2 className="section-title">How It <span className="gradient-text">Works</span></h2>
            <p className="section-subtitle mx-auto">
              From selection to destination — your seamless car rental experience in 4 easy steps.
            </p>
          </div>

          <div className="how-grid">
            {howItWorks.map((step, i) => (
              <div key={step.step} className={`how-card animate-fadeInUp delay-${(i + 1) * 100}`} id={`how-step-${i + 1}`}>
                <div className="how-card__step-number">{step.step}</div>
                <div className="how-card__icon">{step.icon}</div>
                <h3 className="how-card__title">{step.title}</h3>
                <p className="how-card__desc">{step.desc}</p>
                {i < howItWorks.length - 1 && (
                  <div className="how-card__arrow">
                    <ChevronRight size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURED CARS ========== */}
      <section className="featured-cars section" id="featured-cars">
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="section-tag"><Car size={12} /> Our Fleet</div>
              <h2 className="section-title">Featured <span className="gradient-text">Vehicles</span></h2>
            </div>
            <Link to="/cars" className="btn btn-secondary" id="view-all-cars-btn">
              View All Cars <ArrowRight size={16} />
            </Link>
          </div>

          <div className="cars-grid">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} featured />
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHY CHOOSE US ========== */}
      <section className="why-us section" id="why-us">
        <div className="container">
          <div className="why-us-inner">
            <div className="why-us-content">
              <div className="section-tag"><Award size={12} /> Why Choose Us</div>
              <h2 className="section-title">The Smarter Way to<br /><span className="gradient-text">Rent a Car</span></h2>
              <p className="section-subtitle">
                We combine technology with premium service to give you the best car rental experience in Bangladesh.
              </p>
              <div className="why-features">
                {[
                  { icon: <Shield size={20} />, title: 'Fully Verified Drivers', desc: 'All drivers are background-checked, licensed, and trained for professional service.' },
                  { icon: <Clock size={20} />, title: '24/7 Customer Support', desc: 'Round-the-clock support via phone, WhatsApp, and in-app chat.' },
                  { icon: <Globe size={20} />, title: 'City-Wide Coverage', desc: 'Available in Dhaka, Chittagong, Sylhet, Rajshahi, Khulna and more.' },
                  { icon: <HeartHandshake size={20} />, title: 'Transparent Pricing', desc: 'No hidden fees. What you see is exactly what you pay.' },
                ].map((f) => (
                  <div key={f.title} className="why-feature">
                    <div className="why-feature__icon">{f.icon}</div>
                    <div>
                      <h4 className="why-feature__title">{f.title}</h4>
                      <p className="why-feature__desc">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/cars" className="btn btn-primary" id="why-us-book-btn">
                Book Your Car <ArrowRight size={16} />
              </Link>
            </div>
            <div className="why-us-image">
              <div className="why-us-img-wrapper">
                <img src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=700&q=80" alt="Premium Car Service" />
                <div className="why-us-badge" id="why-us-badge">
                  <Users size={18} />
                  <div>
                    <p className="badge-stat">500+</p>
                    <p className="badge-label">Happy Clients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ========== TESTIMONIALS ========== */}
      <section className="testimonials section" id="testimonials">
        <div className="container">
          <div className="section-header text-center">
            <div className="section-tag"><Star size={12} fill="currentColor" /> Testimonials</div>
            <h2 className="section-title">What Our <span className="gradient-text">Clients Say</span></h2>
          </div>

          <div className="testimonials-grid">
            {reviews.map((review, i) => (
              <div
                key={review.id}
                className={`testimonial-card ${i === currentReview ? 'active' : ''}`}
                id={`testimonial-${review.id}`}
              >
                <div className="testimonial-stars">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial-text">"{review.comment}"</p>
                <div className="testimonial-author">
                  <img src={review.avatar} alt={review.customerName} className="testimonial-avatar" />
                  <div>
                    <p className="testimonial-name">{review.customerName}</p>
                    <p className="testimonial-car">{review.car}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="testimonial-dots">
            {reviews.map((_, i) => (
              <button
                key={i}
                className={`testimonial-dot ${i === currentReview ? 'active' : ''}`}
                onClick={() => setCurrentReview(i)}
                id={`testimonial-dot-${i}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="cta-section section" id="cta-section">
        <div className="container">
          <div className="cta-inner">
            <div className="cta-glow" />
            <div className="section-tag mx-auto"><Car size={12} /> Start Your Journey</div>
            <h2 className="section-title text-center">
              Ready to Experience<br /><span className="gradient-text">Luxury on Wheels?</span>
            </h2>
            <p className="section-subtitle text-center mx-auto">
              Book your premium car today. Choose self-drive or professional driver service for a safe, comfortable, and memorable trip.
            </p>
            <div className="cta-actions">
              <Link to="/cars" className="btn btn-primary btn-lg" id="cta-book-now-btn">
                Book a Car Now <ArrowRight size={18} />
              </Link>
              <a href="tel:+8801700000000" className="btn btn-secondary btn-lg" id="cta-call-btn">
                <Phone size={18} /> Call +880 1700-000000
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
