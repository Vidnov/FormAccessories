<template>
  <section>
    <errorMessage v-bind:error_message="Error_Message" v-if="Error_Message" />
    <div class="container" v-else>
      <h1 class="ui dividing header">Создать заявку</h1>
      <div class="ui placeholder segment">
        <div class="ui form">
          <h4>Приоритет заявки</h4>
          <div class="select">
            <select v-model="Priority_Request">
              <option value="false">Обычный</option>
              <option value="true">Срочно</option>
            </select>
          </div>
          <h4>Точка</h4>
          <div class="select">
            <select class="ui fluid dropdown" v-model="Sender">
              <option value="Шуя Васелевского">Шуя Васелевского</option>
              <option value="Кострома Ткачей">Кострома Ткачей</option>
              <option value="Ленина 7">Ленина 7</option>
            </select>
          </div>
          <h4>Введите ID TeamWeaver</h4>
          <div class="input">
            <input
              v-model="Id_TeamWeaver"
              type="text"
              name="first-name"
              placeholder="ID teamweaver"
            />
            <h4>Прикрепить изображение</h4>
            <div class="input">
              <input id="file" @change="sync" type="file" />
            </div>
          </div>
          <h4>Выберите получателя</h4>
          <div class="select">
            <select v-model="Recipient">
              <option
                v-for="(User,index) in Recipients"
                v-bind:key="index"
                v-bind:value="User.Mail"
              >{{User.Last_Name}} {{User.First_Name}} {{User.Middle_Name}}</option>
            </select>
            <div class="ui placeholder segment">
              <h4>Тема Заявки</h4>
              <div class="input">
                <input
                  v-model="Theme_Request"
                  type="text"
                  name="first-name"
                  placeholder="ID teamweaver"
                />
              </div>

              <h4>Суть проблемы</h4>
              <div class="field">
                <label>Text</label>
                <textarea v-model="Text_Request"></textarea>
              </div>
            </div>
          </div>
        </div>

        <br />
        <button v-on:click="send" class="positive ui button">Отправить запрос</button>
      </div>

      <h1 v-if="Result_Request">{{Result_Request}}</h1>
      <h1 class="error" v-if="Error_Request">{{Error_Request}}</h1>
    </div>
  </section>
</template>

<script>
import errorMessage from "../components/error";
import axios from "axios";
export default {
  name: "Sending_form",
  data() {
    return {
      Error_Message: null,
      Image: "",
      ImageName: null,
      Priority_Request: false,
      Sender: null,
      Id_TeamWeaver: null,
      Recipient: null,
      Recipients: [],
      Theme_Request: null,
      Text_Request: null,
      Result_Request: "",
      Error_Request: "",
    };
  },
  components: {
    errorMessage,
  },
  mounted() {
    axios
      .get("http://localhost:3000/users/getlistusers", {})
      .then((res_user) => {
        this.Recipients = res_user.data;
      });
  },
  methods: {
    sync: function (e) {
      e.preventDefault();
      this.Image = e.target.files[0];
    },
    send: function () {

        let image_obj =(image)=>{
         if (image != "") {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = image.name.split(".").reverse()[0];
        this.ImageName = uniqueSuffix + "." + ext;
        let formData = new FormData();
        formData.append("file", image, this.ImageName);
         return formData
        }
     
      }
       console.log(image_obj(this.Image))
      if (
        this.Priority_Request == null ||
        this.Sender == null ||
        this.Id_TeamWeaver == null ||
        this.Recipient == null ||
        this.Theme_Request == null ||
        this.Text_Request == null
      ) {
        ///Ошибка не вылезает поправить
        this.Error_Request = "Не все поля заполнены!";
        setTimeout(() => {
          this.Error_Request = "";
        }, 2000);
      } else {
        axios
          .post("http://localhost:3000/mail/upload", image_obj(this.Image), {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.Result_Request = res.data;
          });
        axios({
          method: "post",
          url: "http://localhost:3000/mail",
          data: {
            Image_Name: this.ImageName,
            Priority_Request: this.Priority_Request,
            Sender: this.Sender,
            Id_TeamWeaver: this.Id_TeamWeaver,
            Mail: this.Recipient,
            Theme_Request: this.Theme_Request,
            Text_Request: this.Text_Request,
          },
        })
          .then((response) => {
            this.Result_Request = response.data;
            this.Priority_Request = null;
            this.Sender = null;
            this.Id_TeamWeaver = null;
            this.Recipient = null;
            this.Theme_Request = null;
            this.Text_Request = null;
            setTimeout(() => {
              this.Result_Request = "";
            }, 2000);
          })
          .catch((e) => {
            Error_Message = e;
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
body {
  text-align: center;
}
.column {
  background-color: red;
}
.contant {
  padding: 50px;
}
section {
  width: 1200px;
  margin: 0 auto;
}
option {
  height: 150px;
}
</style>
