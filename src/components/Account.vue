<template>
  <div id="account_container">
    Account page to be implemented
    {{jwt}}
  </div>
</template>

<script>
const axios = require("axios").default;
export default {
  name: "Account",
  props: ["jwt"],
  data() {
    return {};
  },
  methods: {
    getUserData() {
        let token = this.jwt;
      axios
        .get(
          "http://localhost:8080/v1/users/self",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => console.log(response))
        .catch((response) => console.error(response));
    },
  },
  beforeMount() {
    if (this.jwt.length < 1) {
      this.$router.push({ name: "Login" });
    }
    this.getUserData();
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
