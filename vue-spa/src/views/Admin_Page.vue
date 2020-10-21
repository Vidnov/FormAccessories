<template>
  <section>
    <h1>Страница Администратора</h1>
    <div class="contant">
      <div class="ui vertical menu">
        <div class="item">
          <div class="header">Заявки</div>
          <div class="menu">
            <a class="item" @click="switchViews('tablerequest')">Все заявки</a>
            <a class="item" @click="switchViews('findrequest')">Поиск заявки</a>
            <a class="item">Горящие</a>
          </div>
        </div>
        <div class="item">
          <div class="header">Пользователи</div>
          <div class="menu">
            <a class="item" @click="switchViews('listusers')">Пользователи</a>
            <a class="item" @click="switchViews('createusers')">Завести нового пользователя</a>
            <a class="item">PHP</a>
          </div>
        </div>
        <div class="item">
          <div class="header">Точки</div>
          <div class="menu">
            <a class="item" @click="switchViews('allretail')">Список точек</a>
            <a class="item" @click="switchViews('createretail')">Создать точку</a>
          </div>
        </div>
        <div class="item">
          <div class="header">Support</div>
          <div class="menu">
            <a class="item">E-mail Support</a>
            <a class="item">FAQs</a>
          </div>
        </div>
      </div>

      <component v-bind:is="views"></component>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import allretail from "../components/all_retail";
import tablerequest from "../components/table_request";
import createusers from "../components/create_user";
import createretail from "../components/create_retail";
import listusers from "../components/list_users";
import findrequest from "../components/find_request_on_user";
export default {
  name: "AdminPage",
  data() {
    return {
      views: "tablerequest",
    };
  },
  methods: {
    switchViews: function (views) {
      this.views = views;
    },
  },
  components: {
    tablerequest,
    createusers,
    listusers,
    createretail,
    allretail,
    findrequest
  },
  // props: ['post'],
};
</script>

<style scope lang="scss">
.contant {
  display: grid;
  grid-gap: 50px;
  grid-template-columns: min-content auto;
}
section {
  text-align: center;
}
.create_user {
  text-align: left;
}
</style>
