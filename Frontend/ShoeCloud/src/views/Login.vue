<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card p-4 shadow" style="width: 100%; max-width: 400px;">
      <h3 class="text-center mb-4">Iniciar Sesión</h3>

      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="email" class="form-label">Correo Electrónico</label>
          <input v-model="email" type="email" id="email" class="form-control" required placeholder="ejemplo@correo.com" />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input v-model="password" type="password" id="password" class="form-control" required placeholder="••••••••" />
        </div>

        <button type="submit" class="btn btn-primary w-100">Ingresar</button>
      </form>

      <p v-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>

      <div class="text-center mt-3">
        <router-link to="/register" class="text-decoration-none">¿No tienes cuenta? Regístrate</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AuthService from '@/services/AuthService'


export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async handleLogin() {
      try {
        const response = await AuthService.login({
          email: this.email,
          password: this.password
        })

        if (response.access_token) {
          localStorage.setItem('token', response.access_token)
          localStorage.setItem('user_id', response.user_id)
          this.$router.push('/dashboard') // o a donde quieras redirigir
        } else {
          this.errorMessage = 'No se recibió token del servidor.'
        }

      } catch (error) {
        console.error('Error de login:', error)
        this.errorMessage =
          error.response?.data?.error || 'Credenciales incorrectas.'
      }
    }
  }
}
</script>
