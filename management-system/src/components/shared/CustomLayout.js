import { Box, Grid } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import NavBar from "./Navbar";
import MobileNavbar from "./MobileNavbar";

const useStyles = makeStyles()((theme) => ({
  img: {
    width: "100%",
    height: "100%",
  },
  header: {
    display: "block",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  mobileHeader: {
    display: "none",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  wrapGrid: {
    width: 1300,
    background: "white",
    marginTop: 35,
    marginBottom: 35,
    padding: "1rem 5rem",
    [theme.breakpoints.down("lg")]: {
      padding: "1rem 3rem",
      width: "95%",
    },
    [theme.breakpoints.down("md")]: {
      margin: "10px 0px",
      padding: "0px",
    },
  },
}));

const CustomLayout = ({ children }) => {
  const { classes } = useStyles();

  return (
    <Grid
      container
      justifyContent="center"
      width="100%"
      minHeight="100vh"
      sx={{
        background:
          "radial-gradient(circle, rgba(74,227,249,1) 0%, rgba(188,201,228,1) 100%);",
      }}
    >
      <div className={classes.mobileHeader}>
        <MobileNavbar />
      </div>
      <Grid item width="85%" mt={4} mb={5} sx={{ background: "white" }}>
        <Box p={{ xs: 3, sm: 3, md: 8, lg: 8 }}>
          <div className={classes.header}>
            <NavBar />
          </div>
          {children}
        </Box>
      </Grid>
    </Grid>
  );
};

export default CustomLayout;
