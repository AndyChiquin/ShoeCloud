import axios from 'axios';

export default {
  async loginAdmin(data) {
    const response = await axios.post('http://localhost:3001/login', data);
    return response.data;
  },
  async registerAdmin(data) {
    const response = await axios.post('http://localhost:3001/register', data);
    return response.data;
  }
};
