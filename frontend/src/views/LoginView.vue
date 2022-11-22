<template>
  <div id="app">
    <login-form />

    <center>
      <br><br>
      <v-btn @click="move()" color="blue">Client</v-btn>
    </center>
  </div>


</template>

<script>
import LoginForm from "../components/LoginForm";

export default {
  name: "App",
  components: {
    LoginForm
  },

  methods: {
    move() {
      this.$router.push({
        path: 'client',
      })
    },
  }
};
</script>

<style>

</style>

