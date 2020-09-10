import Vue from 'vue'
import Vuex from 'vuex'
import users from './model/user'
import retail from './model/retail'
import request from './model/request'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  
  },
  actions: {

  },
  modules: {
  users,
  request,
  retail
  }
})