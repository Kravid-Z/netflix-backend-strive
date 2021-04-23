import express from "express";
import { v4 as uuid } from "uuid";
import {getReviews, writeReviews} from "./reviewsServices.js"
import {reviewsCheckSchema} from "./reviewsCheckSchema.js"
import { validationResult } from "express-validator";

const router = express.Router();

//GET all reviews by imdbID
router.get("/:imdbID", async (req, res, next) => {
  try {
  } catch (error) {
    console.log("ERROR in GET", "/reviews", error);
    next(error);
  }
});
// POST new review for imdbID
router.post("/:imdbID", async (req, res, next) => {
  try {
  } catch (error) {
    console.log("ERROR in POST", "/reviews", error);
    next(error);
  }
});
// EDIT review
router.put("/:imdbID/:_id", async (req, res, next) => {
  try {
  } catch (error) {
    console.log("ERROR in PUT", "/reviews/:imdbID/:_id", error);
    next(error);
  }
});
// Delete movie
router.delete("/:imdbID/:_id", async (req, res, next) => {
  try {
  } catch (error) {
    console.log("ERROR in DELETE", "/reviews/:imdbID/:_id", error);
    next(error);
  }
});

export default router;
