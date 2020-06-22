<template>
      <div  v-if="role===null||role===undefined" class="ui attached stackable menu">
      <div class="ui container">
        <a href="#/send/" class="item">
          <i class="mail icon"></i> Заявка
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
</template>
    <script>
export default {
  name: "navbar",
   props:{
      role:Boolean
  }
};
</script>
    
    <style>
</style>