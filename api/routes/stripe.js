const router = require('express').Router();
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const bodyParser = require('body-parser');
const { response } = require('express');

const payment_status = require('../tools/payment_status');
const authRequired = require('../middleware/authRequired');

// Get endpointSecret from Stripe Dashboard
const endpointSecret = process.env.ENDPOINT_SECRET || 'whsec_...';

router.get('/card-wallet', authRequired, async (req, res) => {
    const intent = await stripe.setupIntents.create({
        customer: req.body.customer_id
    });
    res.status(200).json({ client_secret: intent.client_secret });
});

router.post('/payment', authRequired, async (req, res) => {
    /* 
        Currently starts session for $0 payment.
        TODO: Use pre-defined prices.
        (See https://stripe.com/docs/payments/checkout/accept-a-payment#create-products-prices-upfront 
    */
    const success_url = req.body.success_url || '';
    const cancel_url = req.body.cancel_url || '';
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Theoretical Payment'
                    },
                    unit_amount: 0,
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: `${success_url}`,
        cancel_url: `${cancel_url}`
    });
    res.json({ id: session.id });
});

router.post('/subscribe', authRequired, async (req, res) => {
    const success_url = req.body.success_url || '';
    const cancel_url = req.body.cancel_url || '';
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Theoretical Payment'
                    },
                    unit_amount: 0,
                },
                quantity: 1
            }
        ],
        mode: 'subscription',
        success_url: `${success_url}`,
        cancel_url: `${cancel_url}`
    });
    res.json({ id: session.id });
});

// TODO: parse req to determine how far ahead account has paid
router.post('/webhook', bodyParser.raw({type: 'application/json'}), (req, res) => {
    const payload = req.body;
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object;
            const customerEmail = session.customer_email;
            payment_status.markPaid(customerEmail);
            break;
        }
    }
    response.status(200);
});

module.exports = router;

// Retrieve payment methods:
// const paymentMethods = await stripe.paymentMethods.list({
//     customer: '{{CUSTOMER_ID}}',
//     type: 'card',
//   });

// Process offline payment:
// try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: 1099,
//       currency: 'usd',
//       customer: '{{CUSTOMER_ID}}',
//       payment_method: '{{PAYMENT_METHOD_ID}}',
//       off_session: true,
//       confirm: true,
//     });
//   } catch (err) {
//     // Error code will be authentication_required if authentication is needed
//     console.log('Error code is: ', err.code);
//     const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
//     console.log('PI retrieved: ', paymentIntentRetrieved.id);
//   }