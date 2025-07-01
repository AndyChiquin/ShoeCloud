<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card p-4 shadow" style="width: 100%; max-width: 450px;">
      <h3 class="text-center mb-4">Crear Cuenta</h3>

      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label for="name" class="form-label">Nombre completo</label>
          <input v-model="name" type="text" id="name" class="form-control" required placeholder="Juan Pérez" />
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Correo Electrónico</label>
          <input v-model="email" type="email" id="email" class="form-control" required placeholder="ejemplo@correo.com" />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input v-model="password" type="password" id="password" class="form-control" required placeholder="••••••••" />
        </div>

        <div class="mb-3">
          <label for="confirmPassword" class="form-label">Confirmar Contraseña</label>
          <input v-model="confirmPassword" type="password" id="confirmPassword" class="form-control" required />
        </div>

        <button type="submit" class="btn btn-success w-100">Registrarse</button>
      </form>

      <p v-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>
      <p v-if="successMessage" class="text-success text-center mt-3">{{ successMessage }}</p>

      <div class="text-center mt-3">
        <router-link to="/login" class="text-decoration-none">¿Ya tienes cuenta? Inicia sesión</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RegisterView',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden.'
        return
      }

      try {
        const response = await axios.post('http://localhost:3001/register', {
          name: this.name,
          email: this.email,
          password: this.password
        })

        this.successMessage = 'Registro exitoso. Redirigiendo...'
        this.errorMessage = ''

        setTimeout(() => {
          this.$router.push('/login')
        }, 2000)

      } catch (error) {
        console.error('Error en el registro:', error)
        this.errorMessage = error.response?.data?.message || 'No se pudo registrar.'
      }
    }
  }
}
</script>
