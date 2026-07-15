import axios from 'axios';

// Backend ka address (Humara SQLite server)
const API_URL = 'http://localhost:5000/api';

// 1. AUTHENTICATION APIs
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

// 2. BOOKING APIs
export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_URL}/bookings/create`, bookingData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const getUserBookings = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/bookings/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};