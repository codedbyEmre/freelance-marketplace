"use client";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import { Freelancer } from "../types/freelancer";
import { toggleSaveFreelancer } from "../store/freelancerSlice";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../store/store";

interface FreelancerCardProps {
  freelancer: Freelancer;
  jobCount: number;
}

export default function FreelancerCard({
  freelancer,
  jobCount,
}: FreelancerCardProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const savedFreelancers = useAppSelector(
    (state) => state.freelancer.savedFreelancers
  );
  const isSaved = savedFreelancers.includes(freelancer.id);

  const handleSave = () => {
    dispatch(toggleSaveFreelancer(freelancer.id));
  };

  const handleViewProfile = () => {
    router.push(`/portfolio/${freelancer.id}`);
  };

  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 1,
      }}
    >
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <Avatar
            src={`https://i.pravatar.cc/150?u=${freelancer.id}`}
            alt={freelancer.name}
            sx={{ width: 60, height: 60, marginRight: 1 }}
          />
          <div>
            <Typography gutterBottom variant="body1" component="div">
              {freelancer.name}
            </Typography>
          </div>
        </div>
        <Typography variant="body2" color="text.secondary">
          {freelancer.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Phone: {freelancer.phone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          City: {freelancer.address.city}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Completed Jobs: {jobCount}
        </Typography>
      </CardContent>
      <CardActions sx={{ pt: 0, justifyContent: "space-between" }}>
        <Button size="small" onClick={handleViewProfile}>
          VIEW PROFILE
        </Button>
        <Button
          size="small"
          onClick={handleSave}
          startIcon={isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        >
          {isSaved ? "SAVED" : "SAVE"}
        </Button>
      </CardActions>
    </Card>
  );
}
