"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CreateReviews from "./CreateReviews";

export default function MealReviews({ id }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const handleFetchReviews = async () => {
      if (showReviews) return;
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3001/api/meals/${id}/reviews`
        );
        const data = await response.json();
        console.log("Fetched reviews:", data);
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
        setShowReviews(true);
      }
    };

    handleFetchReviews();
  }, [id, showReviews]);

  const handleLeaveReviewClick = () => {
    setShowForm((prev) => !prev);
  };

  const renderStars = (stars) => {
    return (
      <Box display="flex" alignItems="center" sx={{ marginTop: "0.5rem" }}>
        {[...Array(stars)].map((_, index) => (
          <StarIcon
            key={index}
            style={{ color: "#FFD700", marginRight: "2px" }}
          />
        ))}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1.5rem",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      {loading && <Typography>Loading reviews...</Typography>}

      {showReviews && reviews.length > 0 ? (
        <List sx={{ width: "100%", padding: 0 }}>
          {reviews.map((review) => (
            <ListItem key={review.id} sx={{ padding: 0 }}>
              <Card
                variant="outlined"
                sx={{
                  width: "100%",
                  mb: 2,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  padding: "1rem",
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {review.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {review.description}
                  </Typography>

                  {renderStars(review.stars)}
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      ) : (
        showReviews && <Typography>No reviews available.</Typography>
      )}

      {showForm && (
        <Box sx={{ width: "100%", mt: 3 }}>
          <CreateReviews id={id} />
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        sx={{
          mt: 3,
          backgroundColor: "#4caf50",
          "&:hover": {
            backgroundColor: "#388e3c",
          },
        }}
        onClick={handleLeaveReviewClick}
      >
        {showForm ? "Cancel Review" : "Leave a Review"}
      </Button>
    </Box>
  );
}
