// DEPENDENCIES
if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
// ROUTES
const moviesRouter = require("./movies/movies.router.js");
// ERROR HANDLERS
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(cors());
app.use(express.json());

// Route handlers
app.use("/movies", moviesRouter);

// Error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
