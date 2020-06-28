<template>
  <div class="contant">
    <div class="ui massive vertical menu">
      <a class="item" @click="switchViews('newRequest')">
        <div class="ui small teal label">1</div>Новые заявки
      </a>
      <a class="item" @click="switchViews('workRequest')">
        <div class="ui small label">51</div>В работе
      </a>
      <a class="item" @click="switchViews('closeRequest')">
        <div class="ui small label">1</div>Завершенные
      </a>
       <a class="item" @click="switchViews()">
        <div class="ui small label">1</div>Отклоненные
      </a> 
      <div class="item">
        <div class="ui icon input">
          <input type="text" placeholder="Поиск письма" />
          <i class="search icon"></i>
        </div>
      </div>
    </div>
    <component v-bind:is="views"></component>
  </div>
</template>

<script>
import newRequest from "../components/new_request";
import workRequest from "../components/work_request";
import closeRequest from "../components/close_request";
import axios from "axios";
export default {
  name: "Index",
  data() {
    return {
      views: "newRequest"
    };
  },
  methods: {
     switchViews: function(views) {
      this.views = views;
    }
  },
  components: {
    newRequest,
    workRequest,
    closeRequest
  }
};
</script>
<style lang="scss">
.contant {
  margin-top: 25px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: min-content auto;
}
</style>
