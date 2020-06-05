import axios from "axios";
export default {
  state: {
    Mail: localStorage.HelpDeskMail,
    Role: localStorage.HelpDeskRole,
    First_Name: localStorage.HelpDeskFirstName,
    Last_Name: localStorage.HelpDeskLastName,
    Middle_Name: localStorage.HelpDeskMiddleName
  },
  getters: {
    getRole(state) {
      return state.Role;
    }
  },
  actions: {
    exit({ commit }) {
      localStorage.clear();
      commit("set", { type: "Role", items: null });
      
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
          }
        })
        .catch(e => console.log(e));
    }
  },
  mutations: {
    set(state, { type, items }) {
      state[type] = items;
    },

    del(state, { type, items }) {
      state[type] = items;
    }
  }
};
