import React from 'react';
import './App.css';
import {AuthProvider} from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Home';


const PrivateRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const auth = useAuth();

  return auth?.authenticated ? element : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
