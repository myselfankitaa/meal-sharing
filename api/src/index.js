import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import nestedRouter from "./routers/nested.js";
import mealsRouter from "./routers/meals.js";
import router_meal from "./routers/meals_week1.js";
import reservationRouter from "./routers/reservations.js";
import reviewRouter from "./routers/review.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

apiRouter.use("/nested", nestedRouter);
apiRouter.use("/week1", router_meal);
apiRouter.use(mealsRouter);
apiRouter.use(reservationRouter);
apiRouter.use(reviewRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
