<template>
  <div id="login_container">
    <div>
      <div>Username:</div>
      <input v-model="username" type="text" />
      <div>First Name:</div>
      <input v-model="firstname" type="text" />
      <div>Last Name:</div>
      <input v-model="lastname" type="text" />
      <div>Email (must be @tcd):</div>
      <input v-model="email" type="text" />
      <div>Repeat Email:</div>
      <input v-model="repeat_email" type="text" />
      <span v-if="email != repeat_email">Emails do not match</span>
      <div>Password:</div>
      <input v-model="password" type="password" />
      <div>Repeat Password:</div>
      <input v-model="repeat_password" type="password" />
      <span v-if="password != repeat_password">Passwords do not match</span>
      <span v-if="password.length < 8">Passwords must be longer than 8 characters</span>
      <div v-if="response_pending" class="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <button v-else v-on:click="create_account">Create Account</button>
      <div>
        Existing user?
        <router-link to="/">Login here instead.</router-link>
      </div>
      <div>{{response_message}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPrompt",
  data() {
    return {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      repeat_email: "",
      password: "",
      repeat_password: "",
      response_pending: false,
      response_message: "",
    };
  },
  methods: {
    create_account() {
      const axios = require("axios").default;
      let username = this.username;
      let email = this.email;
      let password = this.password;
      let firstname = this.firstname;
      let lastname = this.lastname;

      // eslint-disable-next-line
      const URL = IAM_CREATE_ACCOUNT_URL;

      axios
        .post(
          URL,
          {
            username: username,
            email: email,
            password: password,
            first_name: firstname,
            last_name: lastname,
          },
          {
            headers: {
              Accept: "text/html",
            },
          }
        )
        .then(() => {
          this.response_pending = false;
          this.response_message =
            "Account created, please verify your email before logging in";
          setTimeout(() => this.$router.push({ name: "Login" }), 1500);
        })
        .catch((error) => {
          this.response_pending = false;
          this.response_message = `Error: ${error.response.data.message}`;
        });
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
