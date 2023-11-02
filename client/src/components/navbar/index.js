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

  const drawer = (
    <Box>
      <List>
        {['Home', 'Destinations', 'About', 'Blog'].map((text) => (
          <ListItem key={text}>
            <ListItemButton component={Link} to={text === 'Home' ? '/' : `/${text.toLowerCase()}`}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
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
            {['Home', 'Destinations', 'About', 'Blog'].map((text) => (
              <Button color="inherit" key={text} component={Link} to={text === 'Home' ? '/' : `/${text.toLowerCase()}`}>{text}</Button>
            ))}
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
