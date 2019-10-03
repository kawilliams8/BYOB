const combinedData = require("../../combinedData");

const createZones = (knex, zone) => {
  return knex("forecast_zones")
    .insert(
      {
        nearby_city: zone.nearby_city,
        land_features: zone.land_features
      },
      "id"
    )
    .then(zoneId => {
      let avalanchePromises = [];

      zone.avalanches.forEach(avalanche => {
        avalanchePromises.push(
          createAvalanche(knex, {
            date: avalanche.date,
            date_precision: avalanche.date_precision,
            first_name: avalanche.first_name,
            last_name: avalanche.last_name,
            elevation: avalanche.elevation,
            aspect: avalanche.aspect,
            type: avalanche.type,
            trigger: avalanche.trigger,
            release_size: avalanche.release_size,
            destructive_size: avalanche.destructive_size,
            forecast_zones_id: zoneId[0]
          })
        );
      });

      return Promise.all(avalanchePromises);
    });
};

const createAvalanche = (knex, avalanche) => {
  return knex("avalanches").insert(avalanche);
};

exports.seed = knex => {
  return knex("avalanches")
    .del()
    .then(() => knex("forecast_zones").del())
    .then(() => {
      let zonePromises = [];

      combinedData.forEach(zone => {
        zonePromises.push(createZones(knex, zone));
      });

      return Promise.all(zonePromises);
    })
    .catch(error => new Error(`Error seeding data: ${error}`));
};