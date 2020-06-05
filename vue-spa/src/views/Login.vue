<template>
  <section class="login">
    <h1>{{test}}</h1>
    <form class="ui form">
      <div class="field">
        <label>Введите Логин</label>
        <input type="text" v-model="User.Login" placeholder="Логин" />
      </div>
      <div class="field">
        <label>Введите Пароль</label>
        <input type="Password" v-model="User.Password" placeholder="Пароль" />
      </div>
      <div class="field">
        <div class="ui checkbox">
          <input type="checkbox" tabindex="0" />
          <label>Я являюсь сотрудником Сотикс</label>
        </div>
      </div>
      <button @click="sending_data_login()" class="ui button">Войти</button>
    </form>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      test: this.$store.state.users.test,
      User: { Login: null, Password: null },
      Result: null
    };
  },
  methods: {
    sending_data_login: function() {
      this.$store.dispatch("login", this.User);
      this.User.Login=null,
      this.User.Password=null
      this.$router.push("/").catch(err => console.err(err));
    }
  }
};
</script>


<style lang="scss">
.login {
  padding-top: 300px;
  margin: 0 auto;
  width: 1200px;
}
</style>
