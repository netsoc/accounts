<template>
  <div>
    <p class="what-we-do">
      {{ BLURB_TEXT }}
    </p>
    <form @submit.prevent>
      <div class="input-heading">Username:</div>
      <input
        class="input-field"
        v-bind:class="{ 'input-invalid': !!usernameHint }"
        v-model="username"
        type="text"
        v-bind:title="usernameHint"
        required
      />
      <div class="input-heading">First Name:</div>
      <input
        class="input-field"
        v-bind:class="{ 'input-invalid': !!firstNameHint }"
        v-model="firstname"
        type="text"
        v-bind:title="firstNameHint"
        required
      />
      <div class="input-heading">Last Name:</div>
      <input
        class="input-field"
        v-bind:class="{ 'input-invalid': !!lastNameHint }"
        v-model="lastname"
        type="text"
        v-bind:title="lastNameHint"
        required
      />
      <div class="input-heading">Email (must be @tcd):</div>
      <input
        class="input-field"
        v-bind:class="{ 'input-invalid': !!emailHint }"
        v-model="email"
        type="text"
        required
      />
      <div class="input-heading">Repeat Email:</div>
      <input
        class="input-field"
        v-bind:class="{ 'input-invalid': !!emailRepeatHint }"
        v-model="repeat_email"
        type="text"
        required
      />
      <div class="input-heading">Password (longer than 8 characters):</div>
      <input
        class="input-field"
        v-bind:class="{ 'input-invalid': !!passwordHint }"
        v-model="password"
        type="password"
        required
      />
      <div class="input-heading">Repeat Password:</div>
      <input
        class="input-field input-padding"
        v-bind:class="{ 'input-invalid': !!passwordRepeatHint }"
        v-model="repeat_password"
        type="password"
        required
      />
    </form>
    <div v-if="response_pending" class="bouncing-loader">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <button
      type="submit"
      class="action-button sign-up"
      v-else
      v-on:click="create_account"
      :disabled="buttonDisabled"
    >
      Create Account
    </button>
    <div class="link-padding">
      Existing user?
      <router-link to="/">Login here instead.</router-link>
    </div>
    <div class="support-link">
      Stuck? Email
      <a v-bind:href="`mailto:${EMAIL}`">{{ EMAIL }}</a>
    </div>
    <div class="input-error server-error-response">{{ response_message }}</div>
  </div>
</template>

<script>
import * as userFn from "./utils/login";

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
  computed: {
    usernameHint() {
      return !userFn.isValidUsername(this.username) &&
        this.hintEnable(this.firstname)
        ? "Username must be between 0 and 256 characters."
        : "";
    },
    firstNameHint() {
      return !this.firstname?.length > 0 && this.hintEnable(this.lastname)
        ? "First name required."
        : "";
    },
    lastNameHint() {
      return !this.lastname?.length > 0 && this.hintEnable(this.email)
        ? "Last name required."
        : "";
    },
    emailHint() {
      return !userFn.isValidEmail(this.email) &&
        this.hintEnable(this.repeat_email)
        ? "Please enter an @tcd.ie email address"
        : "";
    },
    emailRepeatHint() {
      return !userFn.stringsMatch(this.email, this.repeat_email) &&
        this.hintEnable(this.password)
        ? "Emails must match."
        : "";
    },
    passwordHint() {
      return !userFn.isValidPassword(this.password) &&
        this.hintEnable(this.repeat_password)
        ? "Password must be between 8 and 255 characters"
        : "";
    },
    passwordRepeatHint() {
      return !userFn.stringsMatch(this.password, this.repeat_password)
        ? "Passwords must match."
        : "";
    },
    buttonDisabled() {
      return (
        !!this.usernameHint ||
        !!this.firstNameHint ||
        !!this.lastNameHint ||
        !!this.emailHint ||
        !!this.emailRepeatHint ||
        !!this.passwordHint ||
        !!this.passwordRepeatHint ||
        !this.username ||
        !this.firstname ||
        !this.lastname ||
        !this.email ||
        !this.repeat_email ||
        !this.password ||
        !this.repeat_password
      );
    },
    EMAIL() {
      // eslint-disable-next-line
      const email = SUPPORT_EMAIL;
      return email;
    },
    BLURB_TEXT() {
      // eslint-disable-next-line
      const blurb_text = BLURB;
      return blurb_text;
    },
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
            "Your account has been created, please click the link sent to you by email to verify your email (check spam!)";
          setTimeout(() => this.$router.push({ name: "Login" }), 2000);
        })
        .catch((error) => {
          this.response_pending = false;
          this.response_message = `Error: ${error.response.data.message}`;
        });
      this.response_pending = true;
    },
    hintEnable(input) {
      return input.length > 0;
    },
  },
};
</script>

<style>
.server-error-response {
  max-width: 17rem;
}

.what-we-do {
  max-width: 18rem;
  padding-left: 0.7rem;
  color: #4f4f4f;
}

.link-padding {
  padding-top: 0.5rem;
  padding-bottom: 0.6rem;
}

.input-invalid {
  border: 2px solid rgb(255, 65, 65);
}

.input-padding {
  margin-bottom: 1rem;
}

.sign-up:disabled {
  background-color: rgba(119, 170, 247, 0.912);
}
</style>
