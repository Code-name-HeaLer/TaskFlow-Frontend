// --- START OF FILE frontend/src/main.jsx ---
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx'; // Your main Todo app
import LandingPage from './pages/Landing.jsx';
import LoginPage from './pages/Login.jsx';
import OAuthSuccessPage from './pages/OAuthSuccessPage.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import './index.css'; // Your global styles

// Component to protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Component for routes accessible only by unauthenticated users (e.g., login, landing)
const GuestRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  if (isAuthenticated) {
    return <Navigate to="/app" replace />;
  }
  return children;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<GuestRoute><LandingPage /></GuestRoute>} />
          <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
          <Route path="/oauth-success" element={<OAuthSuccessPage />} />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} /> {/* Fallback for unknown routes */}
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);