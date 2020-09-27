<template>
  <div>
    <div>VERIFYING....</div>
    <div>{{ response_message }}</div>
  </div>
</template>

<script>
export default {
  name: "Verify",
  data() {
    return {
      response_message: "",
    };
  },
  methods: {
    verify() {
      let token = this.$route.query.token;

      // eslint-disable-next-line
      const URL = IAM_VERIFY_URL;

      const axios = require("axios").default;
      axios
        .patch(
          URL.replace("${username}", "self"),
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
              this.response_message = "Email Confirmed, Redirecting...";
              setTimeout(() => {
                this.$router.push({ name: "Login" });
              }, 1500);
        }).catch(error => {
          this.response_message = `Error: ${error.response.data.message}`
        });
    },
  },
  beforeMount() {
    this.verify();
  },
};
</script>
