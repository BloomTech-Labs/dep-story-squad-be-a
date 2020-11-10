const bcrypt = require('bcryptjs');

function hasher(text) {
  const hash = bcrypt.hashSync(text, 4);

  return hash;
}

module.exports = {
  hasher,
};
