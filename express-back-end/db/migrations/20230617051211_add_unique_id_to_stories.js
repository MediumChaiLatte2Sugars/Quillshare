exports.up = function(knex) {
  return knex.schema.alterTable('stories', function(table) {
    table.string('unique_id').notNullable();
  });
};


exports.down = function(knex) {
  return knex.schema.alterTable('stories', function(table) {
    table.dropColumn('unique_id');
  });
};