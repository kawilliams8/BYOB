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

const parseAvalanches = () => {
  const avalancheData = [];
  fs.createReadStream("avalanches.csv")
    .pipe(csv())
    .on("data", data => avalancheData.push(data))
    .on("end", () => {
      return avalancheData;
    });
}

const parseForecastZones = () => {
  const forecastZoneData = [];
  fs.createReadStream("forecast_zones.csv")
    .pipe(csv())
    .on("data", data => forecastZoneData.push(data))
    .on("end", () => {
      return forecastZoneData;
    });
}

const combinedData = async () => {
  let avalanches = parseAvalanches();
  let zones = parseForecastZones();
  return await zones.map(zone => {
    zone.avalanches = avalanches.filter(
      avalanche => avalanche.zone_name === zone.zone_name
    );
    return zone;
  })
  .catch(error => console.log('ERROR!!!', error))
};

console.log('trying to combine', combinedData())