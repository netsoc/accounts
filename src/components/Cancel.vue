<template>
  <p>
    Transaction cancelled.
    Your account will not be updated.
    Redirecting to login page...
  </p>
</template>

<script>
export default {
  name: "Cancel",
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
