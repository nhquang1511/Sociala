import axiosClient from '../utils/axiosClient';

const userAPI = {
  register: (data) => axiosClient.post('/users/register', data),
  login: (data) => axiosClient.post('/users/login', data),
  getUser: (id) => axiosClient.get(`/users/${id}`),
  updateUser: (id, data) => axiosClient.put(`/users/${id}`, data),
  deleteUser: (id) => axiosClient.delete(`/users/${id}`),
  getAllUsers: () => axiosClient.get('/users'),
};

export default userAPI;
