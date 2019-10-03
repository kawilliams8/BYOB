const express = require("express");
const cors = require("cors");
const app = express();
const csv = require("csv-parser");
const fs = require("fs");

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

const parseForecastData = () => {
  let promise = new Promise((resolve, reject) => {
    if (true) {
    const forecastZoneData = [];
    fs.createReadStream("forecast_zones.csv")
      .pipe(csv())
      .on("data", data => forecastZoneData.push(data))
      .on("end", () => {
        resolve(forecastZoneData)
      });
    } else {
      reject(Error("Could not parse forecast zone CSV data"));
    }
  });
  return promise;
};

const parseAvalanches = () => {
  let promise = new Promise((resolve, reject) => {
    if (true) {
      const avalancheData = [];
      fs.createReadStream("avalanches.csv")
        .pipe(csv())
        .on("data", data => avalancheData.push(data))
        .on("end", () => {
          resolve(avalancheData);
        });
    } else {
      reject(Error("Could not parse avalanche CSV data"));
    }
  });
  return promise;
};

let combinedData = [];
parseForecastData()
  .then(response => combinedData = response)
  .then(() => parseAvalanches())
  .then(response => {
    combinedData.map(zone => {
      zone.avalanches = response.filter(
        avalanche => avalanche.zone_name === zone.zone_name
      );
      return zone;
    });
  })
  .then(() => console.log(combinedData  ))
  .catch(err => console.log(err));