import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import {corsOptions} from "./Common/corsOptions.js"
// import mediaRoutes from "./Components/media/index.js"
// import reviewsRoutes from "./Components/reviews/index.js"
import {
    notFoundErrorHandler,
    badRequestErrorHandler,
    forbiddenErrorHandler,
    catchAllErrorsHandler,
  } from "./Common/errorHandlerGeneral.js";
  

  
const server = express();
const port = process.env.PORT;

server.use(cors(corsOptions));
server.use(express.json());

//ROUTES
// server.use("/media", mediaRoutes);
// server.use("/reviews", reviewsRoutes);

//GENERAL ERRORS
server.use(notFoundErrorHandler);
server.use(badRequestErrorHandler);
server.use(forbiddenErrorHandler);
server.use(catchAllErrorsHandler);

console.log(listEndpoints(server));

server.listen(port, () => {
  if (process.env.NODE_ENV === "production") {
    // no need to configure it manually on Heroku
    console.log("Server running on cloud on port: ", port);
  } else {
    console.log("Server running locally on port: ", port);
  }
});

