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
      response.status(500).json({ error });
    });
});