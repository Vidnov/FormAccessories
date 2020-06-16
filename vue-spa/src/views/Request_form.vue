<template>
  <section>
    <div class="container">
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
import axios from "axios";
export default {
  name: "Sending_form",
  data() {
    return {
      Priority_Request: false,
      Sender: null,
      Id_TeamWeaver: null,
      Recipient: null,
      Recipients: [],
      Theme_Request: null,
      Text_Request: null,
      Result_Request: "",
      Error_Request: ""
    };
  },
  mounted() {
    axios.get("http://localhost:3000/users/getlistusers", {}).then(res_user => {
      console.log(res_user.data);
      this.Recipients = res_user.data;
    });
  },
  methods: {
    send: function() {
      if (
        this.Priority_Request == null ||
        this.Sender == null ||
        this.Id_TeamWeaver == null ||
        this.Recipient == null ||
        this.Theme_Request == null ||
        this.Text_Request == null
      ) {
        this.Error_Request = "Не все поля заполнены!";
        setTimeout(() => {
          this.Error_Request = "";
        }, 2000);
      } else {
        axios({
          method: "post",
          url: "http://localhost:3000/mail",
          data: {
            Priority_Request: this.Priority_Request,
            Sender: this.Sender,
            Id_TeamWeaver: this.Id_TeamWeaver,
            Mail: this.Recipient,
            Theme_Request: this.Theme_Request,
            Text_Request: this.Text_Request
          }
        })
          .then(response => {
            console.log(response.data);
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
          .catch(e => {
            console.log(e);
          });
      }
    }
  }
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
