import express from "express";
import knex from "../database_client.js";

const reviewRouter = express.Router();

reviewRouter.get("/reviews", async (req, res) => {
  try {
    const reviews = await knex.from("review").select("*");
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(404).json({ Error: "Request not get completed" });
  }
});

reviewRouter.get("/meals/:meal_id/reviews", async (req, res) => {
  try {
    const param = req.params.meal_id;
    const review = await knex
      .from("review")
      .select("*")
      .where("meal_id", param);

    if (review.length > 0) {
      res.json(review);
    } else {
      res.status(404).json({ meal_id: `${param}  does not exist` });
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "request not completed" });
  }
});

reviewRouter.post("/reviews", async (req, res) => {
  try {
    const reviews = [
      {
        title: "Just Wow",
        description: "Very delicious",
        meal_id: 3,
        stars: 4,
        create_date: new Date(),
      },
      {
        title: "Super delicious",
        description:
          "This is a very delicious and must-try dish. Don't lose the chance.",
        meal_id: 7,
        stars: 5,
        create_date: new Date(),
      },
    ];

    await knex("review").insert(reviews);
    res.status(201).json({ status: "Successfully updated reviews" });
  } catch (error) {
    console.error(error); // Logging the error for debugging
    res
      .status(500)
      .json({ message: "Request cannot be processed", error: error.message });
  }
});

reviewRouter.get("/reviews/:id", async (req, res) => {
  try {
    const param = req.params.id;
    const review = await knex.from("review").select("*").where("id", param);
    if (review.length > 0) {
      res.json(review);
    } else {
      res.status(404).json({ id: `${param}  does not exist` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "request not completed" });
  }
});

reviewRouter.put("/reviews/:id", async (req, res) => {
  const param = req.params.id;
  try {
    const updateReview = await knex("review")
      .where({ id: param })
      .update({ stars: 5, meal_id: 1 });
    if (updateReview > 0) {
      res.status(200).json({ status: "review successfully updated" });
    } else {
      res.status(404).json({ message: "Id does not exist" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "There is issue while processing the request" });
  }
});

reviewRouter.delete("/reviews/:id", async (req, res) => {
  const param = req.params.id;
  try {
    const deleteReview = await knex("review").where({ id: param }).del();
    if (deleteReview > 0) {
      res
        .status(200)
        .json({ status: `The review with id ${param} is deleted` });
    } else {
      res.status(404).json({ message: `id ${param} does not exist` });
    }
  } catch (error) {
    console.log(error),
      res.status(500).json({ message: `Couldn't process the request` });
  }
});

export default reviewRouter;
