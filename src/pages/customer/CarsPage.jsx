import { useState, useMemo } from 'react';
import { Search, Filter, X, SlidersHorizontal, Car } from 'lucide-react';
import CarCard from '../../components/customer/CarCard';
import { cars, carTypes } from '../../data/mockData';
import './CarsPage.css';

const CarsPage = () => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [priceRange, setPriceRange] = useState('all');
  const [availability, setAvailability] = useState('all');
  const [transmission, setTransmission] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredCars = useMemo(() => {
    let result = [...cars];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.brand.toLowerCase().includes(q) ||
          c.type.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q)
      );
    }

    // Type filter
    if (selectedType !== 'All') {
      result = result.filter((c) => c.type === selectedType);
    }

    // Price filter
    if (priceRange === 'under5000') {
      result = result.filter((c) => c.pricePerDay < 5000);
    } else if (priceRange === '5000-10000') {
      result = result.filter((c) => c.pricePerDay >= 5000 && c.pricePerDay <= 10000);
    } else if (priceRange === 'above10000') {
      result = result.filter((c) => c.pricePerDay > 10000);
    }

    // Availability
    if (availability === 'available') {
      result = result.filter((c) => c.available);
    }

    // Transmission
    if (transmission !== 'all') {
      result = result.filter((c) => c.transmission.toLowerCase() === transmission);
    }

    // Sort
    if (sortBy === 'price-asc') result.sort((a, b) => a.pricePerDay - b.pricePerDay);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.pricePerDay - a.pricePerDay);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [search, selectedType, priceRange, availability, transmission, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setSelectedType('All');
    setPriceRange('all');
    setAvailability('all');
    setTransmission('all');
    setSortBy('default');
  };

  const hasFilters = search || selectedType !== 'All' || priceRange !== 'all' || availability !== 'all' || transmission !== 'all';

  return (
    <div className="customer-site cars-page">
      {/* Page Header */}
      <div className="cars-page-header" id="cars-page-header">
        <div className="cars-header-bg" />
        <div className="container">
          <div className="cars-header-content">
            <div className="section-tag"><Car size={12} /> Our Fleet</div>
            <h1 className="cars-header-title">
              Find Your Perfect <span className="gradient-text">Ride</span>
            </h1>
            <p className="cars-header-desc">
              Browse {cars.length}+ premium vehicles. Filter by type, price, and availability.
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="cars-layout">
          {/* Sidebar Filters */}
          <aside className={`cars-sidebar ${filterOpen ? 'cars-sidebar--open' : ''}`} id="cars-sidebar">
            <div className="sidebar-header">
              <h3 className="sidebar-title">
                <SlidersHorizontal size={16} /> Filters
              </h3>
              {hasFilters && (
                <button className="clear-filters-btn" onClick={clearFilters} id="clear-filters-btn">
                  <X size={14} /> Clear All
                </button>
              )}
            </div>

            {/* Type Filter */}
            <div className="filter-section" id="filter-type">
              <h4 className="filter-label">Vehicle Type</h4>
              <div className="filter-chips">
                {carTypes.map((type) => (
                  <button
                    key={type}
                    className={`filter-chip ${selectedType === type ? 'active' : ''}`}
                    onClick={() => setSelectedType(type)}
                    id={`filter-chip-${type}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="filter-section" id="filter-price">
              <h4 className="filter-label">Daily Rate</h4>
              <div className="filter-radio-list">
                {[
                  { value: 'all', label: 'All Prices' },
                  { value: 'under5000', label: 'Under ৳5,000' },
                  { value: '5000-10000', label: '৳5,000 – ৳10,000' },
                  { value: 'above10000', label: 'Above ৳10,000' },
                ].map((opt) => (
                  <label key={opt.value} className="filter-radio" id={`price-filter-${opt.value}`}>
                    <input
                      type="radio"
                      name="priceRange"
                      value={opt.value}
                      checked={priceRange === opt.value}
                      onChange={(e) => setPriceRange(e.target.value)}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="filter-section" id="filter-availability">
              <h4 className="filter-label">Availability</h4>
              <div className="filter-radio-list">
                {[
                  { value: 'all', label: 'All Cars' },
                  { value: 'available', label: 'Available Only' },
                ].map((opt) => (
                  <label key={opt.value} className="filter-radio" id={`avail-filter-${opt.value}`}>
                    <input
                      type="radio"
                      name="availability"
                      value={opt.value}
                      checked={availability === opt.value}
                      onChange={(e) => setAvailability(e.target.value)}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Transmission */}
            <div className="filter-section" id="filter-transmission">
              <h4 className="filter-label">Transmission</h4>
              <div className="filter-radio-list">
                {[
                  { value: 'all', label: 'All' },
                  { value: 'automatic', label: 'Automatic' },
                  { value: 'manual', label: 'Manual' },
                ].map((opt) => (
                  <label key={opt.value} className="filter-radio" id={`trans-filter-${opt.value}`}>
                    <input
                      type="radio"
                      name="transmission"
                      value={opt.value}
                      checked={transmission === opt.value}
                      onChange={(e) => setTransmission(e.target.value)}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="cars-main">
            {/* Toolbar */}
            <div className="cars-toolbar" id="cars-toolbar">
              <div className="cars-search-wrapper">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search car, brand, location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="cars-search-input"
                  id="cars-search-input"
                />
                {search && (
                  <button className="search-clear" onClick={() => setSearch('')} id="search-clear-btn">
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="toolbar-right">
                <span className="cars-count">{filteredCars.length} vehicles</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                  id="cars-sort-select"
                >
                  <option value="default">Sort: Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name: A-Z</option>
                </select>
                <button
                  className="filter-toggle-btn"
                  onClick={() => setFilterOpen(!filterOpen)}
                  id="filter-toggle-btn"
                >
                  <Filter size={15} />
                  Filters
                  {hasFilters && <span className="filter-badge">!</span>}
                </button>
              </div>
            </div>

            {/* Results */}
            {filteredCars.length > 0 ? (
              <div className="cars-results-grid">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="cars-empty" id="cars-empty-state">
                <div className="cars-empty__icon"><Car size={48} /></div>
                <h3>No Cars Found</h3>
                <p>Try adjusting your search or filters.</p>
                <button className="btn btn-primary" onClick={clearFilters} id="cars-reset-btn">
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsPage;
