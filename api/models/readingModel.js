const db = require('../../data/db-config.js');

module.exports = {
  findById,
};

function findById(id) {
  // reading_id is a UUID string
  return db('reading').where({ reading_id: id }).first();
}
