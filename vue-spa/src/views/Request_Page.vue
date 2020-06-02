<template>
  <h1>Страница заявки</h1>
</template>
<script>
import axios from "axios";
export default {
  name: "RequestPage",
  data() {
    return {
      protocol: window.location.protocol,
      host: window.location.host,
      hash: window.location.hash.slice(1)
    };
  },
  methods: {},
  mounted() {
    axios
      .get("http://localhost:3000" + this.hash)
      .then(res => {
        console.log(res.data);
      });
  }
};
</script>