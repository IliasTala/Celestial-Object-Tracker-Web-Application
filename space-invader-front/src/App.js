import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Importez Navigate depuis react-router-dom
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />

            <Route path="*" element={<Navigate replace to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
    
  );
}

export default App;
