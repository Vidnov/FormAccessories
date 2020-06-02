<template>
  <section>
    <div
      v-if="ViewRequest"
      class="ui raised very padded text container segment"
    >
      <h2 class="ui header">
        <i v-if="Request.Priority_Request" class="hotjar  icon"></i>
      </h2>
      <h2 class="ui header">Заявка №{{ Request.id }}</h2>
      <h3>Тема: {{ Request.Theme_Request }}</h3>
      <p><b>Дата создания:</b>{{ Request.Date_Request }}</p>
      <p><b>Отправитель:</b>{{ Request.Sender }}</p>
      <p><b>Текст заявления:</b><br />{{ Request.Text_Request }}</p>
      <p><b>TeamWeaver:</b>{{ Request.ID_TeamWeaver }}</p>
      <br />
      <div class="ui buttons">
        <button class="ui button">Принять</button>
        <div class="or"></div>
        <button class="ui positive button">Отказаться</button>
      </div>
    </div>
    <div v-else>
      <div class="ui negative message">
        <div class="header">{{Message}}</div>
        <p>Простите... Мы не нашли такую заявку....</p>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
export default {
  name: "RequestPage",
  data() {
    return {
      Message:null,
      ViewRequest: true,
      Request: {
        Date_Request: null,
        ID_TeamWeaver: null,
        Priority_Request: false,
        Recipiend: null,
        Sender: null,
        Text_Request: null,
        Theme_Request: null,
        id: null
      },
      protocol: window.location.protocol,
      host: window.location.host,
      hash: window.location.hash.slice(1)
    };
  },
  methods: {},
  mounted() {
    axios.get("http://localhost:3000" + this.hash).then(res => {
      console.log(res.data)
      if (res.status == 200) {
        this.Request.Date_Request = res.data.Date_Request;
        this.Request.id = res.data._id;
        this.Request.ID_TeamWeaver = res.data.Id_TeamWeaver;
        this.Request.Priority_Request = res.data.Priority_Request;
        this.Request.Recipiend = res.data.Recipient;
        this.Request.Sender = res.data.Sender;
        this.Request.Text_Request = res.data.Text_Request;
        this.Request.Theme_Request = res.data.Theme_Request;
      } else {
        this.ViewRequest = false;
        this.Message=res.data
      }
    })
    .catch(e=>{
       this.ViewRequest = false;
      console.log(e)
      this.Message=e
    });
  }
};
</script>
