import { createRouter, createWebHistory } from 'vue-router'
import store from './store/index.js'

import HomePage from './pages/HomePage.vue'
import LoginPage from './pages/LoginPage.vue'
import RegisterPage from './pages/RegisterPage.vue'
import NotFound from './pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/register', component: RegisterPage, meta: {reqiresUnauth: true} },
    { path: '/login', component: LoginPage, meta: {reqiresUnauth: true} },
    { path: '/:notFound(.*)', component: NotFound },
  ],
  linkActiveClass: 'active'
})

router.beforeEach(async (to, from, next) => {
  if(!store.getters.userAuthenticated) {
    // check if the userAuthenticated getter changed in the store to a truthy value (it is initially null)
    await store.dispatch('checkAuth')
  }

  if(to.meta.reqiresUnauth && store.getters.userAuthenticated) {
    next('/')
  }else {
    next()
  }
})

export default router