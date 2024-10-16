"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Contact() {
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Thanks for contacting us! We will contact you shortly.");
    router.push(`/meals`);
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
        sx={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "2rem",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" gutterBottom>
          Have questions or want to share feedback? Fill out the form below, and
          we’ll get back to you soon!
        </Typography>

        {isClient && (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              type="email"
              required
            />
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Send Message
            </Button>
          </form>
        )}

        <Box sx={{ marginTop: "2rem" }}>
          <Typography variant="h6">Contact Information</Typography>
          <Typography variant="body1">
            Email: support@dishconnect.com
          </Typography>
          <Typography variant="body1">Phone: +45 987-123-4567</Typography>
          <Typography variant="body1">
            Address: 123 Meal St, Food City, FC 12345
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
