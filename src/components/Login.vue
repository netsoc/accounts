<template>
  <div id="login_container">
    <div class="">Username:</div>
    <input v-model="username" type="text" />
    <span v-if="no_username">Please enter your username</span>
    <div>Password:</div>
    <input v-model="password" type="password" />
    <span v-if="no_password">Please enter a password</span>
    <button v-on:click="login">Login</button>
  </div>
</template>

<script>

export default {
  name: "LoginPrompt",
  data() {
    return {
      username: "",
      password: "",
      no_username: false,
      no_password: false,
    };
  },
  methods: {
    login() {
      let username = this.username;
      let password = this.password;
      this.no_username = username.length < 1;
      this.no_password = password.length < 1;

      if (this.no_username || this.no_password) return;

      alert({ username: username, password: password });
    },
  },
};
</script>

<style scoped>
#login_container {
    border-radius: 1rem;
}

</style>
