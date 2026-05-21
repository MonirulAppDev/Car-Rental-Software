import { useState } from 'react';
import { useDispatchContext } from '../../context/DispatchContext';
import { Save, UserCircle, MapPin, CarFront, Banknote } from 'lucide-react';
import './PanelPages.css';

const ManualEntryPage = () => {
  const { cars, drivers, addBooking } = useDispatchContext();
  const [formData, setFormData] = useState({
    customerName: '', customerPhone: '', nid: '',
    destination: '', reason: '', duration: 1,
    carId: '', driverId: '',
    totalFare: '', advancePaid: '', khoraaki: ''
  });

  const dueAmount = (Number(formData.totalFare) || 0) - (Number(formData.advancePaid) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const carObj = cars.find(c => c.id === formData.carId) || {};
    const driverObj = drivers.find(d => d.id === formData.driverId) || {};

    const newBooking = {
      id: `MBK-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      nid: formData.nid,
      carName: `${carObj.name} (${carObj.plate})`,
      driverName: driverObj.name || 'Self-drive',
      destination: formData.destination,
      reason: formData.reason,
      startDate: new Date().toISOString().split('T')[0] + ' 10:00 AM',
      endDate: 'Pending',
      durationDays: Number(formData.duration),
      totalFare: Number(formData.totalFare),
      advancePaid: Number(formData.advancePaid),
      due: dueAmount,
      khoraaki: Number(formData.khoraaki),
      status: 'Confirmed',
      enteredBy: 'Manager'
    };

    addBooking(newBooking);
    alert('Manual Booking Saved Successfully!');
    
    setFormData({
      customerName: '', customerPhone: '', nid: '',
      destination: '', reason: '', duration: 1,
      carId: '', driverId: '',
      totalFare: '', advancePaid: '', khoraaki: ''
    });
  };

  return (
    <div className="animate-fadeIn">
      <div className="panel-page-header">
        <div>
          <h1 className="panel-page-title">New Manual Entry</h1>
          <p className="panel-page-subtitle">Create a traditional booking slip for offline customers.</p>
        </div>
        <button className="panel-btn panel-btn-primary" onClick={handleSubmit}>
          <Save size={15} /> Save Booking
        </button>
      </div>

      <form className="dispatch-card" onSubmit={handleSubmit}>
        <h3 className="section-title">1. Passenger Details</h3>
        <div className="panel-grid-2">
          <div className="panel-form-group">
            <label>Customer Name *</label>
            <input type="text" className="panel-input" placeholder="e.g. Anisur Rahman" required 
              value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} />
          </div>
          <div className="panel-form-group">
            <label>Mobile Number *</label>
            <input type="tel" className="panel-input" placeholder="01XXX-XXXXXX" required
              value={formData.customerPhone} onChange={e => setFormData({...formData, customerPhone: e.target.value})} />
          </div>
          <div className="panel-form-group">
            <label>NID / Passport (Optional)</label>
            <input type="text" className="panel-input" placeholder="National ID Number"
              value={formData.nid} onChange={e => setFormData({...formData, nid: e.target.value})} />
          </div>
        </div>

        <h3 className="section-title" style={{ marginTop: '24px' }}>2. Trip Details</h3>
        <div className="panel-grid-2">
          <div className="panel-form-group">
            <label>Destination (কোথায় যাবে) *</label>
            <input type="text" className="panel-input" placeholder="e.g. Cox's Bazar, Sylhet" required
              value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} />
          </div>
          <div className="panel-form-group">
            <label>Reason / Purpose</label>
            <select className="panel-input" value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})}>
              <option value="">Select Reason...</option>
              <option value="Wedding">Wedding (বিয়ে)</option>
              <option value="Family Tour">Family Tour (পারিবারিক ট্যুর)</option>
              <option value="Corporate Trip">Corporate Trip (অফিসিয়াল কাজ)</option>
              <option value="Airport Drop/Pickup">Airport Duty</option>
            </select>
          </div>
          <div className="panel-form-group">
            <label>Duration (Days)</label>
            <input type="number" min="1" className="panel-input" required
              value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} />
          </div>
        </div>

        <h3 className="section-title" style={{ marginTop: '24px' }}>3. Assign Resource</h3>
        <div className="panel-grid-2">
          <div className="panel-form-group">
            <label>Select Vehicle *</label>
            <select className="panel-input" required value={formData.carId} onChange={e => setFormData({...formData, carId: e.target.value})}>
              <option value="">-- Choose Car --</option>
              {cars.map(c => <option key={c.id} value={c.id}>{c.name} ({c.plate.split(' ')[1]})</option>)}
            </select>
          </div>
          <div className="panel-form-group">
            <label>Select Driver</label>
            <select className="panel-input" value={formData.driverId} onChange={e => setFormData({...formData, driverId: e.target.value})}>
              <option value="">No Driver (Self-drive)</option>
              {drivers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
        </div>

        <h3 className="section-title" style={{ marginTop: '24px' }}>4. Financials (Hiseb-Nikaash)</h3>
        <div className="panel-grid-2">
          <div className="panel-form-group">
            <label>Total Fare (৳) *</label>
            <input type="number" className="panel-input" required placeholder="0"
              value={formData.totalFare} onChange={e => setFormData({...formData, totalFare: e.target.value})} />
          </div>
          <div className="panel-form-group">
            <label>Advance Paid (৳)</label>
            <input type="number" className="panel-input" placeholder="0"
              value={formData.advancePaid} onChange={e => setFormData({...formData, advancePaid: e.target.value})} />
          </div>
          <div className="panel-form-group">
            <label>Due Amount (৳)</label>
            <input type="text" className="panel-input" readOnly value={dueAmount} style={{ background: '#f8fafc', fontWeight: 'bold' }} />
          </div>
          <div className="panel-form-group">
            <label>Driver Allowance / Khoraaki (৳)</label>
            <input type="number" className="panel-input" placeholder="e.g. 1500"
              value={formData.khoraaki} onChange={e => setFormData({...formData, khoraaki: e.target.value})} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManualEntryPage;
