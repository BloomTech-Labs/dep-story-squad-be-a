const db = require("../../data/db-config.js");

module.exports = {
    findById,
    add,
    update
}

function findById(id) {
    // story_id is a UUID string
    return db('story').where({ story_id: id }).first();
}

function add(new_story) {
    // Router should ensure appropriate data structure.
    return db('story')
        .insert(new_story, 'story_id')
        .then(([story_id]) => {
            return findById(story_id);
        });
}

function update(new_data, id) {
    // Router should ensure appropriate data is sent.
    return db('story')
        .where({ story_id: id })
        .update(new_data);
}