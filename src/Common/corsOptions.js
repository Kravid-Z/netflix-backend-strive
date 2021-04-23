const whiteList = [process.env.FE_URL_DEV];

export const corsOptions = {
  origin: (origin, next) => {
    if (whiteList.indexOf(origin) !== -1) {
      next(null, true);
    } else {
      next(new Error("Not allowed By CORS"));
    }
  },
};
