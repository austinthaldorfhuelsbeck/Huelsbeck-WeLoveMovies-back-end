const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

// TODO fix this broken piece of shit
function listIsShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true });
}

function read(id) {
  return knex("movies").select("*").where({ movie_id: id });
}

module.exports = {
  list,
  listIsShowing,
  read,
};
