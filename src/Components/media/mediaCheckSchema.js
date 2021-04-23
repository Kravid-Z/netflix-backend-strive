import { check } from "express-validator";

/** SCHEMA MEDIA
 *  {
        "Title": "The Lord of the Rings: The Fellowship of the Ring", *Req
        "Year": "2001", *Req
        "imdbID": "tt0120737",  //UNIQUE from OMDB|| server generated
        "Type": "movie", *Req
        "Poster": "https://m.media-amazon.com/images/M/MV5BMTM5MzcwOTg4MF5BMl5BanBnXkFtZTgwOTQwMzQxMDE@._V1_SX300.jpg" Opt
    }
*/

export const mediaCheckSchema = [
    check("title").exists().withMessage("Title is mandatory field!"),
    check("year").exists().withMessage("Year is mandatory field!"),
    check("type").exists().withMessage("Type is mandatory field!"),
  ];
  
