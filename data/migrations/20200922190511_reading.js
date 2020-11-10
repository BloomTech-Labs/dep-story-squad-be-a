exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('reading', (tbl) => {
      tbl.increments('reading_id').notNullable().unique().primary();
      tbl.string('s3_url');
      tbl.string('s3_key');
      tbl.json('about').defaultTo({});
      tbl.json('prompts').defaultTo({});
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('reading');
};
