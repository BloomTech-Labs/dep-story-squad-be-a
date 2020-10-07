const db = require("../../data/db-config.js");

module.exports = {
    findById,
    findByUsername,
    add,
    update
}

function findById(id) {
    return db("student").where({ student_id: id });
}

function findByUsername(username) {
    return db("student").where({ username: username });
}

function add(new_student) {
    return db("student")
        .insert(new_student, "student_id")
        .then(([student_id]) => {
            return findById(student_id);
        })
}

function update(new_data, id) {
    return db("student")
        .where({ student_id: id })
        .update(new_data);
}