import React, { useState } from 'react';
// material-ui
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

// third party
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  navlinks: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      marginLeft: theme.spacing(10),
    },
  },
  logo: {
    flexGrow: 1,
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    fontSize: '20px',
    marginLeft: theme.spacing(2),
    '&:hover': {
      color: 'yellow',
      borderBottom: '1px solid white',
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(3),
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: 200,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const removeData = () => {
    toast.warning('Your Logged Out Please Visit again');
    sessionStorage.removeItem('token');
  };

  return (
    <>
      <AppBar position="static" style={{ marginBottom: 40 }}>
        <CssBaseline />
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className={classes.logo}>
            Products Management
          </Typography>
          <div className={classes.navlinks}>
            <Link to="/products" className={classes.link}>
              Products
            </Link>
            <Link to="/categories" className={classes.link}>
              Categories
            </Link>
            <Link to="/add-product" className={classes.link}>
              Add Product
            </Link>
            <Link onClick={removeData} to="/" className={classes.link}>
              Logout
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <List>
          <ListItem button component={Link} to="/products" onClick={toggleDrawer}>
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem button component={Link} to="/categories" onClick={toggleDrawer}>
            <ListItemText primary="Categories" />
          </ListItem>
          <ListItem button component={Link} to="/add-product" onClick={toggleDrawer}>
            <ListItemText primary="Add Product" />
          </ListItem>
          <ListItem button onClick={removeData} component={Link} to="/">
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
