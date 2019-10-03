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
      response.status(404).json({ error: "Avalanche not found" });
    });
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