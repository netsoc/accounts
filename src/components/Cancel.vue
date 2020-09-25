<template>
  <p>
    Transaction cancelled.
    Your account will not be updated.
    Redirecting to account page...
  </p>
</template>

<script>
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
    let token = window.localStorage.getItem("token");
    if (token.length < 1) {
      this.$router.push({ name: "Login" });
    }
    this.$emit("tokenUpdate", token);
    this.redirectToAccount();
  },
};
</script>
