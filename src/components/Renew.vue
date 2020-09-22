<template>
  <section>
    <div class="product">
      <img src="../../public/nat.svg" alt="Netsoc Logo" />
      <div class="description">
        <h3>Stubborn Attachments</h3>
        <h5>€2.00</h5>
      </div>
    </div>
    <button v-on:click="createSession" id="checkout-button">Checkout</button>
  </section>
</template>

<script>
export default {
  name: "Renew",
  props: ["uid"],
  data() {
    return {};
  },
  methods: {
    createSession() {
        if(this.uid.length < 1)
            this.$router.push({ name: "Login" })
        const STRIPE_PUBLIC_KEY = ''
      // eslint-disable-next-line
      let stripe = Stripe(STRIPE_PUBLIC_KEY);

      let uid = this.uid;

      fetch("http://localhost:4242/create-session", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: uid }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (session) {
          return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .then(function (result) {
          if (result.error) {
            alert(result.error.message);
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    },
  },
  beforeMount() {
    this.createSession();
  },
};
</script>
