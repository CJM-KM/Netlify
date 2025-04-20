import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
}));

function Navigation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <RouterLink to="/" className={classes.link}>
              Customer Journey Mapper
            </RouterLink>
          </Typography>
          <Button color="inherit" component={RouterLink} to="/journeys">
            Journeys
          </Button>
          <Button color="inherit" component={RouterLink} to="/create-journey">
            Create Journey
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navigation; 