import express from "express";
import knex from "../database_client.js";

const mealsRouter = express.Router();

mealsRouter.get("/", async (req, res) => {
  res.json({ Message: "Welcome to meal sharing App" });
});

mealsRouter.get("/meals", async (req, res) => {
  try {
    const meals = await knex.from("meal").select("*");
    res.json(meals);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Request not completed" });
  }
});

mealsRouter.post("/meals", async (req, res) => {
  try {
    await knex("meal").insert([
      {
        title: "Dhokla",
        description: "Gram Flour puffed and spongy cake",
        location: "ballerup",
        when: "2024-08-15 07:48:26",
        max_reservations: 5,
        price: "67.00",
        create_date: "2024-08-12 03:45:34",
      },
      {
        title: "Samosa",
        description: "Potato stuffed triangle shaped snacks",
        location: "ballerup",
        when: "2024-08-31 07:48:26",
        max_reservations: 5,
        price: "67.00",
        create_date: "2024-08-15 03:45:34",
      },
    ]);
    res.status(201).json({ status: "Success" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "request is not completed" });
  }
});

mealsRouter.get("/meals/:id", async (req, res) => {
  try {
    const param = req.params.id;
    const meal = await knex.from("meal").select("*").where("id", param);
    if (meal.length > 0) {
      res.json(meal);
    } else {
      res.status(404).json({ id: `${param} does not exist` });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ massage: "Request Error" });
  }
});

mealsRouter.put("/meals/:id", async (req, res) => {
  const param = req.params.id;
  try {
    const updateMeal = await knex("meal").where({ id: param }).update({
      title: "Jalebi",
      description: "Circular sweet dipped in the sugar syrup",
    });
    if (updateMeal > 0) {
      res.status(200).json({ status: "Successfully updated" });
    } else {
      res.status(404).json({ message: "Id does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Error in updation" });
  }
});

mealsRouter.delete("/meals/:id", async (req, res) => {
  const param = req.params.id;
  try {
    const deleteMeal = await knex("meal").where({ id: param }).del();
    if (deleteMeal > 0) {
      res.status(200).json({ status: `The meal with id ${param} is deleted` });
    } else {
      res.status(404).json({ message: `id ${param} does not exist` });
    }
  } catch (error) {
    console.log(error),
      res.status(404).json({ message: `Couldn't process the request` });
  }
});

export default mealsRouter;
