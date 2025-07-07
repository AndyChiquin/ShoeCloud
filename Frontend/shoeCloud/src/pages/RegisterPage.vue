<template>
  <q-page class="flex flex-center column q-pa-md">
    <q-card style="width: 400px; max-width: 90vw">
      <q-card-section>
        <div class="text-h6 text-center">User Registration</div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <q-input
          filled
          v-model="name"
          label="Full Name"
          type="text"
          dense
        />
        <q-input
          filled
          v-model="email"
          label="Email"
          type="email"
          dense
        />
        <q-input
          filled
          v-model="password"
          label="Password"
          type="password"
          dense
        />
      </q-card-section>

      <q-card-actions align="center">
        <q-btn color="primary" label="Register" @click="registerUser" />
        <q-btn flat label="Already have an account" color="grey" @click="goToLogin" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const { proxy } = getCurrentInstance()

const name = ref('')
const email = ref('')
const password = ref('')
const REGISTER_URL = 'http://alb-user-domain-gateway-1765996128.us-east-1.elb.amazonaws.com/users/'

const registerUser = async () => {
  if (!name.value || !email.value || !password.value) {
    proxy?.$q?.notify?.({
      type: 'warning',
      message: 'Please fill out all fields before registering',
      timeout: 2500
    })
    return
  }

  try {
    await axios.post(REGISTER_URL, {
      name: name.value,
      email: email.value,
      password: password.value
    })

    proxy?.$q?.notify?.({
      type: 'positive',
      message: 'User registered successfully',
      timeout: 2000
    })

    router.push('/') // Redirect to login
  } catch (error) {
    console.error('❌ Registration error:', error.response?.data || error)

    proxy?.$q?.notify?.({
      type: 'negative',
      message: error.response?.data?.error || 'Failed to register user',
      timeout: 3000
    })
  }
}

const goToLogin = () => {
  router.push('/')
}
</script>
