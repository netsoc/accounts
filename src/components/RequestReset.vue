<template>
  <div>
    <div>Enter your username below and we will send you a password reset link.</div>
    <div>
      <input v-model="username" type="text" />
    </div>
    <button v-on:click="sendResetLink">Reset password</button>
    <div>{{response}}</div>
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
