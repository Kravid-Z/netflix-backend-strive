import express from "express";
import { v4 as uuid } from "uuid";
import { getReviews, writeReviews } from "./reviewsServices.js";
import { reviewsCheckSchema } from "./reviewsCheckSchema.js";
import { validationResult } from "express-validator";

const router = express.Router();

//GET all reviews by imdbID
router.get("/:imdbID", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    const reviewsSpecificmovie = reviews.find(
      (review) => review.imdbID === req.params.imdbID
    );
    if (reviewsSpecificmovie) {
      res.send(reviewsSpecificmovie);
    } else {
      const err = new Error();
      err.frontEndMssg = "Not attendees for this movie check imdbID, please";
      err.statusCode = 404;
      next(err);
    }
  } catch (error) {
    console.log("ERROR in GET", "/reviews", error);
    next(error);
  }
});
// POST new review for imdbID
router.post("/:imdbID", reviewsCheckSchema, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error();
      err.errorList = errors;
      err.statusCode = 400;
      next("error in POST comment, pasing it to errorHandling", err);
    } else {
      const reviews = await getReviews();
      const newReview = {
        ...req.body,
        imdbID: req.params.eventID,
        _id: uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      reviews.push(newReview);
      await writeReviews(reviews);
      res.status(201).send({ _id: newReview._id });
    }
  } catch (error) {
    console.log("ERROR in POST", "/reviews", error);
    next(error);
  }
});
// EDIT review
router.put("/:imdbID/:_id", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    if (!reviews.some((review) => review._id === req.params._id)) {
      const err = new Error();
      err.errorList = { mssg: "_id not found check again!" };
      err.statusCode = 400;
      next(err);
    } else {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = new Error();
        err.errorList = errors;
        err.statusCode = 400;
        next(err);
      } else {
        const { imdbID, createdAt } = reviews.find(
          (review) => review._id === req.params._id
        );
        const newReviewsArray = reviews.filter(
          (review) => review._id !== req.params._id
        );
        const reviewModified = {
          ...req.body,
          imdbID,
          createdAt,
          updatedAt: new Date(),
        };
        newReviewsArray.push(reviewModified);
        await writeMedia(newReviewsArray);
        res.send(reviewModified);
      }
    }
  } catch (error) {
    console.log("ERROR in PUT", "/reviews/:imdbID/:_id", error);
    next(error);
  }
});
// Delete review
router.delete("/:imdbID/:_id", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    const newReviewsArray = reviews.filter(
      (review) => review._id !== req.params._id
    );
    if (reviews.length === newReviewsArray.length) {
      const err = new Error();
      err.frontEndMssg = "This comment doesn't exist";
      err.statusCode = 404;
      next(err);
    } else {
      await writeReviews(newReviewsArray);
      res.status(204).send({ mssg: "comment Deleted" });
    }
  } catch (error) {
    console.log("ERROR in DELETE", "/reviews/:imdbID/:_id", error);
    next(error);
  }
});

export default router;
