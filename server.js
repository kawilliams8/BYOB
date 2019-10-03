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
      if (avalanche === {}) {
        response.status(200).json({ avalanche });
      } else {
        response.status(404).json("Avalanche not found");
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
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
    .then(forecast_zones => forecast_zones.find(forecast_zone => forecast_zone.id === id))
    .then(forecast_zone => {
      if (forecast_zone === {}) {
        response.status(200).json({ forecast_zone });
      } else {
        response.status(404).json('Forecast zone not found');
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});