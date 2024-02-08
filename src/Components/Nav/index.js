import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import {AppBar,Toolbar,Button,Typography,IconButton,Drawer,List,ListItem,useMediaQuery} from '@mui/material'
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

    const removeData = () => {
    toast.warning('Your Logged Out Please Visit again');
    sessionStorage.removeItem('token');
  };

  return (
    <AppBar position="static" sx={{ marginBottom: 5 }}>
      <Toolbar >
        {/* Logo and Hamburger Icon for smaller screens */}
        {isSmallScreen ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              Product Management
            </Typography>
          </>
        ) : (
          // Logo for larger screens
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Product Management
          </Typography>
        )}

        {/* Navigation Links */}
        {isSmallScreen ? (
          // Render nothing on smaller screens (hamburger menu will handle it)
          <></>
        ) : (
          // Render navigation links on larger screens
          <>
            <Button color="inherit" component={Link} to="/products">
              Products
            </Button>
            <Button color="inherit" component={Link} to="/categories">
              Categories
            </Button>
            <Button color="inherit" component={Link} to="/add-product">
              Add Products
            </Button>
            <Button color="inherit" component={Link} to="/" onClick={removeData}>
              Logout
            </Button>
          </>
        )}

        {/* Responsive Drawer */}
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
          onClick={toggleDrawer(false)}
        >
          <List>
            <ListItem button component={Link} to="/products">
              Products
            </ListItem>
            <ListItem button component={Link} to="/categories">
              Categories
            </ListItem>
            <ListItem button component={Link} to="/add-products">
              Add Products
            </ListItem>
            <ListItem button component={Link} to="/logout">
              Logout
            </ListItem>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

