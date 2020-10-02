<template>
  <div class="ui raised very padded text container segment">
    
    <div v-if="Result_Status==''" class="ui form">
      <div class="field">
        <h1>Вы можете оставить комментарий и прикрепить скрин</h1>
        <textarea v-model="Сomments"></textarea>
      </div>
      <h4>Прикрепить изображение</h4>
      <div class="input">
        <input id="file" @change="img" type="file" />
      </div>
      <br />
      <button v-on:click="send" class="positive ui button">Отправить запрос</button>
    </div>
    <errormessage v-if="Error_Status=='true'" v-bind:error_message="Error_" />
    <div v-if="Result_Status=='true'" class="ui success message message_block">
      <i class="close icon" v-on:click="close_message()"></i>
      <div class="header">Форма отправлена</div>
    </div>
  </div>
  
</template>

<script>
import axios from "axios";
import errormessage from "../components/error";
export default {
  name: "comments",
  computed: {},
  data() {
    return {
      Sender:localStorage.HelpDeskMail,
      Сomments: "",
      Image: "",
      Result: "",
      Result_Status:"",
      Error_: "",
      Error_Status: "",
      ImageName: "",
    };
  },
  methods: {
    img: function (e) {
      e.preventDefault();
      this.Image = e.target.files[0];
    },
    send: function () {
      console.log(this.$props.id)
      let image_obj = (image) => {
        if (image != "") {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = image.name.split(".").reverse()[0];
          this.ImageName = uniqueSuffix + "." + ext;
          let formData = new FormData();
          formData.append("file", image, this.ImageName);
          return formData;
        }
      };
      if (this.Image) {
        axios
          .post(
            "http://localhost:3000/mail/upload_comments",
            image_obj(this.Image),
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
           
            this.Result = res.data;
          })
          .catch((err) => {
            console.log(err)
            this.Error_Status = "true";
            this.Error_ = err;
          });
      }
  
      axios
        .post("http://localhost:3000/request/comments", {
          Id:this.$props.id,
          Comment: this.Сomments,
          Sender: this.Sender,
          ImageName: this.ImageName
        })
        .then((res) => {
          this.Result_Status ="true";
          this.Result = res.data;

        })
        .catch((e) => {
          this.Error_Status = "true";
          this.Error_ = e;
        });
    },
  },
  components: { errormessage },
  props: {
    id: String,
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
}
</style>