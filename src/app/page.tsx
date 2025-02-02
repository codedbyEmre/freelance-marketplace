"use client";

import { useEffect, useState, Suspense } from "react";
import { Container, Grid, Typography, Skeleton, Box } from "@mui/material";
import { fetchFreelancers, fetchJobs } from "../store/freelancerSlice";
import FreelancerCard from "../components/FreelancerCard";
import SearchFilters from "../components/SearchFilters";
import Header from "../components/Header";
import { useAppDispatch, useAppSelector } from "../store/store";
import FreelancerCardSkeleton from "@/components/FreelancerCardSkeleton";

export default function Home() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const freelancers = useAppSelector((state) => state.freelancer.freelancers);
  const filters = useAppSelector((state) => state.freelancer.searchFilters);
  const jobs = useAppSelector((state) => state.freelancer.jobs);
  const savedFreelancers = useAppSelector(
    (state) => state.freelancer.savedFreelancers
  );

  useEffect(() => {
    const preloadData = () => {
      const freelancersPromise = dispatch(fetchFreelancers());
      const jobsPromise = dispatch(fetchJobs());

      Promise.all([freelancersPromise, jobsPromise])
        .then(() => setIsLoading(false))
        .catch((error) => {
          console.error("Error loading data:", error);
          setIsLoading(false);
        });
    };

    preloadData();
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
    <Suspense fallback={<Typography>Loading...</Typography>}>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <SearchFilters />
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {isLoading
            ? filteredFreelancers.map((freelancer) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={freelancer.id}>
                  <FreelancerCardSkeleton />
                </Grid>
              ))
            : filteredFreelancers.map((freelancer) => (
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
    </Suspense>
  );
}
