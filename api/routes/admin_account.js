// DO NOT DEPLOY UNPROTECTED
// Use these endpoints to access data without Okta token
// Currently uses ds_secret middleware
// TODO:
//      - build endpoints here as necessary
//      - add validation separate from DS secret

const router = require('express').Router();
const Account = require('../models/accountModel.js');

// Return user based on req.body.email
router.get('/email', (req, res) => {
  const email = req.body.email;
  Account.findByEmail(email)
    .then((account) => {
      res.status(200).json(account);
    })
    .catch((err) => {
      res.status(500).json({
        message: `.catch activated; ${email}`,
        error: err,
        received: req.body,
      });
    });
});

// Return user info from req.params.id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Account.findById(id)
    .then((account) => {
      res.status(200).json(account);
    })
    .catch((err) => {
      res.status(500).json({ message: `.catch activated; ${id}`, error: err });
    });
});

module.exports = router;
