const db = require("../../db-config.js");

module.exports = {
    findById,
    findAllByReading
}

function findById(id) {
    return db("prompt").where({ prompt_id: id })
}

function findAllByReading(reading_id) {
    return db("prompt").where({ reading_id: reading_id })
}