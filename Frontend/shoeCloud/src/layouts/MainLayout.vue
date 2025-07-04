<template>
  <q-layout view="hHh lpR fFf">

    <q-header v-if="showNavbar" elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title
          class="text-h6 text-weight-bold cursor-pointer"
          @click="goToDashboard"
        >
          ShoeCloud
        </q-toolbar-title>

        <q-btn v-if="!isAdmin" flat dense label="Products" to="/products" />
        <q-btn v-if="!isAdmin" flat dense label="Orders" to="/orders" />
        <q-btn v-if="!isAdmin" flat dense label="Feedbacks" to="/feedbacks" />
        <q-btn v-if="!isAdmin" flat dense label="Profile" to="/profile" />

        <q-btn v-if="isAdmin" flat dense label="Users" to="/admin-dashboard" />
        <q-btn v-if="isAdmin" flat dense label="Rols" to="/admin-roles" />
        <q-btn v-if="isAdmin" flat dense label="Profile Admin" to="/admin-profile" />
        <q-btn v-if="isAdmin" flat dense label="Add Products" to="/admin-products" />


        <q-space />

        <div class="q-mr-md text-caption">{{ currentDate }}</div>

        <q-btn flat dense icon="logout" label="Logout" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const router = useRouter()
const route = useRoute()

// Fecha y hora actual
const currentDate = ref('')
let interval = null

const updateDate = () => {
  const now = new Date()
  currentDate.value =
    now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) + ' | ' + now.toLocaleTimeString('es-EC')
}

onMounted(() => {
  updateDate()
  interval = setInterval(updateDate, 1000)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})

// Logout: limpia todo
const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('role')
  router.push('/')
}

// Redirección al dashboard correcto
const goToDashboard = () => {
  const role = localStorage.getItem('role')
  router.push(role === 'admin' ? '/admin-dashboard' : '/dashboard')
}

// Mostrar barra si no estamos en login/register
const showNavbar = computed(() => {
  return route.path !== '/' && route.path !== '/register'
})

// Mostrar elementos de admin
const isAdmin = computed(() => {
  const role = localStorage.getItem('role')
  return role === 'admin' || route.path.startsWith('/admin')
})
</script>

