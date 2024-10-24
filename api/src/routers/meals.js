import express from "express";
import knex from "../database_client.js";

const mealsRouter = express.Router();

mealsRouter.get("/", async (req, res) => {
  res.json({ Message: "Welcome to meal sharing App" });
});

mealsRouter.get("/meals", async (req, res, next) => {
  const queryParameter = Object.keys(req.query).length > 0;
  if (!queryParameter) {
    try {
      const meals = await knex.from("meal").select("*");
      res.json(meals);
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: "Request not completed" });
    }
  } else {
    next();
  }
});

mealsRouter.post("/meals", async (req, res) => {
  try {
    const newMeal = req.body;
    await knex("meal").insert(newMeal);
    res.status(201).json({ status: "Success", meal: newMeal });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Request failed", error });
  }
});

// mealsRouter.post("/meals", async (req, res) => {
//   try {
//     await knex("meal").insert([
//       {
//         title: "Dhokla",
//         description: "Gram Flour puffed and spongy cake",
//         location: "ballerup",
//         when: "2024-08-15 07:48:26",
//         max_reservations: 5,
//         price: "67.00",
//         create_date: "2024-08-12 03:45:34",
//       },
//       {
//         title: "Samosa",
//         description: "Potato stuffed triangle shaped snacks",
//         location: "ballerup",
//         when: "2024-08-31 07:48:26",
//         max_reservations: 5,
//         price: "67.00",
//         create_date: "2024-08-15 03:45:34",
//       },
//     ]);
//     res.status(201).json({ status: "Success" });
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ message: "request is not completed" });
//   }
// });

mealsRouter.get("/meals/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const meal = await knex("meal")
      .leftJoin("reservation", "meal.id", "reservation.meal_id")
      .select(
        "meal.id",
        "meal.title",
        "meal.description",
        "meal.location",
        "meal.when",
        "meal.max_reservations",
        "meal.price",
        "meal.create_date",
        "meal.image_url",
        knex.raw(
          "meal.max_reservations - COALESCE(SUM(reservation.number_of_guest), 0) AS available_spots"
        )
      )
      .where("meal.id", id)
      .groupBy("meal.id");

    if (!meal || meal.length === 0) {
      return res.status(404).json({ error: "Meal not found" });
    }

    res.json(meal);
  } catch (error) {
    console.error("Error fetching meal:", error);
    res
      .status(500)
      .json({ error: "An internal error occurred while fetching the meal" });
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

mealsRouter.get("/meals", async (req, res) => {
  const {
    maxPrice,
    availableReservations = false,
    title,
    dateAfter,
    dateBefore,
    limit = 100,
    sortKey = "id",
    sortDir = "asc",
  } = req.query;

  try {
    let query = knex
      .from("meal")
      .leftJoin("reservation", "meal.id", "reservation.meal_id")
      .select(
        "meal.id",
        "meal.title",
        "meal.description",
        "meal.location",
        "meal.when",
        "meal.max_reservations",
        "meal.price",
        "meal.create_date",
        "meal.image_url",
        knex.raw(
          "meal.max_reservations - COALESCE(SUM(reservation.number_of_guest), 0) AS available_spots"
        )
      )
      .groupBy("meal.id");

    if (maxPrice) {
      const maxPriceNum = Number(maxPrice);
      if (!isNaN(maxPriceNum)) {
        query = query.where("price", "<=", maxPriceNum);
      } else {
        return res
          .status(400)
          .json({ message: "maxPrice must be a valid number" });
      }
    }

    const isAvailableReservations = availableReservations === "true";
    if (availableReservations) {
      query = query
        .leftJoin("reservation", "meal.id", "reservation.meal_id")
        .select(
          knex.raw(
            "COALESCE(SUM(reservation.number_of_guest), 0) AS total_guest"
          )
        )
        .groupBy("meal.id");

      if (isAvailableReservations) {
        query = query.havingRaw(
          "meal.max_reservations > COALESCE(SUM(reservation.number_of_guest), 0)"
        );
      } else {
        query = query.havingRaw(
          "meal.max_reservations <= COALESCE(SUM(reservation.number_of_guest), 0)"
        );
      }
    }

    if (title) {
      query = query.where("title", "like", `%${title}%`);
    }

    if (dateAfter) {
      const date = new Date(dateAfter);
      if (date.toString() === "Invalid Date") {
        return res
          .status(400)
          .json({ error: "Invalid dateBefore format. Use 'YYYY-MM-DD'." });
      }

      const formattedDate = date.toISOString().slice(0, 10);
      query = query.where("when", ">", formattedDate);
    }

    if (dateBefore) {
      const date = new Date(dateBefore);
      if (date.toString() === "Invalid Date") {
        return res
          .status(400)
          .json({ error: "Invalid dateBefore format. Use 'YYYY-MM-DD'." });
      }

      const formattedDate = date.toISOString().slice(0, 10);
      query = query.where("when", "<", formattedDate);
    }

    if (limit) {
      query = query.limit(limit);
    }

    if (sortKey) {
      const sortField = ["when", "available_spots", "price"];
      if (sortDir === "desc") {
        ("desc");
      } else {
        ("asc");
      }

      if (sortField.includes(sortKey)) {
        query = query.orderBy(sortKey, sortDir);
      }
    }

    const meals = await query;

    res.json(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ error: "An internal error occurred while fetching meals" });
    }
  }
});

export default mealsRouter;
