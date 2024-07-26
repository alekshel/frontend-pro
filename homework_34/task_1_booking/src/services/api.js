import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const fetchDestinations = () =>
    axios.get(`${API_URL}/destinations`).then(response => response.data);

export const fetchHotels = (params) =>
    axios.get(`${API_URL}/hotels`, { params }).then(response => response.data);