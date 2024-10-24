import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import nestedRouter from "./routers/nested.js";
import mealsRouter from "./routers/meals.js";
import router_meal from "./routers/meals_week1.js";
import reservationRouter from "./routers/reservations.js";
import reviewRouter from "./routers/review.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());

app.get("/images/:filename", (req, res) => {
  const { filename } = req.params; // Get the filename from the request URL
  const filePath = path.join(__dirname, "public/images", filename); // Build the file path

  console.log("Serving image from path:", filePath);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.log("Error serving file:", err);
      // If the file is not found or any error occurs, send a 404 status
      res.status(404).json({ error: "Image not found" });
    }
  });
});

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
