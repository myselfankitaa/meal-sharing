import React from "react";
import { Box, Typography, Container } from "@mui/material";

export default function AboutUs() {
  return (
    <Box
      sx={{
        background: "url('/about.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "90vh",
        width: "100vw",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "left",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          position: "absolute",
          top: "20px",
          right: "80px",
          fontWeight: "bold",
          color: "#B58E24",
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
          fontSize: { xs: "2rem", md: "3.5rem" },
        }}
      >
        About Us
      </Typography>
      <Typography
        variant="body1"
        sx={{
          position: "absolute",
          top: "100px",
          right: "80px",
          color: "#B58E24",
          maxWidth: "600px",
          fontSize: { xs: "1rem", md: "1.15rem" },

          lineHeight: 1.6,
        }}
      >
        Welcome to DishConnect, a community-driven platform dedicated to sharing
        delicious meals and connecting food enthusiasts!
      </Typography>
      <Typography
        variant="body1"
        sx={{
          position: "absolute",
          top: "200px",
          right: "80px",
          color: "#B58E24",
          maxWidth: "600px",
          fontSize: { xs: "1rem", md: "1.15rem" },

          lineHeight: 1.6,
        }}
      >
        At DishConnect, we believe that food brings people together. Our mission
        is to create a space where home cooks and food lovers can come together
        to share their passion for cooking and enjoying good food.
      </Typography>
      <Typography
        variant="body1"
        sx={{
          position: "absolute",
          top: "350px",
          right: "80px",
          color: "#B58E24",
          maxWidth: "600px",
          fontSize: { xs: "1rem", md: "1.15rem" },

          lineHeight: 1.6,
        }}
      >
        Whether you are a seasoned chef or just love trying new recipes, we
        invite you to join our community. You can host your own meals, meet new
        people, and experience the joy of sharing a table with others.
      </Typography>
      <Typography
        variant="body1"
        sx={{
          position: "absolute",
          top: "450px",
          right: "80px",
          color: "#B58E24",
          maxWidth: "600px",
          fontSize: { xs: "1rem", md: "1.15rem" },

          lineHeight: 1.6,
        }}
      >
        Join us on this culinary journey, and let’s make meal-sharing a
        delightful experience for everyone!
      </Typography>
    </Box>
  );
}
