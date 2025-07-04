import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
import routes from './routes'
import axios from 'axios'

export default defineRouter(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach(async (to, from, next) => {
    const publicPages = ['login', 'register'] 
    const authRequired = !publicPages.includes(to.name)
    const token = localStorage.getItem('token')

    if (!authRequired) return next()

    if (!token) {
      return next({ name: 'login' })
    }

    try {
      const response = await axios.post('http://52.200.35.19/auth/validate-token', { token })

      if (response.data.valid === true) {
        return next()
      } else {
        localStorage.removeItem('access_token')
        return next({ name: 'login' })
      }
    } catch (err) {
      console.error('❌ Error al validar token:', err.message || err)
      localStorage.removeItem('access_token')
      return next({ name: 'login' })
    }
  })

  return Router
})
