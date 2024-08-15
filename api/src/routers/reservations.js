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
    await knex("reservation").insert([
      {
        number_of_guest: 5,
        meal_id: 12,
        create_date: "2024-08-12 13:04:35",
        contact_number: "438-295-486",
        contact_name: "Eda",
        contact_email: "eda@welcome.dk",
      },
      {
        number_of_guest: 4,
        meal_id: 14,
        create_date: "2024-08-16 16:45:37",
        contact_number: "488-455-294",
        contact_name: "Simona",
        contact_email: "sim@hello.dk",
      },
    ]);
    res.status(201).json({ status: "Successfully updated reservation" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "request can not be processed" });
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
