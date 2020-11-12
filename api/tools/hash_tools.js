const bcrypt = require('bcryptjs');

function hasher(text, size) {
  const hash = bcrypt.hashSync(text, 4);

  return hash;
}
function compare(text, compared) {
  const hash = bcrypt.compareSync(text, compared);

  return hash;
}

module.exports = {
  hasher,
  compare,
};
