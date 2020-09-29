const router = require('express').Router();

const Account = require('../models/accountModel.js');
const Hash_tools = require('../tools/hash_tools');

router.get('/login', (req, res)=>{
  if (!req.jwt) {
      res.status(400).json({ message: 'No JWT; could not authorize.'});
  }
  Account.findByEmail(req.jwt.claims.email)
  .then(user => {
      const hash = Hash_tools.hasher(req.body.pin);
      if (!user) {
          res.status(404).json({ message: 'Account not found.' })
      } else {
          res.status(200).json(user)
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
    let accountData = req.body;
    const hash = Hash_tools.hasher(accountData.pin);
    accountData.pin = hash;
    Account.add(accountData)
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
            let accountData = req.body;
            const hash = Hash_tools.hasher(accountData.pin);
            accountData.pin = hash;
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