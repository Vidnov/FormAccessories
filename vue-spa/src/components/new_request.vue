<template>
  <section>
    <!-- <div v-if="getErr" class="ui negative message">
      <i class="close icon"></i>
      <div class="header">Ошибка</div>
      <p>{{getErr}}</p>
    </div>-->

    <h2 v-if="result.Request==''" class="ui icon header">
      <i class="settings icon"></i>
      <div class="content">
        Дорогой Друг
        <div class="sub header">На данный момент у вас нет заявок</div>
      </div>
    </h2>

    <table v-else class="ui violet table">
      <thead>
        <tr>
          <th>id</th>
          <th>Приоритет</th>
          <th>Статус</th>
          <th>Тема</th>
          <th>ID TeamWeaver</th>
          <th>Отправитель</th>
          <th>Получатель</th>
          <th>Дата создания</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(request,indexRequest) in result.Request" v-bind:key="indexRequest">
          <td>{{request._id}}</td>
          <td v-if="request.Priority_Request">Срочно</td>
          <td v-else>Обычный</td>
          <td>{{request.Status}}</td>
          <td>{{request.Theme_Request}}</td>

          <td>{{request.Id_TeamWeaver}}</td>
          <td>{{request.Sender}}</td>
          <td>{{request.Recipient}}</td>
          <td>{{request.Date_Request}}</td>
          <td>
            <a v-bind:href="url">
              <button @click="viewRequest(request._id)" class="ui blue button">Просмотреть заявку</button>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <component v-bind:is="views"> </component>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "Index",

  computed: {
    result() {
      return this.$store.getters.getResult;
    },
    getErr() {
      return this.$store.getters.getErr;
    }
  },
  data() {
    return {
      url: ""
    };
  },
  mounted() {
    this.$store.dispatch("get_request_user", this.$store.getters.getMail);
  },
  methods: {
    viewRequest: function(id) {
      this.url = "#/request/" + id;
    }
  }
};
</script>
<style lang="scss">
</style>
