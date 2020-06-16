import axios from "axios";
export default {
  state: {
    RequestZero: false,
    Err: null,
    Mail: localStorage.HelpDeskMail,
    
  },
  getters: {
    getRequestZero(state) {
      return state.RequestZero;
    },
    getErr(state) {
      return state.Err;
    }
  },
  actions: {
    exit({ commit }) {
      commit("del", { type: "RequestZero", items: true });
      commit("del", { type: "Mail", items: null });
    },

  
  },
  mutations: {
    set(state, { type, items }) {
      state[type] = items;
    },
    del(state, { type, items }) {
      state[type] = items;
    },
    err(state, { type, items }) {
      state[type] = items;
    }
  }
};
