<template>
  <div>
    <p class="what-we-do">
      {{ BLURB_TEXT }}
    </p>
    <form @submit.prevent>
      <div class="input-heading">Username:</div>
      <input class="input-field" v-model="username" type="text" />
      <span class="input-error">{{ no_username_str }}</span>
      <div class="input-heading">Password:</div>
      <input class="input-field" v-model="password" type="password" />
      <span class="input-error">{{ no_password_str }}</span>
      <div v-if="response_pending" class="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <button
        type="submit"
        class="action-button log-in"
        v-else
        v-on:click="login"
      >
        Login
      </button>
    </form>
    <div>or</div>
    <button class="action-button sign-up" v-on:click="createAccount">
      Sign Up
    </button>
    <div class="reset-link">
      Forgot your password?
      <router-link to="resetPassword"> Reset it here. </router-link>
    </div>
    <div class="support-link">
      Stuck? Email
      <a v-bind:href="`mailto:${EMAIL}`">{{ EMAIL }}</a>
    </div>
    <p class="info">
        If you're an old Netsoc user (last renewed pre 2020/2021), please click
        <a target="_blank" href="https://www.netsoc.ie/migration/">here</a>.
      </p>
    <div class="error-responses-container" v-show="info_message">
      <p class="response-error">{{ info_message }}</p>
      <p>
        Signed up but haven't received your verification email after a while?
        Click <a href="#" @click="resendVerification">here</a> to re-send it.
      </p>
    </div>
  </div>
</template>

<script>
import * as tokenFn from "./utils/localToken";

export default {
  name: "LoginPrompt",
  props: ["jwt"],
  data() {
    return {
      username: "",
      password: "",
      no_username: false,
      no_password: false,
      response_pending: false,
      info_message: "",
    };
  },
  computed: {
    no_username_str() {
      return this.no_username ? "Please enter your username" : "";
    },
    no_password_str() {
      return this.no_password ? "Please enter your password" : "";
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
        .then((response) => {
          tokenFn.emitToken.bind(this)(response.data.token ?? "");
          this.$router.push({ name: "Account" });
        })
        .catch((error) => {
          console.log(error);
          this.response_pending = false;
          if (!error.response) {
            this.info_message = "Could not contact the IAM service.";
          } else {
            this.info_message = `Error: ${error.response.data.message}`;
          }
        });

      this.response_pending = true;
    },
    createAccount() {
      this.$router.push({ name: "Sign Up" });
    },
    resendVerification() {
      const axios = require("axios").default;

      // eslint-disable-next-line
      const URL = IAM_VERIFY_URL;

      axios
        .patch(URL.replace("${username}", this.username), null, {
          headers: {
            Accept: "text/html",
          },
        })
        .then(() => {
          this.response_pending = false;
          this.info_message = "Verification email resent (check spam!)";
        })
        .catch((error) => {
          this.response_pending = false;
          this.info_message = `Error: ${error.response.data.message}`;
        });
      this.response_pending = true;
    },
  },
  beforeMount() {
    if (this.jwt.length > 1) {
      this.$router.push({ name: "Account" });
    }
  },
};
</script>

<style>
.info {
  max-width: 18rem;
  padding-left: 0.7rem;
  color: #4f4f4f;
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
  margin: 0.5rem 0.2rem;
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

.input-heading {
  display: flex;
  padding-left: 1rem;
  font-size: 1rem;
}

.action-button {
  display: block;
  width: 90%;
  border: none;
  border-radius: 0.2rem;
  font-size: 0.9rem;
  padding: 0.5rem;
  margin-left: 1.2rem;
  cursor: pointer;
}

.log-in {
  background-color: rgb(0, 184, 0);
}

.sign-up {
  background-color: rgba(0, 102, 255, 0.912);
}

.input-field {
  width: 90%;
  display: flex;
  margin-left: 1rem;
  margin-top: 0.1rem;
  height: 1.3rem;
  border-radius: 0.2rem;
  border: 1px solid rgb(196, 196, 196);
  font-size: 0.9rem;
}

.input-error {
  color: red;
  height: 1rem;
  display: inline-block;
}

.reset-link {
  padding-top: 1.5rem;
}

.support-link {
  padding-top: 0.4rem;
}

.what-we-do {
  max-width: 18rem;
  padding-left: 0.7rem;
  color: #4f4f4f;
}

.error-responses-container {
  max-width: 18rem;
}

.response-error {
  color: red;
}
</style>
