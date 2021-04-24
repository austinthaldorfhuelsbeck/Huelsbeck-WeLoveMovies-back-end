const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

// TODO fix this broken function
function listIsShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true });
}

function read(id) {
  return knex("movies").select("*").where({ movie_id: id });
}

function readTheatersByMovieId(id) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*")
    .where({ "mt.movie_id": id });
}

function readReviewsByMovieId(id) {
  return knex("reviews as r")
    .join("movies as m", "r.movie_id", "m.movie_id")
    .select("r.*")
    .where({ "r.movie_id": id });
}

module.exports = {
  list,
  listIsShowing,
  read,
  readTheatersByMovieId,
  readReviewsByMovieId,
};
