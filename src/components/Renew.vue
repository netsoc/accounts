<template>
  <section>
    <div class="product">
      <img src="../../public/nat.svg" alt="Netsoc Logo" />
      <div class="description">
        <h3>Netsoc Membership</h3>
        <h5>€2.00</h5>
      </div>
    </div>
    <button v-on:click="createSession" id="checkout-button">Renew Membership</button>
    <p>{{errorResponse}}</p>
  </section>
</template>

<script>
export default {
  name: "Renew",
  props: ["uid"],
  data() {
    return {
      errorResponse: "",
    };
  },
  methods: {
    createSession() {
      if (this.uid.length < 1) this.$router.push({ name: "Login" });

      // eslint-disable-next-line
      let stripe = Stripe(STRIPE_PUBLIC_KEY);

      // eslint-disable-next-line
      const URL = PAYMENT_CREATE_SESSION_URL;

      let uid = this.uid;
      const axios = require("axios").default;
      axios
        .post(
          URL,
          {uid: uid},
          {
            headers: {
              "Access-Control-Allow-Headers": "Content-Type",
              "Content-Type": "application/json",
            },
          }
        )
        .then((session) => {
          stripe.redirectToCheckout({ sessionId: session.data.id });
        })
        .catch((error) => {
          this.errorResponse = error.response.data.message;
        });
    },
  },
  beforeMount() {
    this.createSession();
  },
};
</script>
