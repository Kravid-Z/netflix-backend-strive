import express from "express";
import { v4 as uuid } from "uuid";
import {
  getMedia,
  writeMedia,
  getPosterMediaTable,
  writePosterMediaTable,
} from "./mediaServices.js";
import { mediaCheckSchema } from "./mediaCheckSchema.js";
import { validationResult } from "express-validator";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 } from "cloudinary";
import axios from "axios";

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: "movie-strive-netflix",
  },
});
const uploader = multer({ storage: cloudinaryStorage });

const router = express.Router();

//GET movies by query search ? title in netflix-strive-server && OMDB Server
router.get("/", async (req, res, next) => {
  try {
    const media = await getMedia();
    if (req.query) {
      if (req.query.title) {
        const response = await axios.get(
          `http://www.omdbapi.com/?${process.env.API_KEY_OMDB}&t=${req.query.title}`
        );
        const omdbDataTitle = response.data;
        console.log(omdbDataTitle);
        const filteredMedia = media.filter(
          (m) => m.hasOwnProperty("Title") && m.Title === req.query.title
        );
        filteredMedia.push(omdbDataTitle);
        res.status(200).send(filteredMedia);
      } else if (req.query.search) {
        const response = await axios.get(
          `http://www.omdbapi.com/?${process.env.API_KEY_OMDB}&s=${req.query.search}`
        );
        const omdbDataSearch = response.data;
        console.log(omdbDataSearch);
        res.status(200).send(omdbDataSearch);
      }
    } else {
      res.status(200).send(media);
    }
  } catch (error) {
    console.log("ERROR in GET", "/media", error);
    next(error);
  }
});
// POST new movie
router.post("/", mediaCheckSchema, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error();
      err.errorList = errors;
      err.statusCode = 400;
      console.log(err.errorList);
      next("error in POST Media, pasing it to errorHandling", err); // passing error to errorHandling
    } else {
      const media = await getMedia();
      const newMovie = {
        ...req.body,
        imdbID: uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      media.push(newMovie);
      await writeMedia(media);
      res.status(201).send({ imdbID: newMovie.imdbID });
    }
  } catch (error) {
    console.log("ERROR in POST", "/media", error);
    next(error);
  }
});
// POST IMG POSTER movie
router.post(
  "/:imdbID/upload",
  uploader.single("Poster"),
  async (req, res, next) => {
    try {
      const posterMediaTable = await getPosterMediaTable();
      const newPoster = {
        imdbID: req.params.imdbID,
        posterID: uuid(),
        imgURL: req.file.path,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      posterMediaTable.push(newPoster);
      await writePosterMediaTable(posterMediaTable);
      res.send({ cloudinaryURL: req.file.path });
    } catch (error) {
      console.log("ERROR in POSTIMG", "/media/:imdbID/upload", error);
      next(error);
    }
  }
);
// PUT edit movie
router.put("/:imdbID", mediaCheckSchema, async (req, res, next) => {
  try {
    const media = await getMedia();
    if (!media.some((movie) => movie.imdbID === req.params.imdbID)) {
      const err = new Error();
      err.errorList = { mssg: "imdbID not found check again!" };
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
        const { imdbID, createdAt } = media.find(
          (movie) => movie.imdbID === req.params.imdbID
        );
        const newMediaArray = media.filter(
          (movie) => movie.imdbID !== req.params.imdbID
        );
        const movieModified = {
          ...req.body,
          imdbID,
          createdAt,
          updatedAt: new Date(),
        };
        newMediaArray.push(movieModified);
        await writeMedia(newMediaArray);
        res.send(movieModified);
      }
    }
  } catch (error) {
    console.log("ERROR in PUT", "/media/:imdbID", error);
    next(error);
  }
});
// Delete movie
router.delete("/:imdbID", async (req, res, next) => {
  try {
    const media = await getMedia();
    const newMediaArray = media.filter(
      (movie) => movie.imdbID !== req.params.imdbID
    );
    if (media.length === newMediaArray.length) {
      const err = new Error();
      err.frontEndMssg = "This imdbID doesn't exist";
      err.statusCode = 404;
      next(err);
    } else {
      await writeMedia(newMediaArray);
      res.status(204).send({ mssg: "Movie Deleted" });
    }
  } catch (error) {
    console.log("ERROR in DELETE", "/media/:imdbID", error);
    next(error);
  }
});

export default router;
