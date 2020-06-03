<template>
  <section>
    <div v-if="RoleUser" class="ui attached stackable menu">
      <div class="ui container">
        <a href="#/" class="item">
          <i class="home icon"></i> Главная
        </a>

        <a href="#/send/" class="item">
          <i class="mail icon"></i> Заявка
        </a>
        <div class="right item">
          <a @click="exit()"  class="item">
            <i class="edit icon"></i> Выход
          </a>
        </div>
        <a href="#/admin" class="item">
          <i class="grid layout icon"></i> Админка
        </a>
      </div>
    </div>
    <div v-else-if="RoleUser==false" class="ui attached stackable menu">
      <div class="ui container">123
        <a href="#/" class="item">
          <i class="home icon"></i> Мои заявки
        </a>
        <a href="#/send/" class="item">
          <i class="mail icon"></i> Создать Заявку
        </a>
        <div class="right item">
          <a @click="exit()" class="item">
            <i class="edit icon"></i> Выход
          </a>
          <div class="ui input">
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="RoleUser==null" class="ui attached stackable menu">
      <div class="ui container">
        <a href="#/" class="item">
          <i class="home icon"></i> Главная
        </a>
        <div class="right item">
          <a href="#/login/" class="item">
            <i class="edit icon"></i> Вход
          </a>
          <div class="ui input">
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </div>
    </div>
    <h1></h1>
    <router-view />
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  computed:{
    RoleUser(){
      return this.$store.getters.getRole;
    }
  },
  methods:{
    exit(){
      this.$store.dispatch("exit") 
    }
  }
  
};
</script>


<style scope lang="scss">
.contant {
  //padding: 50px;
}
section {
  text-align: center;
  // width: 1200px;
  // margin: 0 auto;
}
</style>
