import { useState } from 'react';
import { 
  Navigation, Phone, MapPin, Play, Square, Settings, User
} from 'lucide-react';
import './DriverPortalPage.css';

const DriverPortalPage = () => {
  const [tripStatus, setTripStatus] = useState('pending'); // pending, active, completed

  return (
    <div className="driver-portal">
      {/* Header */}
      <header className="driver-header">
        <div className="driver-header-user">
          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" alt="Driver" className="driver-avatar" />
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', color: '#fff' }}>Karim Hossain</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-success)' }}></div>
              Online
            </span>
          </div>
        </div>
        <button style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
          <Settings size={20} />
        </button>
      </header>

      {/* Map Area */}
      <div className="driver-map-container">
        {/* Mock Map Image */}
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80" 
          alt="Map" 
          className="map-bg" 
          style={{ filter: 'grayscale(100%) invert(90%) brightness(0.6)' }} 
        />
        
        {tripStatus !== 'completed' && (
          <div className="map-pin">
            <div className="map-pin-label">{tripStatus === 'pending' ? 'Pickup' : 'Drop-off'}</div>
          </div>
        )}
      </div>

      {/* Trip Control Panel */}
      <div className="trip-panel animate-fadeInUp">
        {tripStatus === 'completed' ? (
          <div style={{ textAlign: 'center', padding: '20px 0', color: '#fff' }}>
            <div style={{ width: '60px', height: '60px', background: 'rgba(34, 197, 94, 0.1)', color: 'var(--color-success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <User size={32} />
            </div>
            <h3 style={{ margin: '0 0 8px' }}>Waiting for next trip...</h3>
            <p style={{ color: 'var(--c-text-muted)', margin: 0 }}>Stay online to receive booking requests.</p>
          </div>
        ) : (
          <>
            <div className="trip-status-badge">
              <span className="pulse-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'currentColor' }}></span>
              {tripStatus === 'pending' ? 'Passenger Waiting' : 'Trip in Progress'}
            </div>

            <div className="trip-details">
              <div className="trip-customer">
                <div style={{ width: '40px', height: '40px', background: 'var(--c-bg-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <User size={20} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '1.1rem', color: '#fff' }}>Farhan Ahmed</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--c-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> Hazrat Shahjalal Airport</p>
                </div>
              </div>
              <h2 style={{ margin: 0, color: 'var(--gold-primary)' }}>৳2,500</h2>
            </div>

            <div className="trip-actions">
              {tripStatus === 'pending' ? (
                <button className="trip-btn-large btn-start" onClick={() => setTripStatus('active')} style={{ gridColumn: 'span 2' }}>
                  <Play size={20} /> Start Trip
                </button>
              ) : (
                <button className="trip-btn-large btn-end" onClick={() => setTripStatus('completed')} style={{ gridColumn: 'span 2' }}>
                  <Square size={20} /> End Trip
                </button>
              )}
              
              <button className="trip-btn-large btn-nav">
                <Navigation size={18} /> Navigate
              </button>
              <button className="trip-btn-large btn-call">
                <Phone size={18} /> Call
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DriverPortalPage;
