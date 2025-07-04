<template>
  <div id="q-app">
    <NavBar v-if="showNavbar" />
    <router-view />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const showNavbar = computed(() => {
  return route.name !== 'login' && route.name !== 'register'
})
</script>
