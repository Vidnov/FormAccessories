<template>
  <section>
    <nav>
      <div class="ui secondary pointing menu">
        <a href="#/" class="item">Home</a>
        <a href="#/send/" class="item">Messages</a>
        <div class="right menu">
          <a href="#/login/" class="ui item">Logout</a>
        </div>
      </div>
    </nav>
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
