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