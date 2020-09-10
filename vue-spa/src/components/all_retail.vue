<template>
  <table class="ui violet table">
    <thead>
      <tr>
        <th>Код точки</th>
        <th>Адрес</th>
        <th>Диллер</th>
        <th>E-Mail</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(Retail, i) in Message" v-bind:key="i">
        <td>{{Retail.Code_Retail}}</td>
        <td>{{Retail.Address_Retail}}</td>
        <td>{{Retail.Diller}}</td>
        <td>{{Retail.Mail_Retail}}</td>
        <td>
          <button @click="deliteRetail(Retail._id)" class="ui red button">Удалить</button>
        </td>
      </tr>
    </tbody>
    {{Delite}}
    {{Err_}}
  </table>
</template>
<script>
import axios from "axios";
export default {
  name: "All_Retail",
  data() {
    return {
      Message: "",
      Delite: "",
      Err_: "",
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/retail/allretail")
      .then((response) => {
        this.Message = response.data;
      })
      .catch((e) => (this.Err_ = e));
  },
  methods: {
    deliteRetail: function (id) {
      axios
        .post("http://localhost:3000/retail/deliteretail", {
          id: id,
          headers: {
            Accept: "application/json",
            "access-Control-Allow-Origin": "http://localhost:3000/",
          },
          mode: "no-cors",
        })
        .then((response) => {
          this.Message = response.data;
        })
        .catch((err) => (this.Err_ = err));
    },
  },
  components: {},
};
</script>

<style>
</style>