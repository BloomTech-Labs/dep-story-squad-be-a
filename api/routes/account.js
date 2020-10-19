const router = require('express').Router();
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const Account = require('../models/accountModel');
const Student = require('../models/studentModel');
const Hash_tools = require('../tools/hash_tools');

/* Returns info for logged-in account (requires token).
    TODO: choose which info is sent
        (e.g. no hashed_pin, restricted Stripe info) */
router.get('/login', (req, res) => {
  if (!req.jwt) {
    res.status(400).json({ message: 'No JWT; could not authorize.' });
  } else {
    const email = req.jwt.claims.email;
    Account.findByEmail(email)
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'Account not found.' });
        } else {
          res.status(200).json(user);
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: `Error searching for account by req.jwt.claims.email == ${email}.`,
          error: err,
        });
      });
  }
});

/* Adds new account to DB (based on token)
    requires req.body.pin */
router.post('/login', (req, res) => {
  const email = req.jwt.claims.email;
  const username = req.body.username;
  Account.findByEmail(email)
    .then((user) => {
      if (user) {
        res.status(409).json({ message: 'User already in db.' });
      } else {
        Account.findByUsername(username).then((found_user) => {
          if (found_user) {
            res.status(409).json({ message: 'Username taken.' });
          } else {
            let accountData = req.body;
            const hash = Hash_tools.hasher(accountData.pin);
            let new_account = {
              email: accountData.email,
              username: accountData.username,
              student_ids: [],
              hashed_pin: hash,
              settings: accountData.settings,
            };
            stripe.customers
              .create({
                description: 'Stripe customer object',
              })
              .then((customer) => {
                new_account.stripe = customer;
                Account.add(new_account)
                  .then((user) => {
                    res.status(201).json(user);
                  })
                  .catch((err) => {
                    res.status(500).json({ message: 'Failed to add user.' });
                  });
              })
              .catch((err) => {
                res.status(500).json({
                  message: 'Error creating Stripe customer object.',
                  error: err,
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error checking for existing account by req.jwt.claims.email.',
        error: err,
      });
    });
});

// TODO: paid_until should not be updateable through this endpoint.
// paid_until will update when BE receives payment notification from Stripe
router.patch('/login', (req, res) => {
  const email = req.jwt.claims.email;
  Account.findByEmail(email)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'User not in db.' });
      } else {
        let accountData = req.body;
        if (accountData.paid_until) {
          res.status(403).json({
            message:
              'Payment horizon should only update when payment confirmation is received from Stripe.',
          });
        }
        const hash = Hash_tools.hasher(accountData.pin);
        if (user.hashed_pin != hash) {
          res.status(401).json({ message: 'PIN mismatch.' });
        } else {
          let updatedData = { hashed_pin: hash };
          if (accountData.email) {
            updatedData.email = accountData.email;
          }
          if (accountData.username) {
            updatedData.username = accountData.username;
          }
          if (accountData.student_ids) {
            updatedData.student_ids = accountData.student_ids;
          }
          if (accountData.settings) {
            updatedData.settings = accountData.settings;
          }
          if (accountData.stripe) {
            updatedData.stripe = accountData.stripe;
          }
          Account.update(updatedData, accountData.email)
            .then((updated_user) => {
              res.status(200).json(updated_user);
            })
            .catch((err) => {
              res.status(500).json({
                message: 'Server error updating account data.',
                error: err,
              });
            });
        }
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error searching for account by req.jwt.claims.email.',
        error: err,
      });
    });
});

router.get('/students', (req, res) => {
  if (!req.jwt) {
    res.status(400).json({ message: 'No JWT; could not authorize.' });
  } else {
    const email = req.jwt.claims.email;
    Account.findByEmail(email)
      .then((user) => {
        const student_ids = user.student_ids || [];
        Promise.all(
          student_ids.map(async (id) => {
            const this_student = await Student.findById(id);
            return this_student;
          })
        )
          .then((students) => {
            res.status(200).json({ students: students });
          })
          .catch((err) => {
            res.status(500).json({
              message: 'Error retrieving info for individual students.',
              error: err,
            });
          });
      })
      .catch((err) => {
        const claims = req.jwt.claims;
        res.status(500).json({
          message: 'Error retrieving user info.',
          error: err,
          claims: claims,
          email: email,
        });
      });
  }
});

module.exports = router;
