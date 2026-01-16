
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { User, UserRole } from './types';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BatchUpload from './pages/BatchUpload';
import JobDetails from './pages/JobDetails';
import AuditLogs from './pages/AuditLogs';
import Feedback from './pages/Feedback';
import ApiDocs from './pages/ApiDocs';
import Vendors from './pages/Vendors';
import ApiKeys from './pages/ApiKeys';
import RequestLogs from './pages/RequestLogs';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Support from './pages/Support';
import Layout from './components/Layout';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleLogin = (role: UserRole) => {
    const mockUser: User = {
      id: role === UserRole.ADMIN ? 'u-admin' : 'u-vendor',
      name: role === UserRole.ADMIN ? 'Alex Morgan' : 'Jordan Smith',
      email: role === UserRole.ADMIN ? 'admin@engine.io' : 'jordan@acme.com',
      role,
      organization: role === UserRole.ADMIN ? 'Fintech Core' : 'Acme Corp',
      avatar: `https://picsum.photos/seed/${role}/100/100`
    };
    setUser(mockUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={() => handleLogin(UserRole.VENDOR)} />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/support" element={<Support />} />
        
        {/* Authenticated Routes */}
        <Route element={<Layout user={user} onLogout={handleLogout} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />}>
          <Route path="/dashboard" element={
            user?.role === UserRole.ADMIN ? <AdminDashboard /> : <VendorDashboard />
          } />
          
          {/* Admin Specific */}
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/api-keys" element={<ApiKeys />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
          
          {/* Vendor Specific */}
          <Route path="/batch-upload" element={<BatchUpload />} />
          <Route path="/request-logs" element={<RequestLogs />} />
          <Route path="/jobs/:jobId" element={<JobDetails />} />
          <Route path="/feedback" element={<Feedback />} />
          
          {/* Shared */}
          <Route path="/docs" element={<ApiDocs />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
