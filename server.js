//EACH COMMENT COMES BEFORE THE LINE IT DESCRIBES

//Bring in the express package/framework to write endpoints with Node.js
const express = require("express");
//Bring in the cors middleware to configure CORS for multiple routes 
const cors = require("cors");
//Declare an 'app' variable and assign it to the return value from calling express()
const app = express();
//Declare an 'environment' variable so we can use production and development (default)
const environment = process.env.NODE_ENV || "development";
//Declare a 'config' variable that uses the knexfile.js w/the current environment
const configuration = require("./knexfile")[environment];
//Declare a 'database' variable that uses the knex package and configuration variable
const database = require("knex")(configuration);

//Tell the app to use the express.json middleware to parse request bodies
app.use(express.json());
//Tell the the app to serve up static files (index.html, etc) from the "public" directory
app.use(express.static("public"));
//Tell the app to use cors in case requests are made from different domains
app.use(cors());

//Set the port number to be either a dynamic number or 3000, i.e. localhost:3000
app.set("port", process.env.PORT || 3000);
//Assign the app a title property
app.locals.title = "BYOB";

//Create a basic endpoint for the '/' route to return a string response
app.get("/", (request, response) => {
  response.send("This is BYOB!");
});

//When the server is started and listening for api calls on the port (3000), it logs a confirmation to the CLI
app.listen(app.get("port"), () => {
  console.log(
    `${app.locals.title} is running on http://localhost:${app.get("port")}.`
  );
});

//Creates an endpoint to receive all avalanche objects with a GET request
app.get("/api/v1/avalanches", (request, response) => {
//When this request occurs, go into the 'avalanches' table of the database
  database("avalanches")
//Select the entire table and return the avalanches objects
    .select()
//Accept the returned avalanches and pass them into a function
    .then(avalanches => {
//Return the avalanches response with an OK code and the stringified avalanches
      response.status(200).json(avalanches);
    })
//If there is an error/problem from the server
    .catch(error => {
//Return the response with a Not Found code and the error message
      response.status(404).json({ error });
    });
});

//Create an endpoint to receive one avalanche object with a GET request
app.get("/api/v1/avalanches/:id", (request, response) => {
//Declare a variable to hold the incoming id number from the URL
  const id = parseInt(request.params.id);

//When this request occurs, go into the 'avalanches' table of the database
  database("avalanches")
//Select the entire table and return the avalanches objects
    .select()
//Accept the returned avalanches and pass them into a function to find the match by id number
    .then(avalanches => avalanches.find(avalanche => avalanche.id === id))
//Return the avalanche response with an OK code and the stringified avalanche
    .then(avalanche => {
      response.status(200).json({ avalanche });
    })
//If there is an error/problem from the server
    .catch(error => {
//Return the response with a Not Found code and the error message
      response.status(404).json({ error });
    });
});

//Create an endpoint to add one avalanche object with a POST request
app.post("/api/v1/avalanches", (request, response) => {
//Declare a variable to hold the incoming object with the new avalanche's details
  const avalanche = request.body;

//iterate through the new avalanche to confirm that it has all required key/value pairs
  for (let requiredParameter of [
    "date",
    "date_precision",
    "first_name",
    "last_name",
    "elevation",
    "aspect",
    "type",
    "trigger",
    "release_size",
    "destructive_size",
    "forecast_zones_id"
  ]) {
//If one of the requiredParameter keys is not present
    if (!avalanche[requiredParameter]) {
//Send an error response with code 422 (Unprocessable Entry)
      return response.status(422).send({
//And show what the format should be (with a note on which requiredParameter is missing)
        error: `Expected format: { 
          date: <String>, 
          date_precision: <String>, 
          first_name: <String>, 
          last_name: <String>, 
          elevation: <String>, 
          aspect: <String>, 
          type: <String>, 
          trigger: <String>, 
          release_size: <String>, 
          destructive_size: <String>}. 
          Add a "${requiredParameter}".`
      });
    }
  }

//When this request occurs, go into the 'avalanches' table of the database
  database("avalanches")
//Insert the new avalanche entry into the database and return its new id number
    .insert(avalanche, "id")
//Then take the returned avalanche id (in an array) and pass it to a function
    .then(avalanche => {
//That responds with a 201 code (Created)
      response.status(201).json({
//And responds with the new id number from the array to confirm success to the developer
        id: avalanche[0]
      });
    })
//If there is an error/problem from the server
    .catch(error => {
//Return the response with a server error code and the error message
      response.status(500).json({ error });
    });
});

//Create an endpoint to remove one avalanche object with a DELETE request
app.delete("/api/v1/avalanches/:id", (request, response) => {
//Declare a variable to hold the incoming id number that we wish to delete from the URL
  const id = parseInt(request.params.id);

//When this request occurs, go into the 'avalanches' table of the database
  database("avalanches")
//And find the entry with an id number that matches our incoming id to delete
    .where({ id: id })
//Select that resource
    .select()
//And remove it from the database
    .del()
//Then send a response with a 202 code (Accepted) and a string to confirm success to the developer
    .then(() => response.status(202).json("Avalanche report deleted."));
});

app.get("/api/v1/forecast_zones", (request, response) => {
  database("forecast_zones")
    .select()
    .then(forecast_zones => {
      response.status(200).json(forecast_zones);
    })
    .catch(error => {
      response.status(404).json({ error });
    });
});

app.get("/api/v1/forecast_zones/:id", (request, response) => {
  const id = parseInt(request.params.id);

  database("forecast_zones")
    .select()
    .then(forecast_zones =>
      forecast_zones.find(forecast_zone => forecast_zone.id === id)
    )
    .then(forecast_zone => {
      response.status(200).json({ forecast_zone });
    })
    .catch(error => {
      response.status(404).json({ error });
    });
});

app.post("/api/v1/forecast_zones", (request, response) => {
  const forecast_zone = request.body;

  for (let requiredParameter of ["zone", "nearby_city", "land_features"]) {
    if (!forecast_zone[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { 
          zone: <String>, 
          nearby_city: <String>, 
          land_features: <String> }. 
          Add a "${requiredParameter}".`
      });
    }
  }

  database("forecast_zones")
    .insert(forecast_zone, "id")
    .then(forecast_zone => {
      response.status(201).json({
        id: forecast_zone[0]
      });
    })
    .catch(error => {
      response.status(500).json({
        error
      });
    });
});

app.delete("/api/v1/forecast_zones/:id", (request, response) => {
  const id = parseInt(request.params.id);

  database("forecast_zones")
    .where({ id: id })
    .select()
    .del()
    .then(() => response.status(202).json("Forecast zone deleted."));
});
