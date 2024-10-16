import express from "express";
import knex from "../database_client.js";

const reservationRouter = express.Router();

reservationRouter.get("/reservations", async (req, res) => {
  try {
    const reservations = await knex.from("reservation").select("*");
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(404).json({ Error: "Request not get completed" });
  }
});

reservationRouter.post("/reservations", async (req, res) => {
  try {
    // Destructure the incoming reservation data
    const {
      number_of_guest,
      meal_id,
      create_date,
      contact_number,
      contact_name,
      contact_email,
    } = req.body;

    if (
      !number_of_guest ||
      !meal_id ||
      !create_date ||
      !contact_number ||
      !contact_name ||
      !contact_email
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a reservation object
    const newReservation = {
      number_of_guest,
      meal_id,
      create_date,
      contact_number,
      contact_name,
      contact_email,
    };

    // Insert the reservation into the database
    await knex("reservation").insert(newReservation); // Make sure the table name matches your database schema

    // Respond with a success message and the inserted reservation data
    res.status(201).json({
      message: "Reservation created successfully",
      data: newReservation,
    });
  } catch (error) {
    console.error("Error inserting reservation:", error);
    res
      .status(500)
      .json({ message: "Request cannot be processed", error: error.message });
  }
});

reservationRouter.get("/reservations/:id", async (req, res) => {
  try {
    const param = req.params.id;
    const reservation = await knex
      .from("reservation")
      .select("*")
      .where("id", param);
    if (reservation.length > 0) {
      res.json(reservation);
    } else {
      res.status(404).json({ id: `${param}  does not exist` });
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "request not completed" });
  }
});

reservationRouter.put("/reservations/:id", async (req, res) => {
  const param = req.params.id;
  try {
    const updateReservation = await knex("reservation")
      .where({ id: param })
      .update({ number_of_guest: 4, meal_id: 14 });
    if (updateReservation > 0) {
      res.status(200).json({ status: "reservation successfully updated" });
    } else {
      res.status(404).json({ message: "Id does not exist" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ message: "There is issue while processing the request" });
  }
});

reservationRouter.delete("/reservations/:id", async (req, res) => {
  const param = req.params.id;
  try {
    const deleteReservation = await knex("reservation")
      .where({ id: param })
      .del();
    if (deleteReservation > 0) {
      res
        .status(200)
        .json({ status: `The reservation with id ${param} is deleted` });
    } else {
      res.status(404).json({ message: `id ${param} does not exist` });
    }
  } catch (error) {
    console.log(error),
      res.status(404).json({ message: `Couldn't process the request` });
  }
});

export default reservationRouter;
