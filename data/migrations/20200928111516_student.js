exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('student', (tbl) => {
      tbl
        .uuid('student_id')
        .notNullable()
        .unique()
        .primary()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      tbl
        .uuid('account_id')
        .notNullable()
        .references('account_id')
        .inTable('account')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.string('username').notNullable().unique();
      tbl.string('hashed_pin').notNullable();
      tbl.json('settings').defaultTo({});
      tbl.json('records').defaultTo({});
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('student');
};
