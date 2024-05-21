import { Grid, Stack, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { NAVBAR_OPTONS } from "../../constant/navbar";
import { Link } from "react-router-dom";

const useStyles = makeStyles()((theme) => ({
  wrapNav: {
    width: 1200,
    marginTop: 50,
    [theme.breakpoints.down("lg")]: {
      width: "85%",
    },
  },
  link: {
    textDecoration: "none",
    color: "black",
    ":hover": {
      textDecoration: "underline",
      color: "blue",
      cursor: "pointer",
    },
  },
}));

const NavBar = () => {
  const { classes } = useStyles();

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      className="navbar"
    >
      <Grid item>
        <Stack direction="row" alignItems="center" columnGap={1}>
          <Typography variant="subtitle1">MindHive AI</Typography>
        </Stack>
      </Grid>
      <Grid item mr={4}>
        <Stack direction="row" alignItems="center" columnGap={2}>
          {NAVBAR_OPTONS.map((res, index) => (
            <Link key={index} to={res.link} className={classes.link}>
              <Typography variant="h7" fontWeight="bold">
                {res.title}
              </Typography>
            </Link>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default NavBar;
