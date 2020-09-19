<template>
  <div id="app">
    <img id="netsoc_logo" alt="Netsoc logo" src="./assets/netsoc-logo.svg" />
    <LoginPrompt @successfulLogin="login"/>
  </div>
</template>

<script>
import LoginPrompt from "./components/Login.vue";

export default {
  name: "App",
  data() {
    return {
      jwt: "",
    };
  },
  methods: {
    login: function (data) {
      alert('jwt received')
      this.jwt = data.jwt;
      //TODO change route to account page
    },
  },
  components: {
    LoginPrompt,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#netsoc_logo {
  max-height: 5rem;
}
</style>
