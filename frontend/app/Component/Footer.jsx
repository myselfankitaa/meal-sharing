import React from "react";
import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#4caf50",
        color: "#fff",
        padding: "10px 20px",
        width: "100vw",
        height: "64px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        bottom: 0,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "#fff",
          marginLeft: "20px",
        }}
      >
        DishConnect
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        <Link href="/" underline="none" color="inherit">
          Home
        </Link>
        <Link href="/about" underline="none" color="inherit">
          About Us
        </Link>
        <Link href="/contact" underline="none" color="inherit">
          Contact
        </Link>
        <Link href="/meals" underline="none" color="inherit">
          Meals
        </Link>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "20px",
          gap: "10px",
        }}
      >
        <IconButton
          href="https://facebook.com"
          target="_blank"
          sx={{ color: "#fff" }}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          href="https://instagram.com"
          target="_blank"
          sx={{ color: "#fff" }}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          href="https://twitter.com"
          target="_blank"
          sx={{ color: "#fff" }}
        >
          <TwitterIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
