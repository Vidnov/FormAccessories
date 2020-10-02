<template>
  <div class="ui raised very padded text container segment">
    <div class="ui form">
      <div class="field">
        <h1>Вы Отклонили Завершение заявки №{{id}}</h1>
        <h3>Опишите ниже причину и прикрепите скриншот</h3>
        <h3>Заявка отправится на доработку</h3>
        <textarea v-model="Text_Comments"></textarea>
      </div>
      <h4>Прикрепить изображение</h4>
      <div class="input">
        <input id="file" @change="img" type="file" />
      </div>
      <br />
      <button @click="send_comment()" class="positive ui button">
        Отправить запрос
      </button>
    </div>
    <div v-if="Result" class="ui success message message_block">
      <i class="close icon" ></i>
      <div  class="header">Форма отправлена</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Comment_Applicant",
  computed: {},

  data() {
    return {
      img: "",
      Error_Status:'',
      Result: "",
      Text_Comments: "",
      protocol: window.location.protocol,
      host: window.location.host,
      hash: window.location.hash.slice(1),
      id: window.location.hash.slice(17),
    };
  },
  methods: {
      send_comment:function(){
          console.log('ok')
        axios
        .post("http://localhost:3000/request/comment_applicant/"+this.id, {
          Id: this.id,
          Text_Comments: this.Text_Comments,
        })
        .then((res) => {
          this.Result = res.data;
        })
        .catch((e) => {
          this.Error_Status = "true";
          this.Error_ = e;
        });
      }
  },
  mounted() {},
  components: {},
  props: {},
};
</script>

<style scoped>
.block_comments {
  width: auto;
  margin: 0 auto;
}
.comments {
  text-align: left;
}
</style>