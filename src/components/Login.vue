<template>
  <div id="login_container">
    <div>
      <div class>Username:</div>
      <input v-model="username" type="text" />
      <span v-if="no_username">Please enter your username</span>
      <div>Password:</div>
      <input v-model="password" type="password" />
      <span v-if="no_password">Please enter a password</span>
      <div v-if="response_pending" class="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <button v-else v-on:click="login">Login</button>
      <div>
        Not an existing user?
        <router-link to="signup">Create an account.</router-link>
      </div>
    </div>
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
      response_pending: false,
    };
  },
  methods: {
    login() {
      let username = this.username;
      let password = this.password;
      this.no_username = username.length < 1;
      this.no_password = password.length < 1;

      if (this.no_username || this.no_password) return;

      // eslint-disable-next-line
      const URL = IAM_LOGIN_URL;

      const axios = require("axios").default;
      axios
        .post(URL.replace("${username}", username), {
          password: password,
        })
        .then((data) => {
          this.$emit("tokenUpdate", data.data.token);
        })
        .catch((response) => console.log(response));

      this.response_pending = true;
    },
  },
};
</script>

<style scoped>
#login_container {
  border-radius: 1rem;
}

@keyframes bouncing-loader {
  to {
    opacity: 0.1;
    transform: translate3d(0, -1rem, 0);
  }
}

.bouncing-loader {
  display: flex;
  justify-content: center;
}

.bouncing-loader > div {
  width: 1rem;
  height: 1rem;
  margin: 3rem 0.2rem;
  background: #8385aa;
  border-radius: 50%;
  animation: bouncing-loader 0.6s infinite alternate;
}

.bouncing-loader > div:nth-child(2) {
  animation-delay: 0.2s;
}

.bouncing-loader > div:nth-child(3) {
  animation-delay: 0.4s;
}
</style>
