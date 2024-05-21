import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Button, Grid, Stack, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { getUserList } from "../../api/api";
import { UserManagementContext } from "../../context/UserManagementContext";
import CustomLayout from "../shared/CustomLayout";
import { useState } from "react";

const useStyles = makeStyles()((theme) => ({
  box: {
    width: "90%",
    height: "100%",
    marginTop: "4rem",
    background: "white",
    [theme.breakpoints.down("sm")]: {
      marginTop: "10px",
      width: "95%",
    },
  },
  wrapPaper: {
    cursor: "pointer",
    minHeight: "6rem",
    padding: "2rem",
    "&:hover": {
      border: "2px solid #e5840d",
    },
    [theme.breakpoints.down("lg")]: {
      minHeight: "12rem",
    },
    [theme.breakpoints.down("md")]: {
      minHeight: "5rem",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "2rem",
    },
  },
  btn: {
    width: "fit-content",
    marginBottom: "1rem",
    color: "#f9b34a",
    borderRadius: "1rem",
    padding: "0.8rem 1.2rem",
    marginTop: "3rem",
    "&: hover": {
      background: "#f9b34a",
      color: "white",
    },
  },
}));

export default function ToDoList() {
  const { userList, setUserList, setSelectedUserId } = React.useContext(
    UserManagementContext
  );
  const navigate = useNavigate();
  const { classes } = useStyles();
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    getUserList(setUserList);
  }, []);

  const viewDetails = () => {
    if (selectedId) {
      navigate(`/to-do-detail/${selectedId}`);
    }
  };

  const handleCardClick = (cardId) => {
    setSelectedId(cardId);
  };

  return (
    <CustomLayout>
      <Typography variant="h5" textAlign="center" m={4}>
        TO-DO LIST
      </Typography>
      <Typography variant="h5" textAlign="center" m={4}>
        Select a User
      </Typography>
      <Grid container direction="column" justifyContent="space-between">
        {!userList ? (
          <CircularProgress />
        ) : (
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            rowGap={3}
          >
            {userList &&
              userList.map((x, index) => (
                <Grid item key={index} xs={12} md={3.5} sx={{}}>
                  <Paper
                    onClick={() => handleCardClick(x.id)}
                    className={classes.wrapPaper}
                    sx={{
                      background: selectedId === x.id ? "#f9b34a" : "white",
                      border:
                        selectedId === x.id
                          ? "2px solid #e5840d"
                          : "2px solid white",
                    }}
                  >
                    <PersonOutlineIcon fontSize="large" />
                    <Typography variant="subtitle2">
                      name: <b> {x.name} </b>
                    </Typography>
                    <Typography variant="subtitle2">
                      username: <b>{x.username}</b>
                    </Typography>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        )}

        <Stack width="100%" alignItems="flex-end">
          <Button
            onClick={viewDetails}
            className={classes.btn}
            endIcon={<ArrowForwardIcon />}
          >
            View Details
          </Button>
        </Stack>
      </Grid>
    </CustomLayout>
  );
}
