"use client";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        backgroundImage: 'url("/homePageImage/Home_Image.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "80vh",
        width: "100vw",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          position: "absolute",
          top: "20px",
          left: "30px",
          fontWeight: "bold",
          color: "#FFDB58",
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
          fontSize: { xs: "2rem", md: "3.5rem" },
        }}
      >
        DishConnect
      </Typography>

      <Typography
        variant="body1"
        sx={{
          position: "absolute",
          top: "20px",
          right: "30px",
          color: "#FFDB58",
          maxWidth: "300px",
          fontSize: { xs: "1rem", md: "1rem" },
          textShadow: "1px 1px 4px rgba(0, 0, 0, 0.5)",
          lineHeight: 1.6,
          alignItems: "left",
        }}
      >
        Where food and community come together! Our platform connects passionate
        home cooks with food lovers, creating opportunities to share homemade
        meals, stories, and experiences.
      </Typography>

      <Button
        size="large"
        variant="contained"
        onClick={() => router.push("/meals")}
        sx={{
          backgroundColor: "#4caf50",
          color: "#FFDB58",
          fontWeight: "bold",
          padding: "20px 40px",
          fontSize: "1.5rem",
          borderRadius: "10px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#388e3c",
          },
        }}
      >
        Explore Meals
      </Button>
    </Box>
  );
}
