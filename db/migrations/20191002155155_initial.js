
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable("forecast_zones", function(table) {
      table.increments("id").primary();
      table.string("zone");
      table.string("nearby_city");
      table.string("land_features");

      table.timestamps(true, true);
    }),

    knex.schema.createTable("avalanches", function(table) {
      table.increments("id").primary();
      table.string("date");
      table.string("first_name");
      table.string("last_name");
      table.string("aspect");
      table.string("type");
      table.string("trigger");
      table.string("elevation");
      table.integer("zone_id").unsigned();
      table.foreign("zone_id").references("zone.id");

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex) {
    return Promise.all([
      knex.schema.dropTable("forecast_zones"),
      knex.schema.dropTable("avalanches")
    ]);
};
