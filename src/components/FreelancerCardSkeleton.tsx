"use client";

import { Skeleton, Box } from "@mui/material";

const FreelancerCardSkeleton = () => {
  return (
    <Box
      sx={{
        height: "100%",
        p: 2,
        bgcolor: "background.paper",
        borderRadius: 1,
        boxShadow: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        {/* Avatar */}
        <Skeleton variant="circular" width={60} height={60} sx={{ mr: 1 }} />
        <Box sx={{ width: "100%" }}>
          {/* Name */}
          <Skeleton variant="text" width="80%" />
        </Box>
      </Box>

      {/* Email */}
      <Skeleton variant="text" width="90%" sx={{ mb: 0.5 }} />

      {/* Phone */}
      <Skeleton variant="text" width="70%" sx={{ mb: 0.5 }} />

      {/* City */}
      <Skeleton variant="text" width="60%" sx={{ mb: 0.5 }} />

      {/* Completed Jobs */}
      <Skeleton variant="text" width="50%" sx={{ mb: 1 }} />
    </Box>
  );
};

export default FreelancerCardSkeleton;
