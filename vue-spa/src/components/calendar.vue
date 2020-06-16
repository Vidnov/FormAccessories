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
          <button class="ui positive button" v-on:click="send_confirmation(result)">Save</button>
          <div class="or"></div>
          <button @click="viewRequest()" class="ui red button">Cancel</button>
        </div>
      </div>
    </div>
    <div v-else-if="dateCompliteRequest != null" class="ui success message message_block">
      <i class="close icon" v-on:click="close_message()"></i>
      <div class="header">Ваша заявка отредактирована.</div>
      <p>Вы можете изменить ее обратившись к администратору сайта</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "calendar",
  data() {
    return {
      dateCompliteRequest: null,
      result: null
    };
  },
  methods: {
    send_confirmation: function(result) {
      if (this.dateCompliteRequest != null) {
        this.result = !result;
        console.log("выбрана дата", this.dateCompliteRequest);
      }
    },
    close_message: function() {
      this.$router.push("/").catch(err => console.err(err));
    },
    Completion_date: function() {
      if (this.dateCompliteRequest != null) {
        console.log("выбрана дата", this.dateCompliteRequest);
      }
    }
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