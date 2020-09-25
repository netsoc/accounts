<template>
  <div>
    <div class="input-heading">Enter your new password:</div>
    <input
      class="input-field input-margin"
      title="Password must be at least 8 characters long"
      placeholder="hunter22"
      v-model="password"
      type="password"
    />
    <div class="input-heading">Repeat password:</div>
    <input
      class="input-field input-margin"
      placeholder="hunter22"
      v-model="repeat_password"
      type="password"
    />
    <div class="input-error">{{ error_text }}</div>
    <button class="action-button submit-button" v-on:click="resetPassword">
      Update Password
    </button>
    <div class="success-text">{{ resStatusText }}</div>
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
  computed: {
    error_text: function () {
      if (this.password.length < 8) {
        return "Password must be more than 8 characters long";
      }
      return this.password !== this.repeat_password
        ? "Passwords must match"
        : "";
    },
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
          this.resStatusText = "Successfully updated password. Redirecting...";
          setTimeout(() => {
            this.$router.push({ name: "Login" });
          }, 1500);
        })
        .catch((error) => {
          this.resStatusText = `Could not reset password. Error: ${error.response.data.message}`;
        });
    },
  },
  beforeMount() {
    if (!this.verifyToken()) this.$router.push({ name: "Login" });
  },
};
</script>

<style>
.submit-button {
  background-color: rgb(202, 139, 55);
  width: 91%;
  margin-left: 1.02rem;
}
</style>
