"use client";

import {
  Paper,
  TextField,
  Slider,
  FormControlLabel,
  Switch,
  Box,
} from "@mui/material";
import { updateSearchFilters } from "../store/freelancerSlice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";

export default function SearchFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.freelancer.searchFilters);
  const [jobRange, setJobRange] = useState<number[]>([
    filters.minJobs,
    filters.maxJobs,
  ]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchFilters({ name: event.target.value }));
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchFilters({ city: event.target.value }));
  };

  const handleJobRangeChange = (_event: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    setJobRange([min, max]);
    dispatch(updateSearchFilters({ minJobs: min, maxJobs: max }));
  };

  const handleSavedOnlyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(updateSearchFilters({ savedOnly: event.target.checked }));
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Search by name"
          variant="outlined"
          value={filters.name}
          onChange={handleNameChange}
          size="small"
        />
        <TextField
          label="Search by city"
          variant="outlined"
          value={filters.city}
          onChange={handleCityChange}
          size="small"
        />
        <Box sx={{ px: 2 }}>
          <p>Completed Jobs Range</p>
          <Slider
            value={jobRange}
            onChange={handleJobRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={100}
          />
        </Box>
        <FormControlLabel
          control={
            <Switch
              checked={filters.savedOnly}
              onChange={handleSavedOnlyChange}
            />
          }
          label="Show saved freelancers only"
        />
      </Box>
    </Paper>
  );
}
