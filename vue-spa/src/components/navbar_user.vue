<template>
  <div  v-if="roleUser!=='true'&roleUser!==undefined&roleUser!==true" class="ui attached stackable menu">
    <div class="ui container">
      <a href="#/main" class="item">
        <i class="home icon"></i> Главная
      </a>

      <a href="#/" class="item">
        <i class="mail icon"></i> Заявка
      </a>
      <div class="right item">
        <a @click="exit()" class="item">
          <i class="edit icon"></i> Выход
        </a>
      </div>
    </div>
  </div>
</template>
    
    <script>
export default {
  name: "navbar_user",
  data(){
    return{

    }
  },
  methods:{
      exit() {
      this.$store.dispatch("exit");
      this.$router.push("/login");
    }
  },
  props:{
      roleUser:Boolean
  }
};
</script>
    
    <style>
</style>