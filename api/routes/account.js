const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Account = require('../models/accountModel.js');

router.get('/', (req, res)=>{
  if (!req.jwt) {
      res.status(400).json({ message: 'No JWT; could not authorize.'});
  }
  Account.findByEmail(req.jwt.claims.email)
  .then(user => {
      if (!user) {
          res.status(404).json({ message: 'Account not found.' })
      } else if (bcrypt.compareSync(pin, user.hashed_pin)) {
          res.status(200).json(user)
      } else {
          res.status(401).json({ message: 'PIN mismatch.'})
      }
  })
})

router.post('/', (req, res)=>{
    let userData = req.body;
    const rounds = process.env.HASH_ROUNDS || 12;
    const hash = bcrypt.hashSync(userData.pin, rounds);
    userData.pin = hash;
    Account.add(userData)
    .then(user => {
        res.status(201).json(user);
    })
    .catch (err => {
        res.status(500).json({ message: 'Failed to add user.' })
    })
})


module.exports = router