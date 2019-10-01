var Nightmare = require("nightmare");
var nightmare = Nightmare({ show: true });

nightmare
  .goto("WEBSITE ADDRESS")
  .end()
  .then(function(result) {
    console.log(result);
  })
  .catch(function(error) {
    console.error("Search failed:", error);
  });