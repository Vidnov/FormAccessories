<template>
  <div class="list_users">
    <div class="ui segment" v-if="result_users_list==null">
      <div class="ui active inverted dimmer">
        <div class="ui text loader">Loading</div>
      </div>
      <h1>{{info_users}}</h1>
      <h1>{{err_list}}</h1>
    </div>
    <div class="table_users" v-else>
      <table class="ui red table">
        <thead>
          <tr>
            <th>№</th>
            <th>id</th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Почта</th>
            <th>Права Администратора</th>
            <th></th>
          </tr>
        </thead>
        <tbody v-for="(user,index) in result_users_list" v-bind:key="index">
          <tr>
            <td>{{index}}</td>
            <td>{{user._id}}</td>
            <td>{{user.Last_Name}}</td>
            <td>{{user.First_Name}}</td>
            <td>{{user.Middle_Name}}</td>
            <td>{{user.Mail}}</td>
            <td>{{user.Role}}</td>
            <td>
              <button @click="deliteUser(user._id)" class="ui red button">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "ListUsers",
  data() {
    return {
      result_users_list: "",
      info_users: "Ведется поиск пользователей",
      err_list: null,
      response: null
    };
  },
  methods: {
    deliteUser: function(id) {
      axios
        .post("http://localhost:3000/users/deliteuser", {
          id: id,
          headers: {
            Accept: "application/json",
            "access-Control-Allow-Origin": "http://localhost:3000/"
          },
          mode: "no-cors"
        })
        .then(response => {
          this.response = response;
         this.result_users_list=response.data
        })
        .catch(err => (this.response = err));
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/users/getlistusers")
      .then(response => {
        console.log(response.data);
        this.result_users_list = response.data;
      })
      .catch(e => (err_list = e));
  }
};
</script>
<style scoped>
p {
  height: 300px;
}
</style>
