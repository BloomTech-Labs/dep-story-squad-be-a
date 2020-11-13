const db = require('../../data/db-config.js');

module.exports = {
  findById,
  findByUsername,
  add,
  update,
};

function findById(id) {
  // student_id is a UUID string
  return db('student').where({ student_id: id }).first();
}

function findByUsername(username) {
  return db('student').where({ username: username }).first();
}

function add(new_student) {
  console.log('inmodel', new_student);
  // Router should check data structure.
  return db('student')
    .insert(new_student, 'student_id')
    .then(([student_id]) => {
      return findById(student_id);
    });
}

function update(new_data, id) {
  // Router should control what data can be updated.
  return db('student').where({ student_id: id }).update(new_data);
}
