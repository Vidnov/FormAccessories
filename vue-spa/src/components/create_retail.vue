<template>
  <div class="form_create_retail">
    <form class="ui form">
      <h4 class="ui dividing header">Информация о торговой точке</h4>
      <div class="field">
        <label>Адрес Точки</label>
        <div class="field">
          <div class="field">
            <input
              type="text"
              name="shipping[last-name]"
              placeholder="Адрес Точки"
              v-model="Address_Retail"
            />
          </div>
        </div>
        <label>Код Точки</label>
        <div class="field">
          <div class="field">
            <input
              type="text"
              name="shipping[last-name]"
              placeholder="Код Точки"
              v-model="Code_Retail"
            />
          </div>
        </div>
        <label>Почта</label>
        <div class="field">
          <div class="field">
            <input type="text" name="shipping[last-name]" placeholder="Почта" v-model="Mail_Retail" />
          </div>
        </div>
        <label>Диллер</label>
        <div class="select">
          <select class="ui fluid dropdown" v-model="Diller">
            <option value="Теле2">Теле2</option>
            <option value="Билайн">Билайн</option>
            <option value="МТС">МТС</option>
            <option value="Мегафон">Мегафон</option>
            <option value="Sotiks">Sotiks</option>
          </select>
        </div>
      </div>
      <div class="ui button btn" tabindex="0" v-on:click="Create_Retail">Подтвердить заказ</div>
    </form>
    {{Message}}
    {{Eror_Message}}
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "CreateRetail",
  data() {
    return {
      Address_Retail: "",
      Code_Retail: "",
      Mail_Retail: "",
      Diller: "",
      Message: "",
      Eror_Message: "",
    };
  },
  methods: {
    Create_Retail: function () {
      axios({
        method: "post",
        url: "http://localhost:3000/retail/create",
        data: {
          Address_Retail: this.Address_Retail,
          Code_Retail: this.Code_Retail,
          Mail_Retail: this.Mail_Retail,
          Diller: this.Diller,
        },
      })
        .then((result) => {
          this.Message = result;
        })
        .catch((e) => {
          this.Eror_Message = e;
        });
    },
  },
  components: {},
};
</script>

<style>
.btn {
  margin-top: 1000px;
}
.form_create_retail {
  display: grid;
  grid-template-columns: 90%;
}
</style>