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

async function update(req, res) {
  const updatedReview = { ...req.body };
  const { review: reviewData } = res.locals;
  const reviewId = reviewData.review_id;

  const updatedData = await service.update(updatedReview, reviewId);

  // TODO: Complete the full response
  res.json({ data: updatedData[0] });
}

async function destroy(req, res) {
  const { review } = res.locals;
  await service.delete(review.review_id);
  res.sendStatus(204);
}

module.exports = {
  read: [asyncErrorBoundary(reviewExists), read],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
