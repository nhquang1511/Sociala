import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:4000/api', // URL của backend
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Hỗ trợ cookie nếu có
});

export default axiosClient;
