import { forecast_zones, avalanches } from '../../../server';

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

exports.seed = function(knex) {
  return knex('avalanches').del()
    .then(() => knex('forecast_zones').del())
    .then(() => {
      return Promise.all([
        // Insert a single paper, return the paper ID, insert 2 footnotes
        knex('papers').insert({
          title: 'Fooo', author: 'Bob', publisher: 'Minnesota'
        }, 'id')
        .then(paper => {
          return knex('footnotes').insert([
            { note: 'Lorem', paper_id: paper[0] },
            { note: 'Dolor', paper_id: paper[0] }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};