<template>
  <div id="app">
    <div id="app-container">
      <div id="app-wrapper">
        <img
          src="@/assets/netsoc-logo.svg"
          alt="Netsoc Logo"
          id="netsoc-logo"
          v-on:click="toLogin"
        />
        <router-view
          v-on:tokenUpdate="login"
          v-on:userID="updateUID"
          v-bind:jwt="jwt"
          v-bind:uid="uid"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Container",
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || "Netsoc Accounts Manager";
      },
    },
  },
  data() {
    return {
      jwt: "",
      uid: "",
    };
  },
  methods: {
    login(token) {
      this.jwt = token;
      if (token.length > 1) {
        window.localStorage.setItem("token", token);
        this.$router.push({ name: "Account" });
      }
    },
    updateUID(uid) {
      this.uid = uid;
    },
    toLogin() {
      let currentName = this.$router.history.current?.name;
      if (currentName !== "Login" && currentName !== "Account") {
        this.$router.push({ name: "Login" });
      }
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
  padding-top: 2rem;
  max-width: 100%;
}

#app-container {
  padding-left: auto;
  padding-right: auto;
  background-color: rgb(239, 251, 255);
  box-shadow: 0rem 0rem 1rem rgb(208, 208, 208);
  display: inline-block;
  border-radius: 2rem;
}

#netsoc-logo {
  max-height: 5rem;
  padding-bottom: 1rem;
  max-width: 100%;
}

#app-wrapper {
  padding: 3rem;
}
</style>
