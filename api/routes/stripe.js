const router = require('express').Router();
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

router.post('/payment', async (req, res) => {
    const session = await stripe.checkout.sessions.create(req.body.stripe_session);
})