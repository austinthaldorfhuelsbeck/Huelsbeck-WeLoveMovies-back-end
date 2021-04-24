const knex = require("../db/connection");

const movies = ["Beauty and the Beast"];

function list() {
  return knex("movies").select("*");
}

module.exports = {
  list,
};
