// DO NOT DEPLOY UNPROTECTED

const router = require('express').Router();
const Account = require('../models/accountModel.js');

// req.body.email
router.get('/email', (req, res) => {
    Account.findByEmail(req.body.email)
        .then(account => {
            res.status(200).json(account);
        })
        .catch(err => {
            res.status(500).json({ message: `.catch activated; ${req.body.email}`, error: err });
        });
});

// Return user info from req.params.id
router.get('/:id', (req, res) => {
    Account.findById(req.params.id)
        .then(account => {
            res.status(200).json(account);
        })
        .catch(err => {
            res.status(500).json({ message: `.catch activated; ${req.params.id}`, error: err });
        });
});

module.exports = router;