<template>
  <section>
    <div class="ui attached stackable menu">
  <div class="ui container">
    <a href="#/"  class="item">
      <i class="home icon"></i> Главная
    </a>
    <a href="#/admin" class="item">
      <i class="grid layout icon"></i> В разработке
    </a>
    <a href="#/send/" class="item">
      <i class="mail icon"></i> Заявка
    </a>
    <div class="right item">
       <a  href="#/login/" class="item"><i class="edit icon"></i> Login</a>
      <div class="ui input"><input type="text" placeholder="Search..."></div>
    </div>
  </div>
</div>
    <router-view />
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      classObject: {
        active: false
      },
      methods: {
        
      }
    };
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
