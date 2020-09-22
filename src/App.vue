<template>
  <div id="app">
    <img src="@/assets/netsoc-logo.svg" alt="Netsoc Logo" style="max-height: 5rem" />
    <router-view
      v-on:tokenUpdate="login"
      v-on:userID="updateUID"
      v-bind:jwt="jwt"
      v-bind:uid="uid"
    />
  </div>
</template>

<script>
export default {
  name: "Container",
  data() {
    return {
      jwt: "",
      uid: "",
    };
  },
  methods: {
    login: function (token) {
      this.jwt = token;
      if (token.length > 1) this.$router.push({ name: "Account" });
    },
    updateUID: function (uid) {
      this.uid = uid;
    },
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
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
