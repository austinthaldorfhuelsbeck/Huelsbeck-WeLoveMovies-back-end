const knex = require("../db/connection");

function read(id) {
  return knex("reviews").select("*").where({ review_id: id });
}

function update(updatedReview, id) {
  return knex("reviews")
    .select("*")
    .where({ review_id: id })
    .update(updatedReview, "*");
}

function destroy(id) {
  return knex("reviews").where({ review_id: id }).del();
}

module.exports = {
  read,
  update,
  delete: destroy,
};
