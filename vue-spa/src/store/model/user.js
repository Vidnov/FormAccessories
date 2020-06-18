import axios from "axios";
export default {
  state: {
    Mail: localStorage.HelpDeskMail,
    Role: localStorage.HelpDeskRole,
    First_Name: localStorage.HelpDeskFirstName,
    Last_Name: localStorage.HelpDeskLastName,
    Middle_Name: localStorage.HelpDeskMiddleName,
    Result: null,
    // RequestZero: false,
    Err: null
  },
  getters: {
    getRole(state) {
      return state.Role;
    },
    getMail(state) {
      return state.Mail;
    },
    getResult(state) {
      return state.Result;
    }
  },
  actions: {

    exit({ commit }) {
      localStorage.clear();
      commit("set", { type: "Role", items: null });
      commit("set", { type: "Mail", items: null });
      commit("set", { type: "First_Name", items: null });
      commit("set", { type: "Last_Name", items: null });
      commit("set", { type: "Middle_Name", items: null });
      commit("set", { type: "Result", items: null });
    },

    login({ commit }, User) {
      axios({
        method: "post",
        url: "http://localhost:3000/users/login",
        data: {
          Login: User.Login,
          Password: User.Password
        }
      })
        .then(res => {
          if (res.data != "") {
            localStorage.HelpDeskRole = res.data.Role;
            localStorage.HelpDeskMail = res.data.Mail;
            localStorage.HelpDeskFirstName = res.data.First_Name;
            localStorage.HelpDeskLastName = res.data.Last_Name;
            localStorage.HelpDeskMiddleName = res.data.Middle_Name;

            commit("del", { type: "Role", items: res.data.Role });
            commit("del", { type: "Mail", items: res.data.Mail });
            axios({
              method: "post",
              url: "http://localhost:3000/request/get_user_request",
              data: {
                user: res.data.Mail
              }
            })
              .then(r => {
                r.data.forEach(element => {
                  commit("set", { type: "Result", items: element });
                });
              })
              .catch(e => {
                console.log(e);
              });
          }
        })
        .catch(e => console.log(e));
    },
    update_seen_request_user({commit},id_request){ // Скорее всего  можно удалить
      axios({
        method: "post",
        url: "http://localhost:3000/request/update_seen_request_user",
        data: {
          id_request: id_request
        }
      })
        .then(res => {
          
          res.data.forEach(element => {
            if (element.Request == "") {
              commit("del", { type: "RequestZero", items: true });
            } else {
              commit("up", { type: "Result", items: element });

            
            }
          });
        })
        .catch(e => {
          this.err = e;
          commit("err", { type: "Err", items: e });
        });
    },
    get_request_user_new({ commit }, User) {
      axios({
        method: "post",
        url: "http://localhost:3000/request/get_user_request_new",
        data: {
          user: User
        }
      })
        .then(res => {
          
          res.data.forEach(element => {
            if (element.Request == "") {
              commit("del", { type: "RequestZero", items: true });
            } else {
              commit("up", { type: "Result", items: element });

            
            }
          });
        })
        .catch(e => {
          this.err = e;
          commit("err", { type: "Err", items: e });
        });
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
            } else {
              commit("up", { type: "Result", items: element });

            
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
    up(state, { type, items }) {
      state[type] = items;
    }
  }
};
