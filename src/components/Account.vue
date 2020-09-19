<template>
  <div id="account_container">

  </div>
</template>

<script>
const netsocIam = require("@netsoc/iam");
const api = new netsocIam.UsersApi();

export default {
  name: "LoginPrompt",
  data() {
    return {
    };
  },
  methods: {
    login() {
      let username = this.username;
      let password = this.password;
      this.no_username = username.length < 1;
      this.no_password = password.length < 1;

      if (this.no_username || this.no_password) return;

      let callbackFn = function (error, data, response) {
        console.log({ error: error, data: data, response: response });
        this.response_pending = false;

        let DEV_login = true;

        if (DEV_login || data) {
          this.$emit("successfulLogin", data);
        }
      };

      api.login(username, password, callbackFn.bind(this));
      this.response_pending = true;

      console.log({ username: username, password: password });
    }
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
