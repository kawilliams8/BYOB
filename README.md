# Build Your Own Backend

## API - Endpoints

### Requesting all Forecast Zones and Avalanches entries

This database is seeded with the CAIC's `forecast_zones` and `avalanches` reports for events occuring in January, 2019.

| Purpose                       | URL                          | Verb | Request Body |
| ----------------------------- | ---------------------------- | ---- | ------------ |
| Request all forecast zones    | `/api/v1/forecast_zones`     | GET  | none         |
| Request all avalanche reports | `/api/v1/avalanches`         | GET  | none         |
| Request one forecast zone     | `/api/v1/forecast_zones/:id` | GET  | none         |
| Request one avalanche report  | `/api/v1/avalanches/:id`     | GET  | none         |

The `:id` in the url should be replaced with the `id` number of a user-selected forecast_zone or avalanche.

#### example forecast_zone entry:

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

#### example avalanche entry:

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
| Add a avalanche report | `/api/v1/avalanches`     | POST | * see below  |

* Each POST call must pass an options object that includes a header of 'Content-Type': 'application/json'. The body must also pass an object with information specific to that particular resource (forecast_zone or avalanches). All information must be passed as a <String>.

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

| Add a favorite for a user    | `/api/v1/users/:user_id/:favorites_type`              | POST   | `{see above for information to include in this object}` | `{"id": 2, "user_id": 1, "album_id": 558262493, "artist_name": "alt-J", "album_name": "An Awesome Wave", "artwork_url": "https://is5-ssl.mzstatic.com/image/thumb/Music/v4/3b/43/9e/3b439e7f-9989-1dc1-9ffb-8d876ddb0da1/source/100x100bb.jpg", "release_date": "2012-09-18T07:00:00Z", "content_advisory_rating": "notExplicit", "primary_genre_name": "Alternative"}` |
| Get all favorites for a user | `/api/v1/users/:user_id/:favorites_type`              | GET    | none                                                    | `{favorites: [array of favorites]}`                                                                                                                                                                                                                                                                                                                                     |
| Delete a favorite for a user | `/api/v1/users/:user_id/:favorites_type/:favorite_id` | DELETE | none                                                    | 204 status code, no response body content                                                                                                                                                                                                                                                                                                                               |
