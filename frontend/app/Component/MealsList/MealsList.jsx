"use client";

import Meal from "../Meal/Meal";
import { useEffect, useState } from "react";
import { Box, TextField, Button, MenuItem, Typography } from "@mui/material";

export default function MealsList() {
  const [meals, setMeals] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [sortKey, setSortKey] = useState("when");
  const [sortDir, setSortDir] = useState("asc");

  const sortOptions = [
    { value: "when", label: "Date" },
    { value: "available_spots", label: "Available Reservations" },
    { value: "price", label: "Price" },
  ];

  const fetchMeals = async (query = "", sortKey = "when", sortDir = "asc") => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/meals?title=${query}&sortKey=${sortKey}&sortDir=${sortDir}`
      );
      const data = await response.json();
      setMeals(data);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleSearch = () => {
    fetchMeals(searchTitle, sortKey, sortDir);
  };

  const handleSortKeyChange = (e) => {
    setSortKey(e.target.value);
    fetchMeals(searchTitle, e.target.value, sortDir);
  };

  const handleSortDirChange = (e) => {
    setSortDir(e.target.value);
    fetchMeals(searchTitle, sortKey, e.target.value);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={4}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginBottom={4}
        gap={2}
      >
        <TextField
          label="Search by title"
          variant="outlined"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          sx={{
            width: "300px",
          }}
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#4caf50",
            color: "#fff",
            height: "56px",
            "&:hover": {
              backgroundColor: "#388e3c",
            },
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        marginBottom={4}
      >
        <TextField
          select
          label="Sort By"
          value={sortKey}
          onChange={handleSortKeyChange}
          variant="outlined"
          sx={{
            width: "200px",
          }}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Order"
          value={sortDir}
          onChange={handleSortDirChange}
          variant="outlined"
          sx={{
            width: "200px",
          }}
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </TextField>
      </Box>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={4}
        sx={{ width: "100%", padding: 2 }}
      >
        {meals.length > 0 ? (
          meals.map((meal) => (
            <Box
              key={meal.id}
              sx={{ width: { xs: "100%", sm: "45%", md: "30%" } }}
            >
              <Meal meal={meal} />
            </Box>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            No meals available
          </Typography>
        )}
      </Box>
    </Box>
  );
}
