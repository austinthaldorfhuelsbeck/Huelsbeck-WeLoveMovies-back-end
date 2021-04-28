const service = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function reviewExists(req, res, next) {
  const reviewList = await service.read(req.params.reviewId)
  const review = reviewList[0]
  if (review) {
    res.locals.review = review
    return next()
  }
  next({ status: 404, message: "Review cannot be found." })
}

function read(req, res) {
  const { review: reviewData } = res.locals
  res.json({ data: reviewData })
}

async function readAndAppend(req, res) {
  const review = await service.readAndAppend(req.params.reviewId)
  review.critic.critic_id = review.critic_id
  res.json({ data: review })
}

async function update(req, res) {
  const updatedReview = { ...req.body }
  const id = req.params.reviewId
  await service.update(updatedReview, id)
  const data = await service.readAndAppend(id)
  res.json({ data })
}

async function destroy(req, res) {
  const review_id = req.params.reviewId
  console.log(review_id)
  await service.delete(review_id)
  res.sendStatus(204)
}

module.exports = {
  read: [asyncErrorBoundary(reviewExists), read],
  readAndAppend: [asyncErrorBoundary(reviewExists), readAndAppend],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
}
