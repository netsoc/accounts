<template>
  <p>
    Transaction Succeeded!
    Your account has been updated.
    Redirecting to login page...
  </p>
</template>

<script>
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
    this.redirectToLogin();
  },
};
</script>
