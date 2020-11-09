const bcrypt = require('bcryptjs');

function hasher(text, size) {
  const hash = bcrypt.hashSync(text, 4);

  return hash;
}

module.exports = {
  hasher,
};
