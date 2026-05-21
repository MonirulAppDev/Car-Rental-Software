import { Link } from 'react-router-dom';
import { Star, Users, Fuel, Settings2, MapPin, Car, CheckCircle } from 'lucide-react';
import './CarCard.css';

const CarCard = ({ car, featured = false }) => {
  const availabilityClass = car.available ? 'available' : 'unavailable';
  const availabilityLabel = car.available ? 'Available' : 'Booked';

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
        className={i < Math.floor(rating) ? 'star-filled' : 'star-empty'}
      />
    ));
  };

  return (
    <div className={`car-card ${featured ? 'car-card--featured' : ''}`} id={`car-card-${car.id}`}>
      {/* Image */}
      <div className="car-card__image-wrapper">
        <img
          src={car.image}
          alt={car.name}
          className="car-card__image"
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=80`;
          }}
        />
        <div className="car-card__overlay" />

        {/* Badges */}
        <div className="car-card__top-badges">
          <span className={`car-card__availability ${availabilityClass}`}>
            {car.available ? <CheckCircle size={10} /> : <Car size={10} />}
            {availabilityLabel}
          </span>
          {featured && <span className="car-card__featured-badge">⭐ Featured</span>}
        </div>

        {/* Type Badge */}
        <span className="car-card__type-badge">{car.type}</span>
      </div>

      {/* Content */}
      <div className="car-card__body">
        <div className="car-card__header">
          <div>
            <p className="car-card__brand">{car.brand} • {car.model}</p>
            <h3 className="car-card__name">{car.name}</h3>
          </div>
          <div className="car-card__rating">
            <div className="stars">{renderStars(car.rating)}</div>
            <span className="car-card__rating-text">{car.rating} ({car.reviews})</span>
          </div>
        </div>

        {/* Specs */}
        <div className="car-card__specs">
          <div className="spec-item">
            <Users size={13} />
            <span>{car.seats} Seats</span>
          </div>
          <div className="spec-item">
            <Fuel size={13} />
            <span>{car.fuel}</span>
          </div>
          <div className="spec-item">
            <Settings2 size={13} />
            <span>{car.transmission}</span>
          </div>
          <div className="spec-item">
            <MapPin size={13} />
            <span>{car.location}</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="car-card__pricing">
          <div className="pricing-main">
            <div className="pricing-item">
              <span className="pricing-label">Per Day</span>
              <span className="pricing-value">৳{car.pricePerDay.toLocaleString()}</span>
            </div>
            <div className="pricing-divider" />
            <div className="pricing-item">
              <span className="pricing-label">Per Hour</span>
              <span className="pricing-value pricing-value--small">৳{car.pricePerHour.toLocaleString()}</span>
            </div>
          </div>
          <div className="pricing-with-driver">
            With Driver: <strong>৳{car.priceWithDriver.toLocaleString()}/day</strong>
          </div>
        </div>

        {/* Actions */}
        <div className="car-card__actions">
          <Link
            to={`/cars/${car.id}`}
            className="btn btn-ghost btn-sm car-card__details-btn"
            id={`car-details-btn-${car.id}`}
          >
            View Details
          </Link>
          <Link
            to={car.available ? `/booking/${car.id}` : '#'}
            className={`btn btn-sm car-card__book-btn ${car.available ? 'btn-primary' : 'btn-ghost disabled'}`}
            id={`car-book-btn-${car.id}`}
            onClick={(e) => !car.available && e.preventDefault()}
          >
            {car.available ? 'Book Now' : 'Unavailable'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
