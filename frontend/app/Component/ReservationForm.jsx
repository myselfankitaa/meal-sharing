"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function ReservationForm({ id, availableSpots }) {
  const router = useRouter();

  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const [formError, setFormError] = useState({
    guestNameError: "",
    contactNumberError: "",
    emailError: "",
  });

  const guestNameRef = useRef(null);
  const numberOfGuestRef = useRef(null);
  const createDateRef = useRef(null);
  const contactNumberRef = useRef(null);
  const emailRef = useRef(null);

  const handleKeyDown = (event, nextFieldRef) => {
    if (event.key === "Enter") {
      event.preventDefault();
      nextFieldRef.current?.focus();
    }
  };

  const validateInput = () => {
    const guestName = guestNameRef.current.value;
    const numberOfGuest = numberOfGuestRef.current.value;
    const createDate = createDateRef.current.value;
    const contactNumber = contactNumberRef.current.value;
    const email = emailRef.current.value;

    let guestNameError = "";
    let contactNumberError = "";
    let emailError = "";
    let numberOfGuestError = "";

    let isValid = true;

    if (guestName.trim() === "") {
      guestNameError = "Name is required.";
      isValid = false;
    }

    if (numberOfGuest.length <= 0) {
      numberOfGuestError = "Please provide the number of guests.";
      isValid = false;
    } else if (parseInt(numberOfGuest) > availableSpots) {
      numberOfGuestError = `Only ${availableSpots} spots are available. Please adjust the number of guests.`;
      isValid = false;
    }

    if (contactNumber.length < 8) {
      contactNumberError = "Please provide a valid number.";
      isValid = false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      emailError = "Please enter a valid email address.";
      isValid = false;
    }

    setFormError({
      guestNameError,
      contactNumberError,
      emailError,
      numberOfGuestError,
    });
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateInput();
    if (isValid) {
      const reservationData = {
        number_of_guest: numberOfGuests,
        meal_id: id,
        create_date: createDate,
        contact_number: contactNumber,
        contact_name: contactName,
        contact_email: contactEmail,
      };

      console.log("Reservation Data:", reservationData);

      const fetchReservations = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/reservations`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(reservationData),
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log("Reservation successful:", data);
            alert("You have booked a seat.");
            router.push(`/meals/${id}`);
          } else {
            console.error("Reservation failed:", response.statusText);
          }
        } catch (error) {
          console.error("Error occurred while submitting reservation:", error);
        }
      };
      fetchReservations();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "500px",
        margin: "0 auto",
        padding: "2rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Make a Reservation
      </Typography>

      <TextField
        required
        label="Guest-Name"
        variant="outlined"
        inputRef={guestNameRef}
        sx={{ marginBottom: "1rem", width: "100%" }}
        value={contactName}
        onChange={(e) => setContactName(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, numberOfGuestRef)}
      />
      {formError.guestNameError && (
        <p style={{ color: "red" }}>{formError.guestNameError}</p>
      )}

      <TextField
        required
        label="Number Of Guests"
        variant="outlined"
        inputRef={numberOfGuestRef}
        sx={{ marginBottom: "1rem", width: "100%" }}
        value={numberOfGuests}
        onChange={(e) => setNumberOfGuests(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, createDateRef)}
      />
      {formError.numberOfGuestError && (
        <p style={{ color: "red" }}>{formError.numberOfGuestError}</p>
      )}

      <TextField
        required
        type="date"
        variant="outlined"
        inputRef={createDateRef}
        sx={{ marginBottom: "1rem", width: "100%" }}
        value={createDate}
        onChange={(e) => setCreateDate(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, contactNumberRef)}
      />

      <TextField
        required
        id="contact-number"
        label="Contact Number"
        variant="outlined"
        value={contactNumber}
        inputRef={contactNumberRef}
        onChange={(e) => setContactNumber(e.target.value)}
        sx={{ marginBottom: "1rem", width: "100%" }}
        onKeyDown={(e) => handleKeyDown(e, emailRef)}
      />
      {formError.contactNumberError && (
        <p style={{ color: "red" }}>{formError.contactNumberError}</p>
      )}

      <TextField
        required
        id="email"
        label="Email"
        type="email"
        variant="outlined"
        inputRef={emailRef}
        value={contactEmail}
        onChange={(e) => setContactEmail(e.target.value)}
        sx={{ marginBottom: "1rem", width: "100%" }}
        onKeyDown={(e) => handleKeyDown(e, guestNameRef)}
      />
      {formError.emailError && (
        <p style={{ color: "red" }}>{formError.emailError}</p>
      )}

      <Button type="submit" variant="contained" color="primary">
        Reserve Now
      </Button>
    </Box>
  );
}
