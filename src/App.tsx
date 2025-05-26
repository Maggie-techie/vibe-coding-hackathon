import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from './hooks/useAuth';
import Layout from './components/layout/Layout';
import LoadingPage from './components/ui/LoadingPage';

// Lazy load pages to improve performance
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'));
const PatientsPage = lazy(() => import('./pages/patients/PatientsPage'));
const PatientDetailPage = lazy(() => import('./pages/patients/PatientDetailPage'));
const AddPatientPage = lazy(() => import('./pages/patients/AddPatientPage'));
const RemindersPage = lazy(() => import('./pages/reminders/RemindersPage'));
const ProfilePage = lazy(() => import('./pages/profile/ProfilePage'));

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
        >
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="patients/add" element={<AddPatientPage />} />
          <Route path="patients/:id" element={<PatientDetailPage />} />
          <Route path="reminders" element={<RemindersPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default App;