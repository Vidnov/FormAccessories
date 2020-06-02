import Vue from 'vue'
import VueRouter from 'vue-router'
import Form_Phone from '../views/Form_Phone.vue'
import Request_form from '../views/Request_form.vue'
import Login from '../views/Login.vue'
import AdminPage from '../views/Admin_Page.vue'
import RequestPage from '../views/Request_Page.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Form_Phone',
    component: Form_Phone
  },{
    path: '/send',
    name: 'Request form',
    component: Request_form
  },{
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'AdminPage',
    component: AdminPage
  },
  {
    path: '/request/:id',
    name: 'requestPage',
    component: RequestPage
  },

]

const router = new VueRouter({
  routes
})

export default router