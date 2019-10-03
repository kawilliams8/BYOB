import { combinedData } from '../../../server';

const createForecastZone = (knex, forecast_zone) => {
  return knex("forecast_zones")
    .insert(
      {
        zone_name: forecast_zone.zone_name,
        nearby_city: forecast_zone.nearby_city,
        land_features: forecast_zone.land_features
      },
      "id"
    )
    .then(zoneId => {
      let avalanchePromises = [];

      forecast_zone.avalanches.forEach(avalanche => {
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
            forecast_zone_id: zoneId[0]
          })
        );
      });

      return Promise.all(avalanchePromises);
    });
};

const createAvalanche = (knex, footnote) => {
  return knex("avalanches").insert(avalanche);
};

exports.seed = knex => {
  return knex("avalanches").del()
    .then(() => knex("forecast_zones").del())
    .then(() => {
      let zonePromises = [];

      forecastZoneData.forEach(zone => {
        zonePromises.push(createForecastZone(knex, zone));
      });

      return Promise.all(zonePromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};