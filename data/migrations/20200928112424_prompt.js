
exports.up = function(knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('prompt', tbl =>{
        tbl.uuid('prompt_id')
            .notNullable()
            .unique()
            .primary()
            .defaultTo(knex.raw('uuid_generate_v4()'));
        tbl.integer('reading_id')
            .notNullable()
            .references('reading_id')
            .inTable('reading')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        tbl.json('prompt_info')
            .defaultTo({});
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('prompt');
};
