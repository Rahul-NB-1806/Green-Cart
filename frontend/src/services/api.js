import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getProfile = () => API.get('/auth/profile');
export const updateProfile = (data) => API.put('/auth/profile', data);

// Plants
export const getPlants = (params) => API.get('/plants', { params });
export const getPlantById = (id) => API.get(`/plants/${id}`);
export const getFeaturedPlants = () => API.get('/plants/featured');
export const getMedicinalPlants = () => API.get('/plants/medicinal');

// Cart
export const getCart = () => API.get('/cart');
export const addToCart = (data) => API.post('/cart', data);
export const updateCartItem = (id, data) => API.put(`/cart/${id}`, data);
export const removeCartItem = (id) => API.delete(`/cart/${id}`);

// Orders
export const createOrder = (data) => API.post('/orders', data);
export const getUserOrders = () => API.get('/orders');
export const getOrderById = (id) => API.get(`/orders/${id}`);

// Payment
export const createRazorpayOrder = (data) => API.post('/payment/create-order', data);
export const verifyPayment = (data) => API.post('/payment/verify', data);

export default API;
