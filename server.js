const express = require("express");
const cors = require("cors");
const app = express();
const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.set("port", process.env.PORT || 3000);
app.locals.title = "BYOB";

app.get("/", (request, response) => {
  response.send("This is BYOB!");
});

app.listen(app.get("port"), () => {
  console.log(
    `${app.locals.title} is running on http://localhost:${app.get("port")}.`
  );
});

app.get("/api/v1/avalanches", (request, response) => {
  database("avalanches")
    .select()
    .then(avalanches => {
      response.status(200).json(avalanches);
    })
    .catch(error => {
      response.status(404).json({ error });
    });
});

app.get("/api/v1/avalanches/:id", (request, response) => {
  const id = parseInt(request.params.id);

  database("avalanches")
    .select()
    .then(avalanches => avalanches.find(avalanche => avalanche.id === id))
    .then(avalanche => {
      response.status(200).json({ avalanche });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post("/api/v1/avalanches", (request, response) => {
  const avalanche = request.body;

  for (let requiredParameter of ["date", "date_precision", "first_name", "last_name", "elevation", "aspect", "type", "trigger", "release_size", "destructive_size"]) {

    if (!avalanche[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { date: <String>, date_precision: <String>, first_name: <String>, last_name: <String>, elevation: <String>, aspect: <String>, type: <String>, trigger: <String>, release_size: <String>, destructive_size: <String>}. Add a "${requiredParameter}".`
      });
    }
  }

  database("avalanches")
    .insert(avalanche, "id")
    .then(avalanche => {
      response.status(201).json({ id: avalanche[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete("/api/v1/avalanches/:id", (request, response) => {
  const id = parseInt(request.params.id);

  database("avalanches")
    .where({ id: id })
    .select()
    .del()
    .then(() => response.status(202).json("Avalanche report deleted."));
});

app.get("/api/v1/forecast_zones", (request, response) => {
  database("forecast_zones")
    .select()
    .then(forecast_zones => {
      response.status(200).json(forecast_zones);
    })
    .catch(error => {
      response.status(500).json({ error });
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
      response.status(500).json({ error });
    });
});


app.post("/api/v1/forecast_zones", (request, response) => {
  const forecast_zone = request.body;

  for (let requiredParameter of ["zone", "nearby_city", "land_features"]) {
    if (!forecast_zone[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { zone: <String>, nearby_city: <String>, land_features: <String> }. Add a "${requiredParameter}".`
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
    .then(() => response.status(202).json("Forecast zone deleted."))
});