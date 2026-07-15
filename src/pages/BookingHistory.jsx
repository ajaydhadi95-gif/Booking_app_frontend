import React, { useState, useEffect } from 'react';
import { getUserBookings } from '../services/api';

function BookingHistory() {
  // Demo ke liye userId 1 use kar rahe hain
  // LocalStorage se logged-in user ki id fetch karein, agar nahi hai toh default 1 par fallback karein
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const userId = loggedInUser?.id || 1;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getUserBookings(userId);
        setBookings(data);
      } catch (err) {
        setError('History load karne mein dikkat aayi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>Booking History</h2>

      {loading && <p>Loading your history...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && bookings.length === 0 ? (
        <p>Aapne abhi tak koi booking nahi ki hai.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Booking ID</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Item/Hotel Name</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Booking Date</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>#{b.id}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>{b.itemName}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{b.bookingDate}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    backgroundColor: b.status === 'pending' ? '#ffeeba' : '#d4edda',
                    color: b.status === 'pending' ? '#856404' : '#155724',
                    textTransform: 'capitalize'
                  }}>
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookingHistory;