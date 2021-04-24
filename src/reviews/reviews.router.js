const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//TODO: delete method not allowed
router
  .route("/:reviewId")
  .get(controller.readAndAppend)
  .put(controller.update)
  .all(methodNotAllowed)
  .delete(controller.delete)
  .all(methodNotAllowed);

module.exports = router;
