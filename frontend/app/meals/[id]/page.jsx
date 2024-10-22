"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Modal,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

import { useRouter } from "next/navigation";
import ReservationForm from "@/app/Component/ReservationForm";
import MealReviews from "@/app/Component/Reviews";

export default function MealPage({ params }) {
  const { id } = params;
  const router = useRouter();

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openReservation, setOpenReservation] = useState(false);
  const [openReviews, setOpenReviews] = useState(false);

  const handleOpenReservation = () => setOpenReservation(true);
  const handleCloseReservation = () => setOpenReservation(false);

  const handleOpenReviews = () => setOpenReviews(true);
  const handleCloseReviews = () => setOpenReviews(false);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/meals/${id}`
        );
        const data = await response.json();
        if (data) {
          setMeal(data[0]);
        }
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!meal) {
    return <Typography>Meal not found</Typography>;
  }

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
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding={3}
        sx={{ minHeight: "80vh", width: { xs: "100%", sm: "90%", md: "70%" } }}
      >
        <Card sx={{ width: "100%", maxWidth: "700px", boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {meal.title}
            </Typography>

            <Box
              display="flex"
              justifyContent="center"
              marginBottom={2}
              sx={{ borderRadius: 2, overflow: "hidden" }}
            >
              <Image
                src={meal.image_url}
                alt={meal.title}
                width={400}
                height={250}
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
            </Box>

            <Box display="flex" justifyContent="space-between" flexWrap="wrap">
              <Box textAlign="left" flexBasis="50%">
                <Typography variant="body1" gutterBottom>
                  {meal.description}
                </Typography>
              </Box>

              <Box
                textAlign="right"
                flexBasis="50%"
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="flex-end"
              >
                <Typography variant="body2" gutterBottom>
                  <strong>Available Spots:</strong> {meal.available_spots}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>📅 Date:</strong>{" "}
                  {new Date(meal.when).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>🌍 Location:</strong> {meal.location}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="#28a745"
                  gutterBottom
                >
                  {`Price: ${meal.price} DKK`}
                </Typography>
              </Box>
            </Box>
          </CardContent>

          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenReservation}
              sx={{ flexGrow: 1, marginRight: 1 }}
            >
              Reserve Now
            </Button>

            <Modal
              open={openReservation}
              onClose={handleCloseReservation}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 2,
                }}
              >
                <ReservationForm
                  id={meal.id}
                  availableSpots={meal.available_spots}
                />
                <Button
                  onClick={handleCloseReservation}
                  sx={{ mt: 2 }}
                  variant="contained"
                  fullWidth
                >
                  Close
                </Button>
              </Box>
            </Modal>

            <Button
              variant="contained"
              color="secondary"
              onClick={handleOpenReviews}
              sx={{ flexGrow: 1, marginLeft: 1 }}
            >
              Reviews
            </Button>

            <Modal
              open={openReviews}
              onClose={handleCloseReviews}
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 2,
                }}
              >
                <MealReviews id={meal.id} />
                <Button
                  onClick={handleCloseReviews}
                  sx={{ mt: 2 }}
                  variant="contained"
                  fullWidth
                >
                  Close
                </Button>
              </Box>
            </Modal>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
}
