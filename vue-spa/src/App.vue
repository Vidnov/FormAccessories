<template>
  <section>
    <form class="ui form">
      <div class="contant">
        <h4 class="ui dividing header">{{msg}}</h4>
        <div class="two fields">
          <div class="field">
            <label>Model</label>
            <select v-model="model" v-for="(item,index) in response" :key="index" class="ui fluid dropdown"  v-on:change="getMark">
              <option v-for="(phone,index_item) in item" :key="index_item" :value="phone.model">{{phone.model}}</option>
            </select>
          </div>
          <div v-if="marks!=null" class="field">
            <label>Mark</label>
            <select  v-model="mark" class="ui fluid dropdown">
              <option v-for="(mark_item,mark_index) in marks" :key="mark_index" :value="mark_item">{{mark_item}}</option>
            </select>
          </div>
        </div>
        <button v-on:click="res" class="medium ui button">Medium</button>
      </div>
    </form>
    <div class="contant" v-if="show">
      <h3>Модель:{{mark}}</h3>
      <hr />
      <h3 v-if="Back_film">
        Переднее стекло:
        <i class="check icon"></i>
      </h3>
      <h3 v-else>
        Переднее стекло:
        <i class="close icon"></i>
      </h3>
      <hr />
      <h3 v-if="Film_from_side">
        Бампер:
        <i class="check icon"></i>
      </h3>
      <h3 v-else>
        Бампер:
        <i class="close icon"></i>
      </h3>
      <hr />
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      i: 0,
      response: null,
      msg: "Forms",
      model: null,
      mark: null,
      marks:null,
      Back_film: null,
      Film_from_side: null,
      show: false
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/")
      .then(response => {
        console.log(response.data.phones);
        this.response = response.data;
      })
      .catch(console.log(this.url + this.hash));
  },
  methods: {
    getMark: function() {
      this.marks=null
       const headers = {
        "Content-Type": "application/json"
      };
      console.log("чтото получил "+this.model);
        axios({
        method: "post",
        headers: headers,
        url: "http://localhost:3000/getmark",
        data: {
          model: this.model,
        }
      }).then(response => {
        console.log(response.data);
        this.marks=response.data
      });
      
    },
    res: function(e) {
      e.preventDefault();
      const headers = {
        "Content-Type": "application/json"
      };

      axios({
        method: "post",
        headers: headers,
        url: "http://localhost:3000/send",
        data: {
          model: this.model,
          mark: this.mark
        }
      }).then(response => {
        this.show = true;
        this.Back_film = response.data.Back_film;
        this.Film_from_side = response.data.Film_from_side;
        console.log(response.data);
      });
    }
  }
};
</script>

<style lang="scss">
.contant {
  padding: 50px;
}
section {
  width: 1200px;
  margin: 0 auto;
}
</style>
