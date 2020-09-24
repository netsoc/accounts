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
          URL,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .finally((response) => {
          console.log(response);
          switch (response.status) {
            case 204:
              this.response_message = "Email Confirmed, Redirecting...";
              setTimeout(() => {
                this.$router.push({ name: "Login" });
              }, 1500);
              break;

            default:
              break;
          }
        })
        .catch((response) => console.error(response));
    },
  },
  beforeMount() {
    this.verify();
  },
};
</script>
