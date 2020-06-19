import axios from "axios";
export default {
  state: {
    Mail: localStorage.HelpDeskMail,
    Role: localStorage.HelpDeskRole,
    First_Name: localStorage.HelpDeskFirstName,
    Last_Name: localStorage.HelpDeskLastName,
    Middle_Name: localStorage.HelpDeskMiddleName,
    Result_New: null,
    Result_Work:null,
    Result_Date:null,
    Err: null,
    Message:null

  },
  getters: {
    getRole(state) {
      return state.Role;
    },
    getMail(state) {
      return state.Mail;
    },
    getResultNew(state) {
      return state.Result_New;
    },
    getResultWork(state) {
      return state.Result_Work;
    },
    getResultDate(state) {
      return state.Result_Date;
    },
    getMessage(state) {
      return state.Message;
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
      commit("set", { type: "Result_Work", items: null });
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
              url: "http://localhost:3000/request/get_user_request_new",
              data: {
                user: res.data.Mail
              }
            })
              .then(r => {  
                if(r.data=="Новых заявок нет"){
                  console.log(r.data )
                  commit("del", { type: "Message", items: r.data });
                }else{
                  r.data.forEach(element => {
                  
                    commit("set", { type: "Result_New", items: element });
                    commit("set", { type: "Message", items: null });
                });
                }
               
              })
              .catch(e => {
                console.log(e);
              });
          }
        })
        .catch(e => console.log(e));
    },
    update_seen_date_request_user({commit},dataRequest){  
      axios({
        method: "post",
        url: "http://localhost:3000/request/request_update_date",
        data: {
          date: dataRequest.dateCompliteRequest,
          id: dataRequest.id
        }
      })
        .then(res => {
          commit("up", { type: "Result_Date", items: res.data });
        })
        .catch(e => {
          this.err = e;
          commit("err", { type: "Err", items: e });
        });
    },
    get_request_user_new({ commit }, User) { //получение  новых заявок
      commit("up",{type: "Result_Date", items: null })
      axios({
        method: "post",
        url: "http://localhost:3000/request/get_user_request_new",
        data: {
          user: User
        }
      })
        .then(res => {         
         console.log(typeof res.data)
          if(typeof res.data!="object"){
            commit("del", { type: "Message", items: res.data });
          }
          else{

            res.data.forEach(element => {
              if (element.Request == "") {
               
                commit("del", { type: "Result_New", items: element });
              } else {
                commit("del", { type: "Message", items: null });
                console.log(element)
                commit("up", { type: "Result_New", items: element });
              }
            });
          }
         
        })
        .catch(e => {
          this.err = e;
          commit("err", { type: "Err", items: e });
        });
    },
    get_request_user_work({ commit }, User) {
      axios({
        method: "post",
        url: "http://localhost:3000/request/get_request_user_work",
        data: {
          user: User
        }
      })
        .then(res => {
          
          res.data.forEach(element => {
            if (element.Request == "") {
              commit("del", { type: "RequestZero", items: true });
            } else {
              commit("up", { type: "Result_Work", items: element });

            
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
              commit("up", { type: "Result_New", items: element });

            
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
