// DO NOT DEPLOY UNPROTECTED

const router = require('express').Router();
const Account = require('../models/accountModel.js');

// req.body.email
router.get('/email', (req, res) => {
    const { email } = req.body;
    Account.findByEmail(email)
        .then(account => {
            res.status(200).json(account);
        })
        .catch(err => {
            res.status(500).json({ message: `.catch activated; ${email}`, error: err });
        });
});

// Return user info from req.params.id
router.get('/:id', (req, res) => {
    const id = req.params.id
    Account.findById(id)
        .then(account => {
            res.status(200).json(account);
        })
        .catch(err => {
            res.status(500).json({ message: `.catch activated; ${id}`, error: err });
        });
});

module.exports = router;