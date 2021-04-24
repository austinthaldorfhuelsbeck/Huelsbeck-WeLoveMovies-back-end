const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

function read(id) {
  return knex("movies").select("*").where({ movie_id: id });
}

module.exports = {
  list,
  read,
};
