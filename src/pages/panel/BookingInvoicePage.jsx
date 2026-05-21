import { useState, useEffect } from 'react';
import { useDispatchContext } from '../../context/DispatchContext';
import { Printer, ArrowLeft, CarFront } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './BookingInvoicePage.css';

const BookingInvoicePage = () => {
  const { bookings } = useDispatchContext();
  const navigate = useNavigate();
  // We use window.location.hash to parse the ID since we are in HashRouter
  // example: #/panel-only/invoice/MBK-1234
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    // Extract ID from URL hash manually or via useParams if we set it up
    const hashParts = window.location.hash.split('/');
    const tripId = hashParts[hashParts.length - 1];
    
    const found = bookings.find(b => b.id === tripId);
    if(found) {
      setBooking(found);
    } else {
      // Fallback to first booking if not found
      setBooking(bookings[0]);
    }
  }, [bookings]);

  if (!booking) return <div>Loading Invoice...</div>;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f1f5f9', minHeight: '100vh' }}>
      <div className="no-print" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', maxWidth: '800px', margin: '0 auto 20px' }}>
        <button className="panel-btn panel-btn-outline" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back to Ledger
        </button>
        <button className="panel-btn panel-btn-primary" onClick={handlePrint}>
          <Printer size={16} /> Print Invoice
        </button>
      </div>

      <div className="invoice-page-container">
        {/* Header */}
        <div className="invoice-header">
          <div className="invoice-brand">
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CarFront size={28} /> DriveBD
            </h1>
            <p>123 Corporate Road, Gulshan-2, Dhaka</p>
            <p>Phone: +880 1711-000000 | Email: booking@drivebd.com</p>
          </div>
          <div className="invoice-meta">
            <h2>BOOKING INVOICE</h2>
            <p><strong>Invoice No:</strong> {booking.id.replace('MBK', 'INV')}</p>
            <p><strong>Date Issued:</strong> {new Date().toLocaleDateString('en-GB')}</p>
            <p><strong>Status:</strong> <span style={{ color: booking.due > 0 ? '#ef4444' : '#10b981', fontWeight: 600 }}>
              {booking.due > 0 ? 'PARTIAL PAYMENT' : 'PAID IN FULL'}
            </span></p>
          </div>
        </div>

        {/* Passenger & Trip Info */}
        <div className="invoice-grid-2">
          <div className="invoice-section">
            <h3 className="invoice-section-title">Passenger Details</h3>
            <div className="info-block">
              <p><span className="info-label">Name:</span> {booking.customerName}</p>
              <p><span className="info-label">Mobile:</span> {booking.customerPhone}</p>
              <p><span className="info-label">NID / Passport:</span> {booking.nid || 'N/A'}</p>
            </div>
          </div>
          <div className="invoice-section">
            <h3 className="invoice-section-title">Journey Details</h3>
            <div className="info-block">
              <p><span className="info-label">Destination:</span> {booking.destination}</p>
              <p><span className="info-label">Purpose:</span> {booking.reason}</p>
              <p><span className="info-label">Start Date:</span> {booking.startDate}</p>
              <p><span className="info-label">End Date:</span> {booking.endDate} ({booking.durationDays} Days)</p>
            </div>
          </div>
        </div>

        {/* Vehicle & Driver Info */}
        <div className="invoice-section">
          <h3 className="invoice-section-title">Assigned Resources</h3>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Vehicle Details</th>
                <th>Assigned Driver</th>
                <th>Daily Allowance (Khoraaki)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>{booking.carName}</strong></td>
                <td>{booking.driverName}</td>
                <td>৳{booking.khoraaki.toLocaleString()}/day</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Financials */}
        <div className="invoice-section">
          <h3 className="invoice-section-title">Payment Breakdown</h3>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Description</th>
                <th className="amount-col">Amount (BDT)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vehicle Rental Fare ({booking.durationDays} Days)</td>
                <td className="amount-col">{(booking.totalFare - booking.khoraaki).toLocaleString()}</td>
              </tr>
              <tr>
                <td>Driver Allowance (Khoraaki)</td>
                <td className="amount-col">{booking.khoraaki.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Other Charges / Tolls</td>
                <td className="amount-col">0</td>
              </tr>
            </tbody>
          </table>

          <div className="invoice-totals">
            <div className="invoice-totals-row">
              <span>Total Payable:</span>
              <span>৳{booking.totalFare.toLocaleString()}</span>
            </div>
            <div className="invoice-totals-row">
              <span>Advance Received:</span>
              <span style={{ color: '#10b981' }}>- ৳{booking.advancePaid.toLocaleString()}</span>
            </div>
            <div className="invoice-totals-row grand-total">
              <span>Net Due Amount:</span>
              <span style={{ color: booking.due > 0 ? '#ef4444' : '#1e293b' }}>৳{booking.due.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Footer Signatures */}
        <div className="invoice-footer">
          <div className="signature-box">
            <div className="signature-line">Customer Signature</div>
          </div>
          <div className="signature-box">
            <div className="signature-line">Authorized Signatory (DriveBD)</div>
            <p style={{ marginTop: '5px', color: '#94a3b8' }}>Entered by: {booking.enteredBy}</p>
          </div>
        </div>
        
        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8', marginTop: '15px' }}>
          * This is a computer generated invoice and does not require a physical stamp. Terms and conditions apply.
        </p>
      </div>
    </div>
  );
};

export default BookingInvoicePage;
