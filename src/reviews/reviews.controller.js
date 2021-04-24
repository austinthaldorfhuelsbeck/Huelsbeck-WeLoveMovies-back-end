const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const reviewList = await service.read(req.params.reviewId);
  const review = reviewList[0];
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: "Review cannot be found." });
}

function read(req, res) {
  const { review: reviewData } = res.locals;
  res.json({ data: reviewData });
}

async function readAndAppend(req, res) {
  const review = await service.readAndAppend(req.params.reviewId);

  // FORMAT CORRECTLY
  const now = new Date().toISOString();
  review.created_at = now;
  review.updated_at = now;
  review.critic.created_at = now;
  review.critic.updated_at = now;
  review.critic.critic_id = review.critic_id;

  res.json({ data: review });
}

async function update(req, res, next) {
  const updatedReview = { ...req.body };
  const { review: reviewData } = res.locals;
  const reviewId = reviewData.review_id;

  await service.update(updatedReview, reviewId);
  return next();
}

async function destroy(req, res) {
  const { review } = res.locals;
  await service.delete(review.review_id);
  res.sendStatus(204);
}

module.exports = {
  read: [asyncErrorBoundary(reviewExists), read],
  readAndAppend: [asyncErrorBoundary(reviewExists), readAndAppend],
  update: [
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
    readAndAppend,
  ],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
