"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";

export default function CreateReviews({ id }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState("");
  const [createDate, setCreateDate] = useState("");

  const [formError, setFormError] = useState({
    titleError: "",
    descriptionError: "",
  });

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const starsRef = useRef(null);
  const createDateRef = useRef(null);

  const handleKeyDown = (event, nextFieldRef) => {
    if (event.key === "Enter") {
      event.preventDefault();
      nextFieldRef.current?.focus();
    }
  };

  const validateInput = () => {
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;

    let titleError = "";
    let descriptionError = "";

    let isValid = true;

    if (title.trim() === "") {
      titleError = "Title is required.";
      isValid = false;
    }

    if (description.trim() === "") {
      descriptionError = "Description is required.";
      isValid = false;
    }

    setFormError({
      titleError,
      descriptionError,
    });
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateInput();
    if (isValid) {
      const reviewData = {
        title: title,
        description: description,
        meal_id: id,
        stars: parseInt(stars),
        create_date: createDate || new Date().toISOString().split("T")[0],
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reviews`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reviewData),
          }
        );

        if (response.ok) {
          const data = await response.json();
          alert("Review Posted:", data);

          router.push("/meals");
        } else {
          console.error("Review post failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error occurred while submitting review:", error);
      }
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
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        Post a Review
      </Typography>

      <TextField
        required
        label="Title"
        variant="outlined"
        inputRef={titleRef}
        sx={{ marginBottom: "1rem", width: "100%" }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, descriptionRef)}
        error={!!formError.titleError}
        helperText={formError.titleError}
      />

      <TextField
        required
        label="Description"
        variant="outlined"
        inputRef={descriptionRef}
        sx={{ marginBottom: "1rem", width: "100%" }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, starsRef)}
        error={!!formError.descriptionError}
        helperText={formError.descriptionError}
      />

      <FormControl sx={{ marginBottom: "1rem", width: "100%" }}>
        <InputLabel id="stars-label">Stars</InputLabel>
        <Select
          labelId="stars-label"
          id="stars-select"
          value={stars}
          label="Stars"
          inputRef={starsRef}
          onChange={(e) => setStars(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, createDateRef)}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
        <FormHelperText>Select a rating from 1 to 5</FormHelperText>
      </FormControl>

      <TextField
        required
        type="date"
        label="Date"
        variant="outlined"
        inputRef={createDateRef}
        sx={{ marginBottom: "1rem", width: "100%" }}
        value={createDate}
        onChange={(e) => setCreateDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        onKeyDown={(e) => handleKeyDown(e, titleRef)}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          width: "100%",
          padding: "0.75rem",
          backgroundColor: "#4caf50",
          "&:hover": {
            backgroundColor: "#388e3c",
          },
        }}
      >
        Submit Review
      </Button>
    </Box>
  );
}
