import express from "express";
import knex from "../database_client.js";

const router_meal = express.Router();

router_meal.get("/", async (req, res) => {
  res.json({ Message: "Welcome to meal sharing App" });
});

router_meal.get("/future-meals", async (req, res) => {
  try {
    const meals = await knex.raw(
      "SELECT * FROM meal WHERE `when` > NOW() ORDER BY `when` ASC"
    );
    res.json(meals[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router_meal.get("/past-meals", async (req, res) => {
  try {
    const meals = await knex.raw(
      "SELECT * FROM meal WHERE `when` < NOW() ORDER BY `when` DESC"
    );
    res.json(meals[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router_meal.get("/all-meals", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT * FROM meal ORDER BY id ASC");
    res.json(meals[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router_meal.get("/first-meal", async (req, res) => {
  try {
    const meal = await knex.raw("SELECT * FROM meal ORDER BY id ASC LIMIT 1");
    if (meal[0].length > 0) {
      res.json(meal[0][0]);
    } else {
      res.status(404).json({ error: "There is no meal" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router_meal.get("/last-meal", async (req, res) => {
  try {
    const meal = await knex.raw("SELECT * FROM meal ORDER BY id DESC LIMIT 1");
    if (meal[0].length > 0) {
      res.json(meal[0][0]);
    } else {
      res.status(404).json({ error: "There is no meal" });
    }
    res.json(meal[0][0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
});

export default router_meal;
