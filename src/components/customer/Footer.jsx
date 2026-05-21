import { Link } from 'react-router-dom';
import {
  Car, Phone, Mail, MapPin, ArrowRight, Shield, Clock, Star
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="site-footer">
      {/* CTA Banner */}
      <div className="footer-cta" id="footer-cta">
        <div className="container">
          <div className="footer-cta-content">
            <div className="footer-cta-text">
              <h3>Ready for Your Next Journey?</h3>
              <p>Book your premium car today and experience world-class travel in Bangladesh.</p>
            </div>
            <div className="footer-cta-actions">
              <Link to="/cars" className="btn btn-primary" id="footer-book-btn">
                Book a Car <ArrowRight size={16} />
              </Link>
              <a href="tel:+8801700000000" className="btn btn-secondary" id="footer-call-btn">
                <Phone size={16} /> Call Us Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand" id="footer-brand">
              <Link to="/" className="footer-logo">
                <div className="logo-icon">
                  <Car size={20} strokeWidth={2.5} />
                </div>
                <div className="logo-text">
                  <span className="logo-brand">Drive</span>
                  <span className="logo-accent">BD</span>
                </div>
              </Link>
              <p className="footer-desc">
                Bangladesh's most trusted car rental platform. Premium vehicles, professional drivers,
                and seamless booking experience since 2018.
              </p>
              <div className="footer-badges">
                <div className="footer-badge">
                  <Shield size={14} />
                  <span>Verified Drivers</span>
                </div>
                <div className="footer-badge">
                  <Star size={14} />
                  <span>4.9★ Rated</span>
                </div>
                <div className="footer-badge">
                  <Clock size={14} />
                  <span>24/7 Support</span>
                </div>
              </div>
              <div className="footer-socials">
                <a href="#" className="social-link" id="footer-facebook" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" className="social-link" id="footer-instagram" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" className="social-link" id="footer-youtube" aria-label="YouTube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg>
                </a>
                <a href="#" className="social-link" id="footer-twitter" aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col" id="footer-quick-links">
              <h4 className="footer-col-title">Quick Links</h4>
              <ul className="footer-links">
                {[
                  { label: 'Our Fleet', path: '/cars' },
                  { label: 'Book a Car', path: '/cars' },
                  { label: 'My Bookings', path: '/profile' },
                  { label: 'Driver App (Demo)', path: '/driver' },
                  { label: 'About Us', path: '/#about' },
                  { label: 'Contact Us', path: '/#contact' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="footer-link">
                      <ArrowRight size={12} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="footer-col" id="footer-services">
              <h4 className="footer-col-title">Our Services</h4>
              <ul className="footer-links">
                {[
                  'Airport Transfer',
                  'Corporate Rentals',
                  'Wedding Cars',
                  'City Tour',
                  'Self Drive',
                  'Long Trip Package',
                  'Driver with Car',
                  'Group Transport',
                ].map((service) => (
                  <li key={service}>
                    <a href="#" className="footer-link">
                      <ArrowRight size={12} />
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-col" id="footer-contact">
              <h4 className="footer-col-title">Contact Info</h4>
              <div className="footer-contact-list">
                <div className="footer-contact-item">
                  <div className="contact-icon"><Phone size={15} /></div>
                  <div>
                    <p className="contact-label">Call / WhatsApp</p>
                    <a href="tel:+8801700000000" className="contact-value">+880 1700-000000</a>
                    <a href="tel:+8801800000000" className="contact-value">+880 1800-000000</a>
                  </div>
                </div>
                <div className="footer-contact-item">
                  <div className="contact-icon"><Mail size={15} /></div>
                  <div>
                    <p className="contact-label">Email</p>
                    <a href="mailto:info@drivebd.com" className="contact-value">info@drivebd.com</a>
                    <a href="mailto:booking@drivebd.com" className="contact-value">booking@drivebd.com</a>
                  </div>
                </div>
                <div className="footer-contact-item">
                  <div className="contact-icon"><MapPin size={15} /></div>
                  <div>
                    <p className="contact-label">Office</p>
                    <p className="contact-value">House 45, Road 11, Block C<br />Banani, Dhaka-1213</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom" id="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <p>© 2024 DriveBD. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
