import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import TemporaryDrawer from "./TemporaryDrawer";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

const NavBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <TemporaryDrawer />

        <Typography variant="h6" className={classes.title} color="inherit">
          <Link to="/" o className={classes.link} color="inherit">
            COOKIT
          </Link>
        </Typography>
        <Typography variant="h6" className={classes.title}>
          <Link to="/recipes" o className={classes.link} color="inherit">
            RECIPES
          </Link>
        </Typography>
        <Typography variant="h6" className={classes.title} color="inherit">
          <Link to="/search" className={classes.link} color="inherit">
            SEARCH
          </Link>
        </Typography>
        <Button color="inherit">
          <PersonOutlineIcon fontSize="large" />
        </Button>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
