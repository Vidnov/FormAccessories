<template>
  <section>
    <div
      v-if="result==null||result==false"
      class="ui raised very padded text container segment calendar_main"
    >
      <h2 class="ui header">Выберите дату выполнения</h2>
      <div class="calendar_block">
        <input type="date" v-model="dateCompliteRequest" name="calendar" />
      </div>
      <div class="button_block">
        <div class="ui buttons">
          <button class="ui positive button" v-on:click="send_confirmation(id)">Save</button>
          <div class="or"></div>
          <button @click="viewRequest()" class="ui red button">Cancel</button>
        </div>
      </div>
    </div>
    <div v-else-if="result!= null" class="ui success message message_block">
      <i class="close icon" v-on:click="close_message()"></i>
      <div class="header">{{result}}</div>
      <p>Вы можете изменить заявку обратившись к администратору сайта</p>
    </div>
    <errorMessage v-if="error" v-bind:error_message="error" />
  </section>
</template>

<script>
import axios from "axios";
import errorMessage from "../components/error";
export default {
  name: "calendar",
  data() {
    return {
      dateCompliteRequest: null,
      result: null,
      error: null
    };
  },
  methods: {
    send_confirmation: function(id) {
      if (this.dateCompliteRequest != null) {
        console.log("выбрана дата", this.dateCompliteRequest, id);
        axios({
          method: "post",
          url: "http://localhost:3000/request/request_update_date",
          data: {
            date: this.dateCompliteRequest,
            id: id
          },
          mode: "no-cors"
        })
          .then(res => {
            this.result = res.data;
            if (this.result != null) {
              setTimeout(() => {
                (this.result = null),
                  this.$router.push("/").catch(e => {
                    this.error = e;
                  });
              }, 2000);
              console.log(res.data);
            }
          })
          .catch(e => {
            this.error = e;
          });
      }
    },
    close_message: function() {
      this.$router.push("/").catch(err => console.err(err));
    },
    Completion_date: function() {
      if (this.dateCompliteRequest != null) {
        console.log("выбsрана дата", this.dateCompliteRequest);
      }
    }
  },
  components: {
    errorMessage
  },
  props: {
    id: String
  }
};
</script>

<style>
.message_block {
  margin-top: 150px;
}
input[type="date"] {
  height: 45px;
  width: 50%;
  text-align: center;
  font-size: x-large;
}
.calendar_main {
  position: absolute;
}
.calendar_block {
  margin-top: 25px;
}
.button_block {
  margin-top: 50px;
}
</style>