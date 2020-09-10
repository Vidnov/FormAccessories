<template>
  <table class="ui violet table" >
      {{Message}}
    <thead>
      <tr>
        <th>Код точки</th>
        <th>Адрес</th>
        <th>Диллер</th>
        <th>E-Mail</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>
          <a>
            <button class="ui blue button">Редактировать точку</button>
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import axios from "axios";
export default {
  name: "All_Retail",
  data() {
    return {
        Message:''
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/retail/allretail")
      .then(response => {
        this.Message = response.data;
      })
      .catch(e => (err_list = e));
  },
  methods: {},
  components: {},
};
</script>

<style>
</style>