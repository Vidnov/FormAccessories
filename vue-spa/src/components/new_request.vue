<template>
  <section>
    <h2  class="ui icon header" v-if="message">
      <i class="settings icon"></i>
      <div class="content">
        Дорогой Друг
        <div class="sub header"><h2>{{message}}</h2></div>
      </div>
    </h2>  
    <table class="ui violet table" v-if="result">
  
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
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "newRequest",

  computed: {
    message(){
      return this.$store.getters.getMessage;
    },
    result() {
      return this.$store.getters.getResultNew;
    },
    getErr() {
      return this.$store.getters.getErr;
    }
  },
  data() {
    return {
      url: ''
    };
  },
  mounted() {
    console.log(this.$store.getters.getMail)
    this.$store.dispatch("get_request_user_new", this.$store.getters.getMail);
  },
  methods: {
    viewRequest: function(id) {
      this.url = "#/request/" + id;
      this.$store.dispatch("update_seen_request_user",id)
    }
  }
};
</script>
<style lang="scss">
</style>
