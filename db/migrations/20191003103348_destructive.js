
exports.up = function(knex) {
  return knex.schema.table("avalanches", function(table) {
    table.renameColumn("desctructive_size", "destructive_size");
  });
};

exports.down = function(knex) {
  return knex.schema.table("avalanches", function(table) {
    table.renameColumn("destructive_size", "desctructive_size");
  });
};
