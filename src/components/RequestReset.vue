<template>
  <div>
    <div class="standard-text">
      Enter your username below and we will send you a password reset link.
    </div>
    <div>
      <input class="input-field input-margin" v-model="username" type="text" />
    </div>
    <button
      class="action-button request-reset input-margin"
      v-on:click="sendResetLink"
    >
      Reset password
    </button>
    <div class="standard-text">{{ response }}</div>
  </div>
</template>

<script>
export default {
  name: "ResetPassword",
  data() {
    return {
      username: "",
      response: "",
    };
  },
  methods: {
    sendResetLink() {
      let username = this.username;
      const axios = require("axios").default;
      // eslint-disable-next-line
      const URL = IAM_LOGIN_URL;
      axios
        .put(
          URL.replace("${username}", username),
          {},
          {
            headers: {
              Accept: "text/html",
            },
          }
        )
        .then((res) => {
          this.response =
            "Link sent. Please check your junk folder if you cannot see the email";
          console.log(res);
        })
        .catch((res) => {
          this.response =
            "Failed to send email, please check the username is correct.";
          console.error(res);
        });
    },
  },
};
</script>

<style>
.standard-text {
  max-width: 20rem;
  margin-bottom: 0.4rem;
}

.input-margin {
  margin-bottom: 0.4rem;
}

.request-reset {
  background-color: rgb(202, 139, 55);
  width: 91%;
  margin-left: 1.02rem;
}

.success-text {
  color: rgb(69, 70, 30);
  height: 2rem;
  display: inline-block;
}
</style>
