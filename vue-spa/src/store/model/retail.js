import axios from "axios";
export default {
  state: {
    Retail: []
  },
  getters: {
    getRetail(state) {
      return state.Retail;
    }
  },
  actions: {
    exit({ commit }) {
      commit("del", { type: "RequestZero", items: true });
      commit("del", { type: "Mail", items: "" });
    }
  },
  mutations: {
    err(state, { type, items }) {
      state[type] = items;
    }
  }
};
