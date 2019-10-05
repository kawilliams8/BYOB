# Build Your Own Backend

Build Your Own Backend (BYOB) is the first solo project in Mod 4 of the Front End Engineering program at the Turing School of Software and Design. This project introduces Front End students to relational databases, designing schemas, migrating and seeding data, and building endpoints with full documentation.

BYOB also requires students to use a sprint board tool like Clubhouse](https://app.clubhouse.io/byodb/dashboard), test endpoints with Postman, incorporate a Pull Request template, and use a rebase workflow. Students were also required to provide line-by-line annotation in the server.js file to demonstrate understanding.

BYOB is deployed to Heroku at `https://byobwilliams.herokuapp.com/api/v1/[...]`.

## Schema

This database is seeded with the [Colorado Avalanche Information Center](https://avalanche.state.co.us)'s `forecast_zones` and `avalanches` reports for events occuring in January, 2019.

![schema](https://github.com/kawilliams8/BYOB/blob/master/assets/schema.png)

## API endpoints

### Requesting Forecast Zones and Avalanches entries

| Purpose                       | URL                          | Verb | Request Body |
| ----------------------------- | ---------------------------- | ---- | ------------ |
| Request all forecast zones    | `/api/v1/forecast_zones`     | GET  | none         |
| Request all avalanche reports | `/api/v1/avalanches`         | GET  | none         |
| Request one forecast zone     | `/api/v1/forecast_zones/:id` | GET  | none         |
| Request one avalanche report  | `/api/v1/avalanches/:id`     | GET  | none         |

* The `:id` in the url should be replaced with the `id` number of a user-selected forecast_zone or avalanche. A successful GET will return all `forecast_zones` or `avalanches` as an array of objects, or the one matching object.

#### example forecast_zone:

```
`{
    "forecast_zone": {
        "id": 45,
        "zone": null,
        "nearby_city": "Aspen",
        "land_features": "Elk Range",
        "created_at": "2019-10-03T16:41:03.577Z",
        "updated_at": "2019-10-03T16:41:03.577Z"
    }
}`
```

#### example avalanche:

```
`{
    "avalanche": {
        "id": 593,
        "date": "2019/01/28",
        "date_precision": "Estimated",
        "first_name": "Matt",
        "last_name": "Huber",
        "elevation": "TL",
        "aspect": "SW",
        "type": "HS",
        "trigger": "N",
        "release_size": "R2",
        "destructive_size": "D2",
        "forecast_zones_id": 45,
        "created_at": "2019-10-03T16:41:03.594Z",
        "updated_at": "2019-10-03T16:41:03.594Z"
    }
}`
```

### Posting a new Forecast Zone or Avalanche entry

| Purpose                | URL                      | Verb | Request Body |
| ---------------------- | ------------------------ | ---- | ------------ |
| Add a forecast zone    | `/api/v1/forecast_zones` | POST | * see below  |
| Add an avalanche report | `/api/v1/avalanches`     | POST | * see below  |

* Each POST call must pass an options object that includes a header of 'Content-Type': 'application/json'. The body must also pass an object with required information specific to that particular resource type (i.e., `forecast_zones` or `avalanches`). All information must be passed as a <String>, except for the `forecast_zones_id`. When POSTing a new avalanche report, the `forecast_zones_id` property connects the new avalanche report to the forecast zone where the avalanche occurred. Include a <Number> value for the correct zone. A successful post returns the `id` of the new `forecast_zone` or `avalanche`.

#### new forecast_zone to be posted:

```
`{
    "zone": "Aspen",
    "nearby_city": "Aspen",
    "land_features": "Elk Range"
}`
```

#### new avalanche to be posted:

```
`{
    "date": "2019/01/28",
    "date_precision": "Estimated",
    "first_name": "Matt",
    "last_name": "Huber",
    "elevation": "TL",
    "aspect": "SW",
    "type": "HS",
    "trigger": "N",
    "release_size": "R2",
    "destructive_size": "D2",
    "forecast_zones_id": 45
}`
```

### Deleting a Forecast Zone or Avalanche entry

| Purpose                | URL                      | Verb | Request Body |
| ---------------------- | ------------------------ | ---- | ------------ |
| Remove a forecast zone    | `/api/v1/forecast_zones/:id` | DELETE | none  |
| Remove an avalanche report | `/api/v1/avalanches/:id`     | DELETE | none  |

* The `:id` in the url should be replaced with the `id` number of the forecast_zone or avalanche to remove. A successful DELETE will return a confirmation message: `"Forecast zone deleted."` or `Avalanche report deleted.`

## Built With

* Express
* Knex
* PostgreSQL
* csv-parser
* Postman
* [Clubhouse](https://app.clubhouse.io/byodb/dashboard)
* dbdiagram.io
* Heroku
