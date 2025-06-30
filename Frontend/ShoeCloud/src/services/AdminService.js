import axios from 'axios';

export default {
  async loginAdmin(data) {
    const response = await axios.post('http://localhost:3001/login', data);
    return response.data;
  }
};
