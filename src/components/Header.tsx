"use client";

import { memo } from "react";
import { Box, Typography, IconButton, Container } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "../theme/ThemeRegistry";
import { useRouter } from "next/navigation";

const Header = memo(function Header() {
  const { toggleTheme, isDarkMode } = useTheme();
  const router = useRouter();

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            cursor: "pointer",
            fontWeight: 500,
            "&:hover": {
              opacity: 0.8,
            },
          }}
          onClick={() => router.push("/")}
        >
          Freelance Marketplace
        </Typography>
        <IconButton
          onClick={toggleTheme}
          color="inherit"
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Container>
    </Box>
  );
});

export default Header;
