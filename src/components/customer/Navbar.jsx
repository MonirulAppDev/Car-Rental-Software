import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Car, Menu, X, User, ChevronDown, Phone, LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Demo: user is "logged in"
  const user = { name: 'Farhan Ahmed', avatar: null };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Our Fleet', path: '/cars' },
    { label: 'About', path: '/#about' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="main-navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo" id="navbar-logo">
          <div className="logo-icon">
            <Car size={20} strokeWidth={2.5} />
          </div>
          <div className="logo-text">
            <span className="logo-brand">Drive</span>
            <span className="logo-accent">BD</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="navbar-links" id="navbar-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="navbar-actions">
          <a href="tel:+8801700000000" className="navbar-phone hide-mobile" id="navbar-phone">
            <Phone size={14} />
            <span>01700-000000</span>
          </a>

          {/* Profile Dropdown */}
          <div className="profile-dropdown" id="profile-dropdown">
            <button
              className="profile-trigger"
              onClick={() => setProfileOpen(!profileOpen)}
              id="profile-trigger-btn"
            >
              <div className="avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  <span>{user.name.charAt(0)}</span>
                )}
              </div>
              <span className="profile-name hide-mobile">{user.name.split(' ')[0]}</span>
              <ChevronDown size={14} className={`chevron ${profileOpen ? 'rotated' : ''}`} />
            </button>

            {profileOpen && (
              <div className="dropdown-menu" id="profile-dropdown-menu">
                <div className="dropdown-header">
                  <p className="dropdown-user-name">{user.name}</p>
                  <p className="dropdown-user-email">farhan@email.com</p>
                </div>
                <div className="dropdown-divider" />
                <Link to="/profile" className="dropdown-item" id="dropdown-profile-link">
                  <User size={15} /> My Profile
                </Link>
                <Link to="/profile#bookings" className="dropdown-item" id="dropdown-bookings-link">
                  <Car size={15} /> My Bookings
                </Link>
                <div className="dropdown-divider" />
                <button className="dropdown-item danger" id="dropdown-logout-btn">
                  <LogOut size={15} /> Logout
                </button>
              </div>
            )}
          </div>

          <button className="btn btn-primary btn-sm" onClick={() => navigate('/cars')} id="navbar-book-btn">
            Book Now
          </button>

          {/* Mobile Toggle */}
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            id="mobile-menu-toggle"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu" id="mobile-menu">
          <ul className="mobile-nav-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mobile-menu-actions">
            <Link to="/profile" className="btn btn-ghost btn-sm">My Profile</Link>
            <Link to="/cars" className="btn btn-primary btn-sm">Book Now</Link>
          </div>
          <a href="tel:+8801700000000" className="mobile-phone">
            <Phone size={16} /> 01700-000000
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
