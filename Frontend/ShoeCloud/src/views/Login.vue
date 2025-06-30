<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
      <h2 class="text-3xl font-semibold mb-6 text-center text-gray-800">Iniciar Sesión</h2>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block text-gray-700 mb-1">Correo Electrónico</label>
          <input
            v-model="email"
            type="email"
            placeholder="ejemplo@correo.com"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-gray-700 mb-1">Contraseña</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <p v-if="errorMessage" class="text-red-500 text-center">{{ errorMessage }}</p>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          Ingresar
        </button>

        <div class="text-center mt-4">
          <router-link
            to="/reset-password"
            class="text-sm text-blue-600 hover:underline block"
          >
            ¿Olvidaste tu contraseña?
          </router-link>
          <router-link
            to="/register"
            class="text-sm text-green-600 hover:underline block mt-1"
          >
            ¿No tienes cuenta? Regístrate
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3001/login', {
          email: this.email,
          password: this.password
        });

        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          this.$router.push('/');
        } else {
          this.errorMessage = 'No se recibió un token del servidor.';
        }
      } catch (error) {
        console.error('Login error:', error);
        this.errorMessage =
          error.response?.data?.message || 'Error al iniciar sesión.';
      }
    }
  }
};
</script>
