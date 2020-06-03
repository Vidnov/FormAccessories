<template>
  <div class="create_user">
    <form class="ui form user_create">
      <div class="field">
        <label>Фамилия</label>
        <input v-model="user.last_name" type="text" placeholder="Фамилия" />
        <label>Имя</label>
        <input v-model="user.first_name" type="text" placeholder="Имя" />
        <label>Отчество</label>
        <input v-model="user.middle_name" type="text" placeholder="Отчество" />
        <label>E-Mail</label>
        <input v-model="user.email" type="text" placeholder="E-Mail" />
        <label>Password</label>
        <input v-model="user.password" type="text" placeholder="Password" />
      </div>
      <div class="field">
        <div class="ui checkbox">
          <input v-model="user.admin" type="checkbox" tabindex="0" />
          <label>Администратор</label>
        </div>
      </div>
      <button v-on:click="createUser()" class="ui button">Создать</button>
    </form>
    <h1>{{result_create_user}}</h1>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "createuser",
  data: () => {
    return {
      result_create_user: null,
      user: {
        first_name: null,
        last_name: null,
        middle_name: null,
        email: null,
        password: null,
        admin: false
      },
      response: null
    };
  },
  methods: {
    createUser: function() {
      axios
        .post("http://localhost:3000/users/createuser", {
          body: this.user,
          headers: {
            Accept: "application/json",
            "access-Control-Allow-Origin": "http://localhost:3000/"
          },
          mode: "no-cors"
        })
        .then(response => {
          this.user.first_name = null;
          this.user.last_name = null;
          this.user.middle_name = null;
          this.user.email = null;
          this.user.password = null;
          this.user.admin = false;
          console.log(response);
          this.result_create_user = response.data;
          setTimeout(() => {
            this.result_create_user = null;
          }, 2000);
        })
        .catch(err => {
          console.log(err);
          this.result_create_user = err;
        });
    }
  }
};
</script>
