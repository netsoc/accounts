<template>
  <div>
    <div>Enter your new password:</div>
    <input v-model="password" type="password" />
    <input v-model="repeat_password" type="password" />
    <div v-if="password !== repeat_password">Passwords must match</div>
    <button v-on:click="resetPassword">Update Password</button>
    <div>{{resStatusText}}</div>
  </div>
</template>

<script>
export default {
  name: "Reset",
  data() {
    return {
      password: "",
      repeat_password: "",
      resStatusText: "",
    };
  },
  methods: {
    verifyToken() {
      let token = this.$route.query.token;
      return token?.length > 0;
    },
    resetPassword() {
      const token = this.$route.query.token;
      const password = this.password;
      const axios = require("axios").default;
      // eslint-disable-next-line
      const URL = IAM_LOGIN_URL;
      axios
        .put(
          URL.replace("${username}", "self"),
          {
            password: password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          this.resStatusText = 'Successfully updated password. Redirecting...'
          setTimeout(() => {
            this.$router.push({ name: "Login" });
          }, 1500);
        })
        .catch(() => {
          this.resStatusText = 'Could not reset password, please check it is longer than 8 characters and you used the correct link';
        });
    },
  },
  beforeMount() {
    if (!this.verifyToken()) this.$router.push({ name: "Login" });
  },
};
</script>
