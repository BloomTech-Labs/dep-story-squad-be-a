const Account = require('../models/accountModel.js');

const monthDays = {
  0: 31,
  1: 29,
  2: 31,
  3: 30,
  4: 31,
  5: 30,
  6: 31,
  7: 31,
  8: 30,
  9: 31,
  10: 30,
  11: 31,
};

module.exports = {
  markPaid,
};

// TODO: allow payment for more than 1 month in advance;
// (will depend on data delivered by Stripe in webhook)
function markPaid(email) {
  const rightnow = new Date();
  const paid_until = new Date();
  paid_until.setDate(rightnow.getDate() + monthDays[rightnow.getMonth()]);
  Account.update({ paid_until: paid_until.toISOString() }, email);
}
