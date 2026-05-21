import { HashRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/customer/Navbar';
import Footer from './components/customer/Footer';

// Customer Pages
import HomePage from './pages/customer/HomePage';
import CarsPage from './pages/customer/CarsPage';
import CarDetailPage from './pages/customer/CarDetailPage';
import BookingPage from './pages/customer/BookingPage';
import ProfilePage from './pages/customer/ProfilePage';
import LoginPage from './pages/customer/LoginPage';
import DriverPortalPage from './pages/driver/DriverPortalPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './components/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import BookingsPage from './pages/admin/BookingsPage';
import AdminCarsPage from './pages/admin/AdminCarsPage';
import DriversPage from './pages/admin/DriversPage';
import ReportsPage from './pages/admin/ReportsPage';
import SettingsPage from './pages/admin/SettingsPage';
import AdminOperationsPage from './pages/admin/AdminOperationsPage';
import AdminAccountingPage from './pages/admin/AdminAccountingPage';

// Panel Only Imports (Phase 4)
import DispatchLayout from './components/panel/DispatchLayout';
import LiveBoardPage from './pages/panel/LiveBoardPage';
import ManualEntryPage from './pages/panel/ManualEntryPage';
import TripLedgerPage from './pages/panel/TripLedgerPage';
import StaffRolesPage from './pages/panel/StaffRolesPage';
import BookingInvoicePage from './pages/panel/BookingInvoicePage';
import DispatchDashboard from './pages/panel/DispatchDashboard';
import LiveTrackingPage from './pages/panel/LiveTrackingPage';
import { DispatchProvider } from './context/DispatchContext';

// Customer Layout Wrapper
const CustomerLayout = () => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '80px', backgroundColor: 'var(--c-bg-primary)' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

// Dispatch App Wrapper (Provides DB Context to all Dispatch/Driver routes)
const DispatchApp = () => {
  return (
    <DispatchProvider>
      <Outlet />
    </DispatchProvider>
  );
};

// Admin Layout Wrapper
const AdminLayoutWrapper = () => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Customer Site Routes */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/cars/:id" element={<CarDetailPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Driver App Simulation Route (Old) */}
        {/* Replaced by the new Driver Portal inside DispatchApp */}

        {/* Admin Login Route */}
        <Route path="/admin-panel" element={<AdminLoginPage />} />

        {/* Admin Panel Dashboard Routes */}
        <Route element={<AdminLayoutWrapper />}>
          <Route path="/admin-panel/dashboard" element={<DashboardPage />} />
          <Route path="/admin-panel/bookings" element={<BookingsPage />} />
          <Route path="/admin-panel/cars" element={<AdminCarsPage />} />
          <Route path="/admin-panel/drivers" element={<DriversPage />} />
          <Route path="/admin-panel/reports" element={<ReportsPage />} />
          <Route path="/admin-panel/accounting" element={<AdminAccountingPage />} />
          <Route path="/admin-panel/operations" element={<AdminOperationsPage />} />
          <Route path="/admin-panel/settings" element={<SettingsPage />} />
        </Route>

        {/* Offline Dispatch & Driver Portal (Phase 7 & 8) */}
        <Route element={<DispatchApp />}>
          {/* Driver Portal (No Sidebar) */}
          <Route path="/driver-portal" element={<DriverPortalPage />} />
          
          {/* Invoice Print (No Sidebar) */}
          <Route path="/panel-only/invoice/:id" element={<BookingInvoicePage />} />

          {/* Dispatcher Panel (With Sidebar) */}
          <Route element={<DispatchLayout />}>
            <Route path="/panel-only" element={<DispatchDashboard />} />
            <Route path="/panel-only/dashboard" element={<DispatchDashboard />} />
            <Route path="/panel-only/tracking" element={<LiveTrackingPage />} />
            <Route path="/panel-only/board" element={<LiveBoardPage />} />
            <Route path="/panel-only/new" element={<ManualEntryPage />} />
            <Route path="/panel-only/ledger" element={<TripLedgerPage />} />
            <Route path="/panel-only/staff" element={<StaffRolesPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
