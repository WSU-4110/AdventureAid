import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Box, Drawer, Button, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import logo from "../../assets/img/logo/logo2.png"
import './index.scss';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = ['Home', 'Destinations', 'Budget', 'Blog', 'FAQ'];

  const drawer = (
    <Box>
      <List>
        {menuItems.map((text) => (
          <ListItem key={text}>
            <ListItemButton component={Link} to={text === 'Home' ? '/' : `/${text.toLowerCase()}`}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        {/* User Profile Link in Drawer */}
        <ListItem>
          <ListItemButton component={Link} to="/user-profile">
            <ListItemText primary="User Profile" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box>
      <AppBar
       className="app-bar" 
       position="static"
      >
        <Toolbar>
          {/* Logo on the left */}
          <Typography color="black" variant="h6" noWrap textAlign="left" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">
              <img src={logo} alt="logo" className="logo-img" />
            </Link>
          </Typography>

          {/* Desktop view - ListItems */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }} color="black" columnGap={8}>
            {menuItems.map((text) => (
              <Button color="inherit" key={text} component={Link} to={text === 'Home' ? '/' : `/${text.toLowerCase()}`}>{text}</Button>
            ))}
            {/* User Profile Button */}
            <Button color="inherit" component={Link} to="/user-profile">User Profile</Button>
          </Box>

          {/* Mobile view - Hamburger menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }} color="black">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
