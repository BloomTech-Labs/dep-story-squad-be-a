const bcrypt = require('bcryptjs');

const hasher = async (text, size) => {
  try {
    const salt = await bcrypt.genSalt(12);

    const hash = await bcrypt.hash(text, salt);

    return hash;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  hasher,
};
// const bcrypt = require('bcryptjs');

// function hasher(pin, rounds) {
//   const rounds = process.env.HASH_ROUNDS || 12;
//   const hash = bcrypt.hashSync(pin, rounds);
//   return hash;
// }
