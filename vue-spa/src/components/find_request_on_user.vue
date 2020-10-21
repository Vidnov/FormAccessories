<template>
  <section class="find">
    {{ Result_request }}
    {{ Executor }}
    <div class="ui form">
      <div class="field">
        <select class="ui search dropdown" @change="Find()" v-model="Executor">
          <option value="">Выберите Исполнителя</option>
          <option v-for="(Request, index) in Result_request" :key="index">
            {{ Request.Last_Name }} {{ Request.First_Name }}
            {{ Request.Middle_Name }}
          </option>
        </select>
      </div>

      <div class="number_request">
        <input
          @change="Find()"
          v-model="Id"
          placeholder="Введите id заявки"
          type="text"
          name=""
          id=""
        />
      </div>
      <div class="callendar">
        <input @change="Find()" v-model="DateRequest" type="date" />
      </div>
    </div>

    <table class="ui red table">
      <thead>
        <tr>
          <th>Food</th>
          <th>Calories</th>
          <th>Protein</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Apples</td>
          <td>200</td>
          <td>0g</td>
        </tr>
        <tr>
          <td>Orange</td>
          <td>310</td>
          <td>0g</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script>
import Axios from "axios";
export default {
  name: "TableRequest",
  data: () => {
    return {
      Id: "",
      DateRequest: "",
      Result_request: "",
      Executor: "",
      Error_request: "",
      url: "",
    };
  },
  mounted() {
    Axios.get("http://localhost:3000/request/allrequest")
      .then((res) => {
        this.Result_request = res.data;
      })
      .catch((e) => {
        this.Error_request = e;
      });
  },
  methods: {
      Find:function(){
          console.log('ok')
      }
  },
};
</script>
<style scoped>
section .find {
  padding: 50px;
}
.callendar {
  padding-top: 20px;
  height: 50%;
}
.table {
  margin-top: 100px;
}
.form {
  padding: 0 400px;
}
select {
  text-align: center;
}
</style>
