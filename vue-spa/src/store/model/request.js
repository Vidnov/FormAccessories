import axios from "axios";
export default {
  state: {
    Result: null,
    RequestZero: false,
    Err: null,
    Mail:localStorage.HelpDeskMail
  },
  getters: {
    getResult(state) {
      return state.Result;
    },
    getRequestZero(state) {
      return state.RequestZero;
    },
    getErr(state) {
      return state.Err;
    }
  },
  actions: {
    exit({commit}){
        commit("del", { type: "RequestZero", items: true });
        commit("del", { type: "Mail", items: null });
    },
    // login({commit},User){
    //     axios({
    //         method: "post",
    //         url: "http://localhost:3000/users/login",
    //         data: {
    //           Login: User.Login,
    //           Password: User.Password
    //         }
    //       })
    //         .then(res => {
    //           if (res.data != "") {
    //             // commit("del", { type: "Mail", items: res.data.Mail });
    //           }
    //         })
    //         .catch(e => console.log(e));
    //     //  commit("set", { type: "Mail", items:localStorage.HelpDeskMail });
        
    // },

    get_request_user({ commit },User) {
      // console.log(User)
      axios({
        method: "post",
        url: "http://localhost:3000/request/get_user_request",
        data: {
          user:User
        }
      })
        .then(res => {
          commit("set", { type: "Result", items: res.data });
          res.data.forEach(element => {
            if (element.Request == "") {
              commit("del", { type: "RequestZero", items: true });
            }
          });
        })
        .catch(e => {
          this.err = e;
          commit("err", { type: "Err", items: e });
          // console.log(e)
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
