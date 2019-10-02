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

const avalanches = [];

fs.createReadStream("avalanches.csv")
  .pipe(csv())
  .on("data", data => avalanches.push(data))
  .on("end", () => {
    console.log(avalanches);
  });

const forecast_zones = [];

fs.createReadStream("forecast_zones.csv")
  .pipe(csv())
  .on("data", data => forecast_zones.push(data))
  .on("end", () => {
    console.log(forecast_zones);
  });