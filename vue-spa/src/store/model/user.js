import axios from "axios";
export default {
  state: {
    Mail: localStorage.HelpDeskMail,
    Role: undefined,
    First_Name: localStorage.HelpDeskFirstName,
    Last_Name: localStorage.HelpDeskLastName,
    Middle_Name: localStorage.HelpDeskMiddleName,
    Result_New: "",
    Result_Work: "",
    Result_Close: "",
    Result_Date: "",
    Err: "",
    Message: "",
    MessageWork: "",
    MessageClose: "",
    Info: "",
    Status:'',
    Comments:''
  },
  getters: {
    getRole(state) {
      return state.Role;
    },
    getComments(state){
      return state.Comments;
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
    getResultClose(state) {
      return state.Result_Close;
    },
    getMessage(state) {
      return state.Message;
    },
    getMessageWork(state) {
      return state.MessageWork;
    },
    getMessageClose(state) {
      return state.MessageClose;
    },
    getInfo(state) {
      return state.Info;
    },
    getError(state) {
      return state.Err;
    }
  },
  actions: {
    get_comments({commit},id){
    },
    get_request_user_close({ commit }, Mail) {
      axios({
        method: "post",
        url: "http://localhost:3000/request/get_request_user_close",
        data: {
          Mail: Mail
        }
      }).then(res => {
        console.log("Сервер на  запрос о закрытых  заявка отправил", res.data);
        console.log("Typeof", typeof res.data);
        if (typeof res.data != "object") {
          commit("set", { type: "Result_Close", items: "" });
          commit("set", { type: "MessageClose", items: res.data });
        } else {
          res.data.forEach(element => {
            commit("set", { type: "Result_Close", items: element });
          });
        }
      });
    },
    getrole({ commit }, Mail) {
      if (Mail === undefined) {
       
        commit("set", { type: "Role", items: undefined });
      } else {

        commit("set", {
          type: "Role",
          items: localStorage.HelpDeskRole
        });
      }
    },

    exit({ commit }) {
      localStorage.clear();
      commit("set", { type: "Role", items: undefined });
      commit("set", { type: "Mail", items: "" });
      commit("set", { type: "First_Name", items: "" });
      commit("set", { type: "Last_Name", items: "" });
      commit("set", { type: "Middle_Name", items: "" });
      commit("set", { type: "Result", items: "" });
      commit("set", { type: "Result_Work", items: "" });
      commit("set", { type: "Result_New", items: "" });
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
        console.log(res)
          if (res.status == 200) {
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
                if (r.data == "Новых заявок нет") {
                  console.log(r.data);
                  commit("del", { type: "Message", items: r.data });
                  commit("del", { type: "Result_New", items: "" });
                } else {
                  r.data.forEach(element => {
                    commit("set", { type: "Result_New", items: element });
                    commit("set", { type: "Message", items: "" });
                  });
                }
              })
              .catch(e => {
                //console.log(e);
              });
          }else if(res.status==201){
            commit("set", { type: "Err", items: res.data });
            setTimeout(()=>{
              commit("set", { type: "Err", items: '' });
            },3000)
          }
        })
        .catch(e => console.log(e));
    },
    update_seen_date_request_user({ commit }, dataRequest) {
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
    get_request_user_new({ commit }, User) {
      //получение  новых заявок
      commit("up", { type: "Result_Date", items: "" });
      axios({
        method: "post",
        url: "http://localhost:3000/request/get_user_request_new",
        data: {
          user: User
        }
      })
        .then(res => {
          if (typeof res.data != "object") {
            commit("del", { type: "Message", items: res.data });
            commit("del", { type: "Result_New", items: "" });
          } else {
            res.data.forEach(element => {
              if (element.Request == "") {
                commit("del", { type: "Message", items: element });
                commit("up", { type: "Result_New", items: "" });
              } else {
                commit("del", { type: "Message", items: "" });
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
          if (typeof res.data == "string") {
            commit("del", { type: "MessageWork", items: res.data });
          } else {
            res.data.forEach(element => {
              if (element.Request == "") {
                commit("del", {
                  type: "MessageWork",
                  items: "Заявок в работе нет"
                });
              } else {
                commit("up", { type: "Result_Work", items: element });
                commit("del", { type: "MessageWork", items: "" });
              }
            });
          }
        })
        .catch(e => {
          console.log(123);
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
    },
    close_request({ commit }, data) {
      axios({
        method: "post",
        url: "http://localhost:3000/request/close_request",
        data: {
          id: data.id,
          Mail: data.mail,
          Mail_Retail:data.mail_retail
        }
      })
        .then(res => {
          if (typeof res.data != "object") {
            commit("set", { type: "Result_Work", items: "" });
            commit("set", { type: "MessageWork", items: res.data });
            commit("set", { type: "Info", items: "Заявка закрыта" });
            setTimeout(() => {
              commit("set", { type: "Info", items: "" });
            }, 2000);
          } else {
            res.data.forEach(element => {
              commit("set", { type: "Result_Work", items: element });
              commit("del", { type: "Info", items: "Заявка закрыта" });
              setTimeout(() => {
                commit("set", { type: "Info", items: "" });
              }, 2000);
            });
          }
        })
        .catch(e => {
          console.error(e);
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
