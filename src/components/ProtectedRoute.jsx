import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Check karein ki localStorage mein user data hai ya nahi
  const user = localStorage.getItem('user');

  // Agar user logged in nahi hai, toh use login page par bhej dein
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Agar logged in hai, toh page render karein
  return children;
}

export default ProtectedRoute;