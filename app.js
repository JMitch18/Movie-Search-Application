var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("search");
});

// creating results route
app.get("/results", (req, res) => {
  var query = req.query.search; // getting the key from the query string in the url
  var url = `http://www.omdbapi.com/?s=${query}&apikey=thewdb`; // placing the query string in the api url

  //requesting json string from the movies api
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body); //converting json string to an object
      //console.log("body:", results);
      // res.send(results["Search"][0]["Title"]); //accessing the title from the first array of objects
      res.render("results", { data: data });
    }
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
