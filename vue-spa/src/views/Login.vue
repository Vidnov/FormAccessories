<template>
  <section class="login">
    <form class="ui form">
      <div class="field">
        <label>Введите Логин</label>
        <input type="text" name="Login" placeholder="Логин" />
      </div>
      <div class="field">
        <label>Введите Пароль</label>
        <input type="Password" name="Password" placeholder="Пароль" />
      </div>
      <div class="field">
        <div class="ui checkbox">
          <input type="checkbox" tabindex="0"/>
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
      Login:null,
      Password:null
    };
  },
  methods:{
    sending_data_login:function(){
      console.log('ok')
    }
  }
};
</script>


<style lang="scss">
.login{
  padding-top: 300px;
  margin: 0 auto;
  width: 1200px;
}
</style>
