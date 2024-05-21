import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "tss-react/mui";
import { NAVBAR_OPTONS } from "../../constant/navbar";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles()((theme) => ({
  cardMenu: {
    "& .MuiPaper-root": {
      width: "100% !important",
      left: "0px !important",
      maxWidth: "100%",
    },
  },
  blurBackground: {
    backdropFilter: "blur(8px)",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    position: "fixed",
    width: "100%",
    height: "100%",
  },
  wrapAppBar: {
    "& .MuiToolbar-root": {
      background: "#b8e2f2",
    },
    "& .MuiPaper-root": {
      left: 0,
      width: "100% !important",
    },
  },
}));

export default function MobileNavbar() {
  const { classes } = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
  };

  const onClickLink = (link) => {
    navigate(link);
  };

  return (
    <>
      <Box>
        <AppBar position="static" className={classes.wrapAppBar}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Menu
          className={classes.cardMenu}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{ top: "5px !important" }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {NAVBAR_OPTONS.map((res, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                onClickLink(res.link);
              }}
            >
              {res.title}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      {isMenuOpen && (
        <div className={classes.blurBackground} onClick={handleClose} />
      )}
    </>
  );
}
