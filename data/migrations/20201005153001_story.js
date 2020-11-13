
exports.up = function(knex) {
    return knex.schema
      .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
      .createTable('story', tbl =>{
          tbl.uuid('story_id')
              .notNullable()
              .unique()
              .primary()
              .defaultTo(knex.raw('uuid_generate_v4()'));
          tbl.uuid('student_id')
              .notNullable()
              .references('student_id')
              .inTable('student')
              .onUpdate('CASCADE')
              .onDelete('CASCADE')
          tbl.uuid('prompt_id')
              .notNullable()
              .references('prompt_id')
              .inTable('prompt')
              .onUpdate('CASCADE')
              .onDelete('CASCADE');
          tbl.string('s3_url');
          tbl.string('s3_key');
          tbl.json('about')
              .defaultTo({})
      })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('story')
  };
  