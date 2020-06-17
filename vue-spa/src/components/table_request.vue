<template>
  <div class="block_table_request">
    <table class="ui single line celled table">
      <thead>
        <tr>
          <th>Name</th>
          <th>
            Заявка
            <tr>
              <th>Приоритет</th>
              <th>Статус</th>
              <th>Тема</th>
              <th>ID TeamWeaver</th>
              <th>Отправитель</th>
              <th>Дата создания</th>
            </tr>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in Result_request" v-bind:key="index">
          <td>
            <h5>{{ user.Last_Name }} {{ user.First_Name }} {{ user.Middle_Name }}</h5>
          </td>
          <td>
            <tr v-for="(request, index_request) in user.Request" v-bind:key="index_request">
              <td v-if="request.Priority_Request">Cрочно</td>
              <td v-else>Обычный</td>
              <td>{{ request.Status }}</td>
              <td>{{ request.Theme_Request }}</td>
              <td>{{ request.Id_TeamWeaver }}</td>
              <td>{{ request.Sender }}</td>
              <td>{{ request.Date_Request }}</td>
              <td>
                <a v-bind:href="url">
                  <button
                    @click="viewRequest(request._id)"
                    class="ui blue button"
                  >Просмотреть заявку</button>
                </a>
              </td>
              <td>
                <button @click="deliteRequest(request._id)" class="ui red button">Удалить заявку</button>
              </td>
            </tr>
          </td>
        </tr>
      </tbody>
      {{Error_request}}
    </table>
  </div>
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
    deliteRequest: function(id) {
      this.url = "/request/delete/" + id;
      console.log(id);

      Axios.post("http://localhost:3000" + this.url, {
        body: id,
        headers: {
          Accept: "application/json",
          "access-Control-Allow-Origin": "http://localhost:3000/"
        },
        mode: "no-cors"
      })
        .then(res => (this.Result_request = res.data))
        .catch(e => (this.Error_request = e));
    },
    viewRequest: function(id) {
      this.url = "#/request/" + id;
    }
  }
};
</script>
<style scoped>
.table_requests {
  display: grid;
  grid-template-columns: min-content auto;
}
.block_table_request{

}
</style>
