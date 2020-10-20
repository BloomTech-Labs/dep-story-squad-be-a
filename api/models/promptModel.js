const db = require("../../data/db-config.js");

module.exports = {
    findById,
    findAllByReading
}

function findById(id) {
    // prompt_id is a UUID string
    return db("prompt").where({ prompt_id: id }).first();
}

function findAllByReading(reading_id) {
    // reading_id is a UUID string
    return db("prompt").where({ reading_id: reading_id })
}