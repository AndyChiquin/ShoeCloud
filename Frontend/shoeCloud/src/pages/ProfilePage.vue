<template>
  <div class="q-pa-md">
    <q-card class="q-pa-lg q-mx-auto shadow-2" style="max-width: 500px">
      <q-card-section>
        <div class="text-h6 text-center">User Profile</div>
      </q-card-section>

      <q-card-section v-if="user">
        <q-input v-model="user.name" label="Name" filled />
        <q-input v-model="user.email" label="Email" filled />
        <q-input v-model="user.role" label="Role" filled readonly />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="Save" @click="updateProfile" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'

const $q = useQuasar() 

const user = ref(null)
const API_URL = 'http://alb-user-domain-gateway-1765996128.us-east-1.elb.amazonaws.com/users'

onMounted(async () => {
  console.log('TEST -> $q.notify:', $q.notify) 

  const id = localStorage.getItem('userId')
  if (!id) {
    $q.notify({ type: 'negative', message: 'User ID not found. Please login again.' })
    return
  }

  try {
    const res = await axios.get(`${API_URL}/${id}`)
    user.value = res.data
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Failed to load profile data' })
  }
})

const updateProfile = async () => {
  try {
    const body = {
      name: user.value.name,
      email: user.value.email
    }

    await axios.put(`${API_URL}/${user.value.id}`, body)

    $q.notify({ type: 'positive', message: 'Profile updated successfully!' }) 
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Failed to update profile' })
  }
}
</script>
