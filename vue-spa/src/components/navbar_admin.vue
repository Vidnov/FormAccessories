<template>
  <div v-if="roleAdmin===true" class="ui attached stackable menu">
    
    <div class="ui container">
      <a href="#/" class="item">
        <i class="home icon"></i> Главная
      </a>

      <a href="#/send/" class="item">
        <i class="mail icon"></i> Заявка
      </a>
      <div class="right item">
        <a @click="exit()" class="item">
          <i class="edit icon"></i> Выход
        </a>
      </div>
    
        <a href="#/admin" class="item">
          <i class="grid layout icon"></i> Админка
        </a>
    </div>
  </div>
</template>
    
    <script>
export default {
  name: "navbar_admin",     
  methods:{
      exit() {
      this.$store.dispatch("exit");
      this.$router.push("/login");
    }
  },
  props:{
      roleAdmin:Boolean
  }
};
</script>
    
    <style>
</style>