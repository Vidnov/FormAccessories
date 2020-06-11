import axios from "axios";
export default {
  state: {
    RequestZero: false,
    Err: null,
    Mail: localStorage.HelpDeskMail
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

    get_request_user({ commit }, User) {
      axios({
        method: "post",
        url: "http://localhost:3000/request/get_user_request",
        data: {
          user: User
        }
      })
        .then(res => {
          res.data.forEach(element => {
            if (element.Request == "") {

              commit("del", { type: "RequestZero", items: true });
            }
          });
        })
        .catch(e => {
          this.err = e;
          commit("err", { type: "Err", items: e });
        });
    }
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
