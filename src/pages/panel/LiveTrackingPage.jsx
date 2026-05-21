import { useState } from 'react';
import { useDispatchContext } from '../../context/DispatchContext';
import { CarFront, X, Navigation, Battery, Fuel, Phone, MapPin } from 'lucide-react';
import './LiveTrackingPage.css';

const LiveTrackingPage = () => {
  const { bookings } = useDispatchContext();
  const [activeCarId, setActiveCarId] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);

  // Filter only ongoing trips to show on map
  const activeTrips = bookings.filter(trip => trip.status === 'Ongoing');

  // Hardcoded coordinates for the demo since we don't have real GPS data
  const coordinates = [
    { top: '35%', left: '45%' },
    { top: '65%', left: '60%' },
    { top: '25%', left: '75%' },
  ];

  const handleMarkerClick = (tripId, e) => {
    e.stopPropagation();
    setActiveCarId(activeCarId === tripId ? null : tripId);
  };

  const closeMapActions = () => {
    setActiveCarId(null);
  };

  return (
    <div className="animate-fadeIn" onClick={closeMapActions}>
      <div className="panel-page-header" style={{ marginBottom: '20px' }}>
        <div>
          <h1 className="panel-page-title">Live GPS Tracking</h1>
          <p className="panel-page-subtitle">Real-time location of active vehicles</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="status-badge status-busy">
            <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#3b82f6', borderRadius: '50%', marginRight: '5px', animation: 'ping 2s infinite' }}></span>
            {activeTrips.length} Active Vehicles
          </span>
        </div>
      </div>

      <div className="tracking-page-container">
        <div className="map-background"></div>
        
        {/* Render Map Markers */}
        {activeTrips.map((trip, idx) => {
          const coord = coordinates[idx % coordinates.length];
          const isActive = activeCarId === trip.id;
          
          return (
            <div 
              key={trip.id} 
              className={`car-marker ${isActive ? 'active' : ''}`}
              style={{ top: coord.top, left: coord.left }}
              onClick={(e) => handleMarkerClick(trip.id, e)}
            >
              <div className="car-ping"></div>
              <div className="car-icon-wrap">
                <CarFront size={18} color="#94a3b8" />
              </div>

              {/* Short Details Tooltip */}
              <div className="marker-tooltip" onClick={(e) => e.stopPropagation()}>
                <div className="tooltip-header">
                  <h4>{trip.carName.split('(')[0].trim()}</h4>
                  <p>Plate: {trip.carName.match(/\((.*?)\)/)?.[1] || 'N/A'}</p>
                </div>
                <div className="tooltip-body">
                  <div className="tb-stat">
                    <Navigation size={14} color="#3b82f6" /> 
                    <span>45 km/h</span>
                  </div>
                  <div className="tb-stat">
                    {trip.carName.includes('Hybrid') ? <Battery size={14} color="#10b981" /> : <Fuel size={14} color="#10b981" />}
                    <span>72%</span>
                  </div>
                </div>
                <p style={{ margin: '0 0 10px', fontSize: '0.8rem', color: '#94a3b8' }}>Drv: {trip.driverName}</p>
                <button 
                  className="tooltip-btn"
                  onClick={() => {
                    setSelectedDetails(trip);
                    setActiveCarId(null);
                  }}
                >
                  View Complete Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Complete Details Modal */}
      {selectedDetails && (
        <div className="tracking-modal-overlay" onClick={() => setSelectedDetails(null)}>
          <div className="tracking-modal" onClick={e => e.stopPropagation()}>
            <div className="tm-header">
              <h2><MapPin size={20} color="#2563eb" /> Trip Details</h2>
              <button className="tm-close" onClick={() => setSelectedDetails(null)}><X size={20} /></button>
            </div>
            
            <div className="tm-body">
              <div className="tm-section">
                <h3>Passenger Information</h3>
                <div className="tm-grid">
                  <div className="tm-data-row">
                    <span className="tm-data-label">Name</span>
                    <span className="tm-data-value">{selectedDetails.customerName}</span>
                  </div>
                  <div className="tm-data-row">
                    <span className="tm-data-label">Phone</span>
                    <span className="tm-data-value" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Phone size={12} color="#2563eb"/> {selectedDetails.customerPhone}
                    </span>
                  </div>
                  <div className="tm-data-row">
                    <span className="tm-data-label">Purpose</span>
                    <span className="tm-data-value">{selectedDetails.reason}</span>
                  </div>
                  <div className="tm-data-row">
                    <span className="tm-data-label">Due Amount</span>
                    <span className="tm-data-value" style={{ color: selectedDetails.due > 0 ? '#ef4444' : '#10b981' }}>
                      ৳{selectedDetails.due.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="tm-section">
                <h3>Journey Route</h3>
                <div className="tm-grid" style={{ gridTemplateColumns: '1fr', background: '#e0e7ff' }}>
                  <div className="tm-data-row">
                    <span className="tm-data-label">Destination</span>
                    <span className="tm-data-value" style={{ color: '#1e3a8a' }}>{selectedDetails.destination}</span>
                  </div>
                  <div className="tm-data-row" style={{ marginTop: '10px' }}>
                    <span className="tm-data-label">Time Elapsed</span>
                    <span className="tm-data-value" style={{ color: '#1e3a8a' }}>{selectedDetails.startDate} - Present</span>
                  </div>
                </div>
              </div>

              <div className="tm-section">
                <h3>Assigned Resources</h3>
                <div className="tm-grid">
                  <div className="tm-data-row">
                    <span className="tm-data-label">Vehicle</span>
                    <span className="tm-data-value">{selectedDetails.carName}</span>
                  </div>
                  <div className="tm-data-row">
                    <span className="tm-data-label">Driver</span>
                    <span className="tm-data-value">{selectedDetails.driverName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveTrackingPage;
