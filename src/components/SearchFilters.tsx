"use client";

import {
  Paper,
  TextField,
  FormControlLabel,
  Switch,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { updateSearchFilters } from "../store/freelancerSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

export default function SearchFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.freelancer.searchFilters);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchFilters({ name: event.target.value }));
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchFilters({ city: event.target.value }));
  };

  const handleMinJobsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, parseInt(event.target.value) || 0);
    dispatch(updateSearchFilters({ minJobs: value }));
  };

  const handleMaxJobsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(filters.minJobs, parseInt(event.target.value) || 0);
    dispatch(updateSearchFilters({ maxJobs: value }));
  };

  const handleSavedOnlyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(updateSearchFilters({ savedOnly: event.target.checked }));
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {/* Search by name */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Search by name"
            variant="outlined"
            value={filters.name}
            onChange={handleNameChange}
            size="small"
            fullWidth
          />
        </Grid>

        {/* Search by city */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Search by city"
            variant="outlined"
            value={filters.city}
            onChange={handleCityChange}
            size="small"
            fullWidth
          />
        </Grid>

        {/* Job Range */}
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
              Jobs:
            </Typography>
            <TextField
              label="Min"
              type="number"
              variant="outlined"
              value={filters.minJobs}
              onChange={handleMinJobsChange}
              size="small"
              InputProps={{ inputProps: { min: 0 } }}
              sx={{ width: 100 }}
            />
            <TextField
              label="Max"
              type="number"
              variant="outlined"
              value={filters.maxJobs}
              onChange={handleMaxJobsChange}
              size="small"
              InputProps={{ inputProps: { min: filters.minJobs } }}
              sx={{ width: 100 }}
            />
          </Box>
        </Grid>

        {/* Saved Only Switch */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControlLabel
            control={
              <Switch
                checked={filters.savedOnly}
                onChange={handleSavedOnlyChange}
              />
            }
            label="Show saved only"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
