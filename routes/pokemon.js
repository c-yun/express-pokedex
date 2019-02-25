var express = require('express');
var router = express.Router();
var db = require("../models");
var request = require("request");
var app = express();


// GET /pokemon - return a page with favorited Pokemon
router.get("/", function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(function(pokemons) {
    res.render("pokemon/favorites", {pokemons});
  });
});


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post("/", function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.create({
    name: req.body.name
  }).then(function(pokemons) {
    res.redirect("/pokemon");
  });
});

// GET ONE
router.get("/:id", function(req, res) {
  let url = "http://pokeapi.co/api/v2/pokemon/" + req.params.id;
  request(url, function(error, response, body) {
    let data = JSON.parse(body)
    res.render("pokemon/show", {data});
  });
});

module.exports = router;
