const bcrypt = require('bcryptjs');

module.exports = {
    hasher
}

function hasher(pin) {
    const rounds = process.env.HASH_ROUNDS || 12;
    const hash = bcrypt.hashSync(pin, rounds);
    return hash;
}