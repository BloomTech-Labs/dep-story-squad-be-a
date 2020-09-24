const db = require("../../db-config.js");

module.exports = {
    findById,
    findByEmail,
    add
}

function findById(id) {
    return db("account").where({ account_id: id });
}

function findByEmail(email) {
    return db("account").where({ email: email });
}

function add(new_account) {
    return db("account")
        .insert(new_account, "account_id")
        .then(([account_id]) => {
            return findById(account_id)
        })
}