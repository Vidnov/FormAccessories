import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.config.productionTip = false

new Vue({
    axios,
    router,
    store,
    render: h => h(App)
}).$mount('#app')