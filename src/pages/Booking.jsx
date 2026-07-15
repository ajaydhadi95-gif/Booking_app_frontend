import React, { useState, useEffect } from 'react';
import { createBooking, getUserBookings } from '../services/api';

function Booking() {
  // Demo ke liye userId 1 le rahe hain (jo humne register kiya tha)
  // Real app mein aap ise localStorage ya auth context se nikalenge
  // LocalStorage se logged-in user ki id fetch karein, agar nahi hai toh default 1 par fallback karein
const loggedInUser = JSON.parse(localStorage.getItem('user'));
const userId = loggedInUser?.id || 1;

  const [itemName, setItemName] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // 1. User ki purani bookings fetch karne ke liye function
  const fetchBookings = async () => {
    try {
      const data = await getUserBookings(userId);
      setBookings(data);
    } catch (err) {
      console.error("Bookings fetch karne mein error:", err);
    }
  };

  // Page load hote hi bookings fetch karein
  useEffect(() => {
    fetchBookings();
  }, []);

  // 2. Nayi booking submit karne ke liye handler
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!itemName || !bookingDate) {
      setError('Please fill all fields');
      return;
    }

    try {
      const response = await createBooking({ userId, itemName, bookingDate });
      setMessage(response.message);
      setItemName('');
      setBookingDate('');
      // List ko refresh karein taaki nayi booking turant dikhe
      fetchBookings(); 
    } catch (err) {
      setError(err.message || 'Failed to create booking');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Book a New Slot / Item</h2>
      
      {/* Booking Form */}
      <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Item/Hotel Name:</label>
          <input 
            type="text" 
            value={itemName} 
            onChange={(e) => setItemName(e.target.value)} 
            placeholder="e.g. Grand Palace Hotel"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Booking Date:</label>
          <input 
            type="date" 
            value={bookingDate} 
            onChange={(e) => setBookingDate(e.target.value)} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Book Now
        </button>
      </form>

      {/* Success/Error Messages */}
      {message && <p style={{ color: 'green', fontWeight: 'bold' }}>{message}</p>}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

      <hr />

      {/* Bookings List */}
      <h3>Your Bookings</h3>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {bookings.map((b) => (
            <li key={b.id} style={{ background: '#f9f9f9', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }}>
              <strong>{b.itemName}</strong> - {b.bookingDate} 
              <span style={{ 
                float: 'right', 
                padding: '2px 8px', 
                borderRadius: '3px', 
                background: b.status === 'pending' ? '#ffeeba' : '#d4edda',
                color: b.status === 'pending' ? '#856404' : '#155724'
              }}>
                {b.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Booking;