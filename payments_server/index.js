const STRIPE_PRIVATE_KEY = process.env.STRIPE_PRIVATE_KEY;
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_ENDPOINT_SECRET;
const stripe = require('stripe')(STRIPE_PRIVATE_KEY);
const endpointSecret = STRIPE_ENDPOINT_SECRET;
const express = require('express');
const cors = require('cors');
const axios = require("axios").default;
const bodyParser = require('body-parser')
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
const app = express();
app.use(express.static('.'));
const YOUR_DOMAIN = 'http://localhost:4242';
const LOGIN_PAGE_URL = 'http://localhost:3000'

app.options('/create-session', cors(corsOptions))

app.post('/create-session', bodyParser.json(), cors(corsOptions), async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: 'Netsoc Membership',
                        images: ['nat.svg'],
                    },
                    unit_amount: 200,
                },
                quantity: 1,
            },
        ],
        client_reference_id: req.body.uid,
        mode: 'payment',
        success_url: `${LOGIN_PAGE_URL}/success`,
        cancel_url: LOGIN_PAGE_URL,
    });
    res.json({ id: session.id });
});

const updateUser = (session) => {
    console.log("Fulfilling order", session.client_reference_id);
}

app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
    const payload = request.body;
    const sig = request.headers['stripe-signature']
    let event;
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      updateUser(session);
    }
    response.status(200);
  });

app.listen(4242, () => console.log('Running on port 4242'));
