const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

// Starting express
const app = express();
const port = process.env.PORT || 3000;

// Defining paths
const index = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partials = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partials);

// Setup static directory to serve
app.use(express.static(index));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Kushal Sherchan"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Random",
    pageTitle: "About this website",
    details: "We are a ecommerce website"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "The address is not mentioned as query"
    });
  }

  geocode(req.query.address, (error, { longitude, latitude } = {}) => {
    if (error) {
      return res.send({
        error: "Cannot connect to geoCode"
      });
    }
    forecast(latitude, longitude, (error, { place, summary } = {}) => {
      if (error) {
        return res.send({
          error: "Cannot connect to the forecast"
        });
      }
      return res.send({
        place: place,
        summary: summary
      });
    });
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Honesty is the best policy",
    longDesc: "Rambling about the lack of help gotten till now"
  });
});

app.get("/products", (req, res) => {
  if (Object.keys(req.query).length < 1) {
    return res.send({
      error: "No query string has been entered"
    });
  }
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Help/article does not exist",
    error: "The help index for the following does not exist"
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    error: "The page you want to enter does not exist",
    title: "front page does not exist"
  });
});

app.listen(port, () => {
  console.log("Server has started");
});
