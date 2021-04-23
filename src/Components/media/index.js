import express from "express";
import { v4 as uuid } from "uuid";

const router = express.Router();


//GET movies by query search ? title || category
router.get("/", async (req, res, next) => {
  try {
  } catch (error) {
    console.log("ERROR in GET", "/media", error);
    next(error);
  }
});
// POST new movie
router.post("/", async (req, res, next) => {
  try {
  } catch (error) {
    console.log("ERROR in POST", "/media", error);
    next(error);
  }
});
// POST IMG cover movie
router.post("/:imdbID/upload", async (req, res, next) => {
  try {
  } catch (error) {
    console.log("ERROR in POSTIMG", "/media/:imdbID/upload", error);
    next(error);
  }
});
// EDIT movie
router.put("/:imdbID", async (req, res, next) => {
  try {
  } catch (error) {
    console.log("ERROR in PUT", "/media/:imdbID", error);
    next(error);
  }
});
// Delete movie
router.delete("/:imdbID", async (req, res, next) => {
  try {
  } catch (error) {
    console.log("ERROR in DELETE", "/media/:imdbID", error);
    next(error);
  }
});

export default router;
