const knex = require("../db/connection");

function read(id) {
  return knex("reviews").select("*").where({ review_id: id });
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
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
