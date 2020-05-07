import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.config.productionTip = false

new Vue({
    axios,
    render: h => h(App)
}).$mount('#app')