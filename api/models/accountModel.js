const db = require("../../data/db-config.js");

module.exports = {
    findById,
    findByEmail,
    findByUsername,
    add,
    update,
    updateById
}

function findById(id) {
    // account_id is a UUID string
    return db("account").where({ account_id: id }).first();
}

function findByEmail(email) {
    return db("account").where({ email: email }).first();
}

function findByUsername(username) {
    return db("account").where({ username: username }).first();
}

function add(new_account) {
    // Use router to check that required info is included.
    return db("account")
        .insert(new_account, "account_id")
        .then(([account_id]) => {
            return findById(account_id)
        })
}

function update(new_data, email) {
    // Before calling this function,
    // verify in router that only appropriate data is included.
    return db("account")
        .where({ email: email })
        .update(new_data)
        .returning([account_id]);
}

function updateById(new_data, id) {
    // Before calling this function,
    // verify in router that only appropriate data is included.
    return db("account")
        .where({ account_id: id })
        .update(new_data)
}