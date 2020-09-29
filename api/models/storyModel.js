const db = require('../../db-config.js');

module.exports = {
    findById,
    add,
    update
}

function findById(id) {
    return db('story').where({ story_id: id });
}

function add(new_story) {
    return db('story')
        .insert(new_story, 'story_id')
        .then(([story_id]) => {
            return findById(story_id);
        });
}

function update(new_data, id) {
    return db('story')
        .where({ story_id: id })
        .update(new_data);
}