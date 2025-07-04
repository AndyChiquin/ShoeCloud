import axios from 'axios'

const VALIDATE_URL = 'http://52.200.35.19/auth/validate-token'

export async function validateToken() {
  const token = localStorage.getItem('token')
  if (!token) return false

  try {
    const response = await axios.post(VALIDATE_URL, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data.valid || true
  } catch (error) {
    console.error('❌ Token inválido o expirado:', error.response?.data || error)
    return false
  }
}
