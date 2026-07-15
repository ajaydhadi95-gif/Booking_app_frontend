import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Booking from './pages/Booking';
import BookingHistory from './pages/BookingHistory';
import ProtectedRoute from './components/ProtectedRoute'; 
// Agar aapka koi Navbar ya CSS file thi, toh unhe bhi yahan import kar lein:
// import Navbar from './components/Navbar'; 
// import './App.css';

function App() {
  return (
    <Router>
      {/* Agar Navbar use kar rahe hain toh use yahan Router ke andar rakh sakte hain */}
      {/* <Navbar /> */}
      
      <Routes>
        {/* Default Route: Direct login par bhejega */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route 
          path="/booking" 
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/history" 
          element={
            <ProtectedRoute>
              <BookingHistory />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;