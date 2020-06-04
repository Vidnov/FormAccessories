<template>
  <section class="login">

    <div v-if="err" class="ui negative message">
      <i class="close icon"></i>
      <div class="header">Ошибка</div>
      <p>{{err}}</p>
    </div>
    <!-- <h2 v-if="result">Результат{{result}}</h2> -->
    <h2 v-if="RequestZero" class="ui icon header">
  <i  class="settings icon"></i>
  <div class="content">
   Дорогой Друг 
    <div class="sub header">На данный момент у вас нет заявок</div>
  </div>
</h2>
<table v-else-if="mail" class="ui violet table">
  <thead>
    <tr><th>Food</th>
    <th>Каллории</th>
    <th>Белок</th>
  </tr></thead><tbody>
    <tr>
      <td>Яблоки</td>
      <td>200</td>
      <td>0g</td>
    </tr>
    <tr>
      <td>Оранжевый</td>
      <td>310</td>
      <td>0g</td>
    </tr>
  </tbody>
</table>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "Index",
  data() {
    return {
      mail: localStorage.HelpDeskMail,
      result: null,
      err: null,
      RequestZero: false
    };
  },
  mounted() {
    axios({
      method: "post",
      url: "http://localhost:3000/request/get_user_request",
      data: {
        user: this.mail
      }
    })
      .then(res => {
        this.result = res.data;
        res.data.forEach(element => {
          if (element.Request == "") {
            this.RequestZero = true;
          }
        });
      })
      .catch(e => {
        this.err = e;
        // console.log(e)
      });
  },
  methods: {}
};
</script>
<style lang="scss">
</style>
