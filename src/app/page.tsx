"use client";

import { useEffect } from "react";
import { Container, Grid, Box, IconButton, Typography } from "@mui/material";
import { fetchFreelancers } from "../store/freelancerSlice";
import FreelancerCard from "../components/FreelancerCard";
import SearchFilters from "../components/SearchFilters";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "../theme/ThemeRegistry";
import { useAppDispatch, useAppSelector } from "../store/store";

export default function Home() {
  const dispatch = useAppDispatch();
  const { toggleTheme, isDarkMode } = useTheme();
  const freelancers = useAppSelector((state) => state.freelancer.freelancers);
  const filters = useAppSelector((state) => state.freelancer.searchFilters);
  const jobs = useAppSelector((state) => state.freelancer.jobs);
  const savedFreelancers = useAppSelector(
    (state) => state.freelancer.savedFreelancers
  );

  useEffect(() => {
    dispatch(fetchFreelancers());
  }, [dispatch]);

  const filteredFreelancers = freelancers.filter((freelancer) => {
    const nameMatch = freelancer.name
      .toLowerCase()
      .includes(filters.name.toLowerCase());
    const cityMatch = freelancer.address.city
      .toLowerCase()
      .includes(filters.city.toLowerCase());
    const jobCount = jobs.filter((job) => job.userId === freelancer.id).length;
    const jobCountMatch =
      jobCount >= filters.minJobs && jobCount <= filters.maxJobs;
    const savedMatch =
      !filters.savedOnly ||
      (filters.savedOnly && savedFreelancers.includes(freelancer.id));

    return nameMatch && cityMatch && jobCountMatch && savedMatch;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5">Freelance Marketplace</Typography>
        <IconButton onClick={toggleTheme} color="inherit">
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>

      <SearchFilters />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {filteredFreelancers.map((freelancer) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={freelancer.id}>
            <FreelancerCard
              freelancer={freelancer}
              jobCount={
                jobs.filter((job) => job.userId === freelancer.id).length
              }
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
