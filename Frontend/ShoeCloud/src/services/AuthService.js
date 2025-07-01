import axios from 'axios'

const API_URL = 'https://tm6eok1706.execute-api.us-east-1.amazonaws.com/prod'

export default {
  async login(data) {
    const response = await axios.post(`${API_URL}/auth/login`, data)
    return response.data
  }
}
