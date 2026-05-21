import { createContext, useContext, useState, useEffect } from 'react';
import { manualBookings as initialBookings, cars as initialCars, drivers as initialDrivers } from '../data/mockData';

const DispatchContext = createContext();

export const useDispatchContext = () => useContext(DispatchContext);

export const DispatchProvider = ({ children }) => {
  // Initialize state from localStorage or fallback to mock data
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('dispatch_bookings');
    return saved ? JSON.parse(saved) : initialBookings;
  });

  const [cars, setCars] = useState(() => {
    const saved = localStorage.getItem('dispatch_cars');
    return saved ? JSON.parse(saved) : initialCars;
  });

  const [drivers, setDrivers] = useState(() => {
    const saved = localStorage.getItem('dispatch_drivers');
    return saved ? JSON.parse(saved) : initialDrivers;
  });

  const [verifications, setVerifications] = useState(() => {
    const saved = localStorage.getItem('dispatch_verifications');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('dispatch_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('dispatch_cars', JSON.stringify(cars));
  }, [cars]);

  useEffect(() => {
    localStorage.setItem('dispatch_drivers', JSON.stringify(drivers));
  }, [drivers]);

  useEffect(() => {
    localStorage.setItem('dispatch_verifications', JSON.stringify(verifications));
  }, [verifications]);

  // --- CRUD Operations ---

  const addBooking = (newBooking) => {
    setBookings([newBooking, ...bookings]);
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
  };

  const updateBookingFinancials = (bookingId, additionalKhoraaki) => {
    setBookings(bookings.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          khoraaki: b.khoraaki + additionalKhoraaki,
          totalFare: b.totalFare + additionalKhoraaki, // Assuming expenses increase total cost
        };
      }
      return b;
    }));
  };

  // --- Driver & Verification Operations ---

  const submitDriverUpdate = (driverName, tripId, updateData) => {
    const newVerification = {
      id: `VRQ-${Date.now()}`,
      driverName,
      tripId,
      statusRequest: updateData.status, // e.g., 'Completed', 'Garage'
      expenseClaim: updateData.expense || 0,
      note: updateData.note || '',
      submittedAt: new Date().toLocaleString(),
      status: 'Pending'
    };
    setVerifications([newVerification, ...verifications]);
  };

  const approveVerification = (verificationId) => {
    const req = verifications.find(v => v.id === verificationId);
    if (!req) return;

    // Update the booking based on the request
    if (req.tripId) {
      if (req.statusRequest) updateBookingStatus(req.tripId, req.statusRequest);
      if (req.expenseClaim > 0) updateBookingFinancials(req.tripId, req.expenseClaim);
    }

    // Mark request as Approved
    setVerifications(verifications.map(v => v.id === verificationId ? { ...v, status: 'Approved' } : v));
  };

  const rejectVerification = (verificationId) => {
    setVerifications(verifications.map(v => v.id === verificationId ? { ...v, status: 'Rejected' } : v));
  };

  return (
    <DispatchContext.Provider value={{
      bookings, cars, drivers, verifications,
      addBooking, updateBookingStatus, 
      submitDriverUpdate, approveVerification, rejectVerification
    }}>
      {children}
    </DispatchContext.Provider>
  );
};
