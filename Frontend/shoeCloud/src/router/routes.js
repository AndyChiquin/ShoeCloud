const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
  { path: '', name: 'login', component: () => import('pages/LoginPage.vue') },
  { path: 'dashboard', name: 'dashboard', component: () => import('pages/DashboardPage.vue'), meta: { requiresAuth: true } },
  { path: 'admin-dashboard', name: 'admin-dashboard', component: () => import('pages/AdminDashboard.vue'), meta: { requiresAuth: true } },
  { path: '/register', name: 'register', component: () => import('pages/RegisterPage.vue') },
  // { path: 'products', component: () => import('pages/ProductsPage.vue') },
  // { path: 'orders', component: () => import('pages/OrdersPage.vue') },
  // { path: 'feedbacks', component: () => import('pages/FeedbacksPage.vue') },
   { path: 'profile', component: () => import('pages/ProfilePage.vue') }

]


  },

  // Ruta de error 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
