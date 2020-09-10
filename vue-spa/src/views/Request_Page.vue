<template>
  <section>
    {{Comments_block}}
    <div
      v-if="ViewRequest&Request.Complite===false&Close==false"
      class="ui raised very padded text container segment"
    >
      <h2 class="ui header">
        <i v-if="Request.Priority_Request&Close==false" class="hotjar icon"></i>
      </h2>
      <h2 class="ui header">Заявка №{{ Request.id }}</h2>
      <h3>Тема: {{ Request.Theme_Request }}</h3>
      <p>
        <b>Дата создания:</b>
        {{ Request.Date_Request }}
      </p>
      <p>
        <b>Отправитель:</b>
        {{ Request.Sender }}
      </p>
      <p>
        <b>Текст заявления:</b>
        <br />
        {{ Request.Text_Request }}
      </p>
      <p>
        <b>TeamWeaver:</b>
        {{ Request.ID_TeamWeaver }}
      </p>
      <p v-if="Request.Image_Name">
          <a target="_blank" :href="Img_Path"><img :src="Img_Path"/></a>
      </p>
      <br />
      <div v-if="Request.Status=='На Рассмотрении'&Close==false" class="ui buttons">
        <button class="ui positive button" v-on:click="accept(Request.Complite)">Принять</button>
        <div class="or"></div>
        <button class="ui button">Отказаться</button>
      </div>
      <div v-else-if="Request.Status=='В работе'&Close==false" class="ui buttons">
        <button class="ui positive button"  @click="closeRequest(Request.id)">Закрыть</button>
        <div class="or"></div>
        <button class="ui button">Отказаться</button>
      </div>
      <div v-else-if="Request.Status=='Закрыта'" class="ui buttons">
        <button class="ui button">Отказаться</button>
      </div>
    </div>
    <calendar v-else-if="Request.Complite===true" v-bind:id="Request.id"/>
    <div v-else-if="Close===false">
      <div class="ui negative message">
        <div class="header">{{Message}}</div>
        <p>Простите... Мы не нашли такую заявку....</p>
      </div>
    </div>
     <div v-if="Close===true" class="ui success message message_block">
      <i class="close icon" v-on:click="close_message()"></i>
      <div class="header">Заявка закрыта</div>
      <p>Вы можете изменить заявку обратившись к администратору сайта</p>
    </div>
    <comments v-if="Close===true" v-bind:id="Request.id"/>
   <commentsBlock v-if="Request.Status=='Закрыта'" v-bind:Comments="Comments_block" v-bind:ReqId="Request.id"/>
  </section>
</template>
<script>
import axios from "axios";
import calendar from "../components/calendar";
import comments from "../components/comments";
import commentsBlock from "../components/comments_block";
export default {
  name: "RequestPage",
  data() {
    return {
      Close:false, 
      Message: null,
      ViewRequest: true,
      Request: {
        Status:null,
        Image_Name:null,
        Date_Request: null,
        ID_TeamWeaver: null,
        Priority_Request: false,
        Recipiend: null,
        Sender: null,
        Text_Request: null,
        Theme_Request: null,
        id: null,
        Complite: false,
        Comments_block:[]
      },
      protocol: window.location.protocol,
      host: window.location.host,
      hash: window.location.hash.slice(1)
    };
  },
  computed:{
      Info(){
      return this.$store.getters.getInfo;
    },
  },
  methods: {
     accept:function(Complite) {
      this.Request.Complite= !Complite
     },
      closeRequest:function(id){
        this.Close=true
        console.log(this.$store.getters.getMail )
      const data ={
        id:id,
        mail: this.$store.getters.getMail 
      }
      this.$store.dispatch("close_request",data)
    }
  },
  components: {
    calendar,
    comments,
    commentsBlock
  },
  mounted() {
    axios
      .get("http://localhost:3000" + this.hash)
      .then(res => {
        console.log(res.data)
        if (res.status == 200) {
          this.Request.Date_Request = res.data.Date_Request;
          this.Request.id = res.data._id;
          this.Request.ID_TeamWeaver = res.data.Id_TeamWeaver;
          this.Request.Priority_Request = res.data.Priority_Request;
          this.Request.Recipiend = res.data.Recipient;
          this.Request.Sender = res.data.Sender;
          this.Request.Status = res.data.Status;
          this.Request.Text_Request = res.data.Text_Request;
          this.Request.Theme_Request = res.data.Theme_Request;
          this.Request.Image_Name = res.data.Image_Name;
          this.Img_Path='http://localhost:3000/'+this.Request.Image_Name
          this.Comments_block=res.data.Comments_block
        } else {
          this.ViewRequest = false;
          this.Message = res.data;
        }
      })
      .catch(e => {
        this.ViewRequest = false;
        console.log(e);
        this.Message = e;
      });
  }
};
</script>
<style  scoped>

img{
  width: 200px;
}
</style>