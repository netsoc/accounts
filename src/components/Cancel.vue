<template>
  <p class="standard-response-text-container">
    Transaction cancelled. Your account will not be updated. Redirecting to
    account page...
  </p>
</template>

<script>
import * as tokenFn from "./utils/localToken";

export default {
  name: "Cancel",
  data() {
    return {};
  },
  methods: {
    redirectToAccount() {
      setTimeout(() => this.$router.push({ name: "Account" }), 2500);
    },
  },
  beforeMount() {
    let hasToken = tokenFn.checkForToken.bind(this)();
    if (!hasToken.hasToken) {
      this.$router.push({ name: "Login" });
    } else {
      this.redirectToAccount();
    }
  },
};
</script>

<style scoped>
.standard-response-text-container {
  max-width: 20rem;
}
</style>
