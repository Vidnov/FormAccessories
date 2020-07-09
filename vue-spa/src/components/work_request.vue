<template>
  <section>
    <h2 class="ui icon header message" v-if="result.Request==''||message" >
      <i class="settings icon"></i>
      <div class="content">
        Дорогой Друг
        <div class="sub header"><h2>{{message}}</h2></div>
        
      </div>
    </h2>
    <table class="ui violet table" v-else-if="result">
      <thead>
        <tr>
          <th>id</th>
          <th>Приоритет</th>
          <th>Тема</th>
          <th>ID TeamWeaver</th>
          <th>Отправитель</th>
          <th>Дата создания</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(request,indexRequest) in result.Request" v-bind:key="indexRequest">
          <td>{{request._id}}</td>
          <td v-if="request.Priority_Request">Срочно</td>
          <td v-else>Обычный</td>
          <td>{{request.Theme_Request}}</td>

          <td>{{request.Id_TeamWeaver}}</td>
          <td>{{request.Sender}}</td> 
          <td>{{request.Date_Request}}</td>
          <td>
            <a v-bind:href="url">
              <button @click="viewRequest(request._id)" class="ui blue button">Просмотреть заявку</button>
            </a>
             
              <button @click="closeRequest(request._id)" class="ui green button">Закрыть заявку</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script>
import Axios from "axios";
export default {
  name: "workRequest",

  computed: {
     message(){
      return this.$store.getters.getMessageWork;
    },
    result() {
      return this.$store.getters.getResultWork;
    },
    getErr() {
      return this.$store.getters.getErr;
    },
    Mail(){
      return this.$store.getters.getMail;
    }
  },
  data() {
    return {
      url: ""
    };
  },
  mounted() {
    this.$store.dispatch("get_request_user_work", this.$store.getters.getMail);
  },
  methods: {
    viewRequest: function(id) {
      this.url = "#/request/" + id;
    },
    closeRequest:function(id){
      const data ={
        id:id,
        mail: this.$store.getters.getMail 
      }
      this.$store.dispatch("close_request",data)
    }
  }
};
</script>
<style scoped>

</style>
