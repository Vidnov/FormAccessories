<template>
  <section>
   <navbarAdmin v-bind:roleAdmin="getRole" />
    <navbarUser v-bind:roleUser="getRole" />
    <navbar v-bind:role="getRole"/>
    <router-view />
    <!-- {{getRole}}
    {{typeof getRole}} -->
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import navbar from "./components/navbar";
import navbarAdmin from "./components/navbar_admin";
import navbarUser from "./components/navbar_user";
import axios from "axios";
export default {
  name: "app",
  computed: {
    ...mapGetters([
      'getRole'
    ])
  },
  mounted() {
   this.$store.dispatch("getrole",localStorage.HelpDeskMail);
  },
  data(){
    return{

    }
  },
  methods: {

  },
   components: {
    navbar,
    navbarAdmin,
    navbarUser
  },
};
</script>


<style scope lang="scss">
section {
  text-align: center;
}
</style>
