"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function Host() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [hostingDate, setHostingDate] = useState("");
  const [maxReservation, setMaxReservation] = useState("");
  const [price, setPrice] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [formError, setFormError] = useState({
    titleError: "",
    descriptionError: "",
    locationError: "",
    hostingDateError: "",
    maxReservationError: "",
    priceError: "",
    createDateError: "",
    imageUrlError: "",
  });

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const locationRef = useRef(null);
  const hostingDateRef = useRef(null);
  const maxReservationRef = useRef(null);
  const priceRef = useRef(null);
  const createDateRef = useRef(null);
  const imageUrlRef = useRef(null);

  const handleKeyDown = (event, nextFieldRef) => {
    if (event.key === "Enter") {
      event.preventDefault();
      nextFieldRef.current?.focus();
    }
  };

  const validateInputs = () => {
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const location = locationRef.current.value;
    const hostingDate = hostingDateRef.current.value;
    const maxReservation = maxReservationRef.current.value;
    const price = priceRef.current.value;
    const createDate = createDateRef.current.value;
    const imageUrl = imageUrlRef.current.value;

    let titleError = "";
    let descriptionError = "";
    let locationError = "";
    let hostingDateError = "";
    let maxReservationError = "";
    let priceError = "";
    let createDateError = "";
    let imageUrlError = "";

    let isValid = true;

    if (title.trim() === "") {
      titleError = "Provide the Meal Title";
      isValid = false;
    }

    if (description.trim() === "") {
      descriptionError = "Provide the Meal description";
      isValid = false;
    }

    if (location.trim() === "") {
      locationError = "Enter your location";
      isValid = false;
    }

    if (hostingDate === "") {
      hostingDateError = "Please provide the Hosting date";
      isValid = false;
    }

    if (!Number(maxReservation) || maxReservation > 10) {
      maxReservationError =
        "Please provide the valid number less than or equal to 10";
      isValid = false;
    }

    if (!Number(price)) {
      priceError = "Provide valid price";
      isValid = false;
    }

    if (createDate === "") {
      createDateError = "Provide the date";
      isValid = false;
    }

    if (imageUrl.trim() === "") {
      imageUrlError = "Provide a valid image URL";
      isValid = false;
    }

    setFormError({
      titleError,
      descriptionError,
      locationError,
      hostingDateError,
      maxReservationError,
      priceError,
      createDateError,
      imageUrlError,
    });
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateInputs();

    if (!isValid) return;
    const newMeal = {
      title: title,
      description: description,
      location: location,
      when: hostingDate,
      max_reservations: maxReservation,
      price: price,
      create_date: createDate,
      image_url: imageUrl,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMeal),
      });
      if (response.ok) {
        const data = await response.json();
        alert("Meal Posting successful:", data);

        router.push("/");
      } else {
        console.error("Meal Posting Fail:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred while posting Meal:", error);
    }
  };

  return (
    <Box
      sx={{
        background: "url('/meal.sharing.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "90vh",
        width: "100vw",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h4" gutterBottom>
          "BE A HOST"
        </Typography>
        <Typography variant="h8" gutterBottom>
          Post your meal
        </Typography>

        <TextField
          required
          label="Meal Title"
          variant="outlined"
          inputRef={titleRef}
          sx={{ marginBottom: "1rem", width: "100%" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, descriptionRef)}
        />
        {formError.titleError && (
          <p style={{ color: "red" }}>{formError.titleError}</p>
        )}

        <TextField
          required
          label="Meal Description"
          variant="outlined"
          inputRef={descriptionRef}
          sx={{ marginBottom: "1rem", width: "100%" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, locationRef)}
        />
        {formError.descriptionError && (
          <p style={{ color: "red" }}>{formError.descriptionError}</p>
        )}

        <TextField
          required
          label="Location"
          variant="outlined"
          inputRef={locationRef}
          sx={{ marginBottom: "1rem", width: "100%" }}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, hostingDateRef)}
        />
        {formError.locationError && (
          <p style={{ color: "red" }}>{formError.locationError}</p>
        )}

        <TextField
          required
          type="date"
          variant="outlined"
          inputRef={hostingDateRef}
          sx={{ marginBottom: "1rem", width: "100%" }}
          value={hostingDate}
          onChange={(e) => setHostingDate(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, maxReservationRef)}
        />
        {formError.hostingDateError && (
          <p style={{ color: "red" }}>{formError.hostingDateError}</p>
        )}

        <TextField
          required
          id="max_reservation"
          label="Max Reservation (<=10)"
          variant="outlined"
          value={maxReservation}
          inputRef={maxReservationRef}
          onChange={(e) => setMaxReservation(e.target.value)}
          sx={{ marginBottom: "1rem", width: "100%" }}
          onKeyDown={(e) => handleKeyDown(e, priceRef)}
        />
        {formError.maxReservationError && (
          <p style={{ color: "red" }}>{formError.maxReservationError}</p>
        )}

        <TextField
          required
          id="price"
          label="Price"
          variant="outlined"
          inputRef={priceRef}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          sx={{ marginBottom: "1rem", width: "100%" }}
          onKeyDown={(e) => handleKeyDown(e, createDateRef)}
        />
        {formError.priceError && (
          <p style={{ color: "red" }}>{formError.priceError}</p>
        )}

        <TextField
          required
          type="date"
          variant="outlined"
          inputRef={createDateRef}
          sx={{ marginBottom: "1rem", width: "100%" }}
          value={createDate}
          onChange={(e) => setCreateDate(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, imageUrlRef)}
        />
        {formError.createDateError && (
          <p style={{ color: "red" }}>{formError.createDateError}</p>
        )}

        <TextField
          required
          label="Image URL"
          variant="outlined"
          inputRef={imageUrlRef}
          sx={{ marginBottom: "1rem", width: "100%" }}
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, titleRef)}
        />
        {formError.imageUrlError && (
          <p style={{ color: "red" }}>{formError.imageUrlError}</p>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: "1rem" }}
        >
          Post Meal
        </Button>
      </Box>
    </Box>
  );
}
