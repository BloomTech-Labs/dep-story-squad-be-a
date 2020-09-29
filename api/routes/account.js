const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Account = require('../models/accountModel.js');

router.get('/login', (req, res)=>{
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

router.post('/login', (req, res)=>{
    Account.findByEmail(req.jwt.claims.email)
    .then(user => {
        if (user) {
            res.status(409).json({ message: 'User already in db.' })
        }
    })
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

router.patch('/login', (req, res)=>{
    Account.findByEmail(req.jwt.claims.email)
    .then(user => {
        if (!user) {
            res.status(404).jason({ message: 'User not in db.' })
        } else {
            let userData = req.body;
            const rounds = process.env.HASH_ROUNDS || 12;
            const hash = bcrypt.hashSync(userData.pin, rounds);
            userData.pin = hash;
            if (user.hashed_pin != hash) {
                res.status(401).json({ message: "PIN mismatch." });
            }
            Account.update(userData, userData.email)
            .then(updated_user => {
                res.status(200).json(updated_user)
            })
        }
    })
})


module.exports = router