<template>
  <table class="ui single line celled table">
    <thead>
      <tr>
          <th>Name</th>
          <th>
            Заявка
            <tr>
              <th>Приоритет</th>
              <th>Тема</th>
              <th>ID TeamWeaver</th>
              <th>Отправитель</th>
              <th>Получатель</th>
              <th>Дата создания</th>
            </tr>
          </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in Result_request" v-bind:key="index">
        <td>
          <h5>
            {{ user.Last_Name }} {{ user.First_Name }} {{ user.Middle_Name }}
          </h5>
        </td>
        <td>
          <tr
            v-for="(request, index_request) in user.Request"
            v-bind:key="index_request"
            v-if="request"
          >
            <td v-if="request.Priority_Request">Cрочно</td>
            <td v-else>Обычный</td>
            <td>{{ request.Theme_Request }}</td>
            <td>{{ request.Id_TeamWeaver }}</td>
            <td>{{ request.Sender }}</td>
            <td>{{ request.Recipient }}</td>
            <td>{{ request.Date_Request }}</td>
            <td>
              <a v-bind:href="url">
                <button
                  @click="viewRequest(request._id)"
                  class="ui blue button"
                >
                  Просмотреть заявку
                </button>
              </a>
            </td>
          </tr>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import Axios from "axios";
export default {
  name: "TableRequest",
  data: () => {
    return {
      Result_request: "",
      Error_request: "",
      url: ""
    };
  },
  mounted() {
    Axios.get("http://localhost:3000/request/allrequest")
      .then(res => {
        this.Result_request = res.data;
      })
      .catch(e => {
        this.Error_request = e;
      });
  },
  methods: {
    createUser: function() {},
    viewRequest: function(id) {
      this.url = "#/request/" + id;
      Axios.get();
    }
  }
};
</script>
<style scoped>
.table_requests {
  display: grid;
  grid-template-columns: min-content auto;
}
</style>
