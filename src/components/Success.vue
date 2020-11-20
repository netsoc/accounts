<template>
  <p class="standard-response-text-container">
    Transaction Succeeded! Your account has been updated. Redirecting to login
    page...
  </p>
</template>

<script>
import * as tokenFn from "./utils/localToken";

export default {
  name: "Success",
  data() {
    return {};
  },
  methods: {
    redirectToLogin() {
      setTimeout(() => this.$router.push({ name: "Login" }), 2500);
    },
  },
  beforeMount() {
    this.$router.push({ name: "Login" });
    let hasToken = tokenFn.checkForToken.bind(this)();
    if (!hasToken.hasToken) {
      this.$router.push({ name: "Login" });
    } else {
      tokenFn.emitToken.bind(this)("");
      this.redirectToLogin();
    }
  },
};
</script>

<style scoped>
.standard-response-text-container {
  max-width: 20rem;
}
</style>
