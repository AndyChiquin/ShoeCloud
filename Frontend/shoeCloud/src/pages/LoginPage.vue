<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-lg shadow-2" style="width: 350px">
      <q-card-section class="text-h5 text-center text-primary">Bienvenido a ShoeCloud</q-card-section>

      <q-form @submit.prevent="handleLogin">
        <q-input
          filled
          v-model="email"
          label="Correo electrónico"
          type="email"
          class="q-mb-md"
          :rules="[val => !!val || 'Correo requerido']"
        />
        <q-input
          filled
          v-model="password"
          label="Contraseña"
          type="password"
          class="q-mb-md"
          :rules="[val => !!val || 'Contraseña requerida']"
        />

        <q-btn
          label="Iniciar Sesión"
          color="primary"
          class="full-width q-mt-md"
          type="submit"
        />

        <q-banner v-if="errorMessage" class="q-mt-md bg-red-1 text-negative">
          {{ errorMessage }}
        </q-banner>
        <div class="text-center q-mt-md">
        <q-btn
          flat
          label="¿No tienes una cuenta? Regístrate aquí"
          color="primary"
          @click="goToRegister"
        />
      </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const { proxy } = getCurrentInstance()
const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const goToRegister = () => {
  router.push('/register')
}


const LOGIN_URL = 'http://alb-user-domain-gateway-1765996128.us-east-1.elb.amazonaws.com/auth/login'

const handleLogin = async () => {
  errorMessage.value = ''
  try {
    const response = await axios.post(LOGIN_URL, {
      email: email.value,
      password: password.value
    })

    console.log('✅ Respuesta login:', response.data)

    const token = response.data.access_token
    localStorage.setItem('token', token)
    localStorage.setItem('userId', response.data.user_id)


    proxy?.$q?.notify?.({
      type: 'positive',
      message: 'Inicio de sesión exitoso',
      timeout: 2000
    })

    await getUserProfile()

  } catch (error) {
    console.error('❌ Error en login:', error.response?.data || error)

    proxy?.$q?.notify?.({
      type: 'negative',
      message: error.response?.data?.error || 'Correo o contraseña incorrectos',
      timeout: 3000
    })

    errorMessage.value =
      error.response?.data?.error || 'Correo o contraseña incorrectos'
  }
}

const getUserProfile = async () => {
  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')

  try {
    const response = await axios.get(`http://alb-user-domain-gateway-1765996128.us-east-1.elb.amazonaws.com/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const role = response.data.role
    localStorage.setItem('role', role)

    if (role === 'admin0') {
      router.push('/admin-dashboard')
    } else {
      router.push('/dashboard')
    }

  } catch (error) {
    console.error('Error al obtener perfil:', error)
    proxy?.$q?.notify?.({
      type: 'negative',
      message: 'Error al obtener el perfil del usuario',
      timeout: 3000
    })
  }
}

</script>


