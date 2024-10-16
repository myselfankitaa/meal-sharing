import React from "react";
import Image from "next/image";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";

const Meal = ({ meal }) => {
  const router = useRouter();
  return (
    <Box>
      <Card>
        <CardContent>
          <span>
            <Typography variant="h5" component="div">
              {meal.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Available Spots:{" "}
              {`${meal.available_spots} available out of ${meal.max_reservations} `}
            </Typography>
          </span>
          <Image
            src={`/images/${meal.image_url}.png`}
            alt={meal.title}
            width={400}
            height={300}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", flexWrap: "wrap" }}
          >
            {meal.description}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            justifyContent="space-between"
            margin={2}
          >
            <span>
              <strong>{`🌍 ${meal.location}`}</strong>
            </span>
            <span>{`📅  ${new Date(meal.when).toLocaleDateString()}`}</span>
          </Typography>

          <Typography
            variant="h6"
            fontSize="1.2em"
            fontWeight="bold"
            color="#28a745"
            margin-bottom="15px"
          >
            {`Price: ${meal.price} DKK`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            sx={{
              flexGrow: 1,
              marginRight: 1,
              backgroundColor: "#4caf50",
              "&:hover": {
                backgroundColor: "#388e3c",
              },
            }}
            onClick={() => {
              router.push(`/meals/${meal.id}`);
            }}
          >
            Reserve Now
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Meal;
