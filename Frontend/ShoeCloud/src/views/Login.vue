<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow" style="max-width: 400px; width: 100%;">
      <h3 class="text-center mb-4">Iniciar Sesión</h3>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="correo" class="form-label">Correo Electrónico</label>
          <input
            v-model="correo"
            type="email"
            class="form-control"
            id="correo"
            placeholder="ejemplo@correo.com"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <div class="input-group">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="form-control"
              id="password"
              placeholder="••••••"
              required
            />
            <button type="button" class="btn btn-outline-secondary" @click="togglePasswordVisibility">
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>
        </div>
        <button type="submit" class="btn btn-danger w-100">Iniciar Sesión</button>
      </form>

      <div class="text-center mt-3">
        <router-link to="/register" class="text-decoration-none">Registrarse</router-link>
      </div>
      <div class="text-center mt-1">
        <router-link to="/forgot-password" class="text-decoration-none">¿Olvidó su contraseña?</router-link>
      </div>
    </div>
  </div>
</template>


<script>
import AdminService from '@/services/AdminService';
import { mapActions } from 'vuex';

export default {
  name: 'LoginView',
  data() {
    return {
      correo: '',
      password: '',
      rol: '',
      showPassword: false,
    };
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      try {
        const response = await AdminService.loginAdmin({
          correoAdmin: this.correo,
          contraAdmin: this.password,
          //rolAdmins: this.rol,
        });
        console.log('Inicio de sesión exitoso:', response);
        
        // Guardar el token y redirigir a la página principal
        if (response.accessToken) {
          console.log('accessToken:', response.accessToken);

          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('userRole', JSON.stringify(response.rolAdmins));
          //await this.login( { token: response.accessToken , roles: response.rolAdmins} );
          this.login({ accessToken: response.accessToken, userRole: response.rolAdmins , expiresIn: response.expiresIn});
          this.$router.push('/');
        } else {
          throw new Error('No se recibió un token de acceso');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Correo o contraseña incorrectos');
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
.card {
  padding: 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.position-relative {
  position: relative;
}
.toggle-password {
  position: absolute;
  top: 70%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}

.btn-iniciar-sesion{
  background-color: #e62e2e;
  color: white;
  border: none;
}
</style>