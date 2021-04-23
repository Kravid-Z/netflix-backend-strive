import { check } from "express-validator";

/** SCHEMA REVIEWS
 *  {
        "_id": "123455", //SERVER GENERATED
        "comment": "A good book but definitely I don't like many parts of the plot", //REQUIRED
        "rate": 3, //REQUIRED, max 5
        "imdbID": "5d318e1a8541744830bef139", //REQUIRED in PARAMS = IMDBID
        "createdAt": "2019-08-01T12:46:45.895Z" // SERVER GENERATED
    }
*/

export const reviewsCheckSchema = [
  check("comment").exists().withMessage("comment is mandatory field!"),
  check("rate")
    .exists()
    .isInt()
    .withMessage("rate is mandatory field && should be a number!"),
];
