# Build Your Own Backend

## API - Endpoints
If you are making a post request, note that you will need to pass in an options object with a method and headers - with a `'Content-Type': 'application/json'`. You will also need to pass any required fields into the body.

### Forecast Zone and Avalanche data

This database is seeded with the CAIC's `forecast_zones` and `avalanches` reports for events occuring in January, 2019.

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


| Purpose | URL | Verb | Request Body | Sample Success Response |
|----|----|----|----|----|
| Login a user |`/api/v1/login`| POST | `{email: <String>, password: <String>}` | For matching email and password: `{id: 2, name: "Alex", email: "alex@gmail.com"}` |
| Create new user account |`/api/v1/users`| POST | `{name: <String>, email: <String>, password: <String>}` | For successful new account: `{id: 1, name: "Alan", email: "alan@turing.io"}` |

Note that account emails must be unique.

### User Favorites

The `:user_id` should be replaced with the integer `id` of the user (given in the response from logging in).

The `:favorites_type` should be replaced by the type of favorites your app is working with:

* `moviefavorites`
* `bookfavorites`
* `albumfavorites`

The `:favorites_id` should be replaced with the `id` of the favorite (the `movie_id`, `book_id`, or `album_id`).

The body of the POST request to add a favorite will differ depending on what data you are working with:

* `moviefavorites` requires: `movie_id (Integer), title (String), poster_path (String), release_date (String), vote_average (String), overview (String)`
* `bookfavorites` requires: `book_id (Integer), author_name (String), book_name VARCHAR (String), artwork_url (String), release_date (String), description (String), primary_genre_name (String)`
* `albumfavorites` requires: `album_id (Integer), artist_name (String), album_name (String), artwork_url (String), release_date (String), content_advisory_rating (String), primary_genre_name (String)`

*Note:* The object keys passed in the request body will not completely match the object keys given back from the iTunes Search API

| Purpose | URL | Verb | Request Body | Sample Success Response |
|----|----|----|----|----|
| Add a favorite for a user | `/api/v1/users/:user_id/:favorites_type` | POST | `{see above for information to include in this object}` | `{"id": 2, "user_id": 1, "album_id": 558262493, "artist_name": "alt-J", "album_name": "An Awesome Wave", "artwork_url": "https://is5-ssl.mzstatic.com/image/thumb/Music/v4/3b/43/9e/3b439e7f-9989-1dc1-9ffb-8d876ddb0da1/source/100x100bb.jpg", "release_date": "2012-09-18T07:00:00Z", "content_advisory_rating": "notExplicit", "primary_genre_name": "Alternative"}` |
| Get all favorites for a user | `/api/v1/users/:user_id/:favorites_type` | GET | none | `{favorites: [array of favorites]}` |
| Delete a favorite for a user | `/api/v1/users/:user_id/:favorites_type/:favorite_id` | DELETE | none | 204 status code, no response body content |
