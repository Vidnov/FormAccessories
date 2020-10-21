<template>
  <section>
    <div
      v-if="result == null || result == false"
      class="ui raised very padded text container segment calendar_main"
    >
      <h2 class="ui header">Выберите дату выполнения</h2>
      <div class="calendar_block">
        <input
          class="calendar"
          @change="viewButton()"
          type="datetime-local"
          v-model="dateCompliteRequest"
          name="calendar"
        />
      </div>
      <div v-if="DateView" class="button_block">
        <div class="ui buttons">
          <button class="ui positive button" v-on:click="send_confirmation(id)">
            Save
          </button>
          <div class="or"></div>
          <button @click="viewRequest()" class="ui red button">Cancel</button>
        </div>
      </div>
      <div  class="errorMessage" v-else>
        <errorMessage v-bind:error_message="Error_Message" />
      </div>
    </div>

    <div v-else-if="result != null" class="ui success message message_block">
      <i class="close icon" v-on:click="close_message()"></i>
      <div class="header">{{ result }}</div>
      <p>Вы можете изменить заявку обратившись к администратору сайта</p>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import errorMessage from "../components/error";
export default {
  name: "calendar",
  computed: {
    result() {
      return this.$store.getters.getResultDate;
    },
  },

  data() {
    return {
      Error_Message: "Время выполнения не может быть меньше текущего",
      dateCompliteRequest: null,
      DateNow: "",
      DateView: false,
    };
  },
  methods: {
    viewButton: function () {
      this.DateView = new Date(this.dateCompliteRequest) > new Date();
    },
    send_confirmation: function (id) {
      const dataRequest = {
        id: id,
        dateCompliteRequest: this.dateCompliteRequest,
        user: this.$store.getters.getMail,
      };
      this.$store
        .dispatch("update_seen_date_request_user", dataRequest)
        .then((res) => {
          this.$store
            .dispatch("get_request_user_new", this.$store.getters.getMail)
            .then((res) => {
              this.dateCompliteRequest = true;
            });
        });
    },
    close_message: function () {
      this.$router.push("/").catch((err) => console.err(err));
    },
    Completion_date: function () {
      if (this.dateCompliteRequest != null) {
        console.log("выбsрана дата", this.dateCompliteRequest);
      }
    },
  },
  components: {
    errorMessage,
  },
  props: {
    id: String,
  },
};
</script>

<style>

.errorMessage{
padding: 20px;

}
.buttons{
      width: -webkit-fill-available;
      font-size: 20px;
}
.calendar {
  width: 290px;
  height: 50px;
  font-size: 25px;
}
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