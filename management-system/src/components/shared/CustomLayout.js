import { Grid, Box } from "@mui/material";
import React from "react";
import NavBar from "../Navbar";

const CustomLayout = ({ children }) => {
  return (
    <Grid
      container
      justifyContent="center"
      width="100%"
      sx={{
        background:
          "radial-gradient(circle, rgba(74,227,249,1) 0%, rgba(188,201,228,1) 100%);",
      }}
    >
      <Grid item width="85%" mt={4} mb={5} sx={{ background: "white" }}>
        <Box p={8}>
          <NavBar />
          {children}
        </Box>
      </Grid>
    </Grid>
  );
};

export default CustomLayout;
