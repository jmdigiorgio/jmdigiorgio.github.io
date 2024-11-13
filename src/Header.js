// src/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TerminalIcon from '@mui/icons-material/Terminal';
import ArticleIcon from '@mui/icons-material/Article';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Header() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

  // Using require.context to dynamically load all components in the 'projects' folder
  const projectComponents = require.context('./components/projects', false, /\.jsx$/);
  const projectMenuItems = projectComponents.keys().map((fileName) => {
    const componentName = fileName.replace('./', '').replace('.jsx', '');
    return {
      label: componentName,
      path: `/projects/${componentName.toLowerCase()}`
    };
  });

  const menuItems = [
    { label: 'Projects', link: '/projects', isAnchor: true, icon: <TerminalIcon /> },
    { label: 'Resume', link: '/resume', isAnchor: false, icon: <ArticleIcon /> }
  ];

  return (
    <>
      <AppBar position="sticky" sx={{ background: 'linear-gradient(45deg, #3b5998, #8b9dc3)', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              textTransform: 'none',
              transition: 'transform 0.2s, color 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
                color: '#FFD700',
              }
            }}
          >
            <Typography component="div" sx={{ fontFamily: 'Arial, sans-serif', }}>
              Josh DiGiorgio
            </Typography>
          </Button>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Button
              color="inherit"
              onClick={handleMenuClick}
              startIcon={<TerminalIcon />}
              sx={{
                mx: 2,
                textTransform: 'none',
                transition: 'transform 0.2s, color 0.2s',
                fontFamily: 'Arial, sans-serif',
                '&:hover': {
                  transform: 'scale(1.1)',
                  color: '#FFD700',
                }
              }}
            >
              Projects
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {projectMenuItems.map((item) => (
                <MenuItem key={item.label} onClick={() => handleMenuItemClick(item.path)}>
                  {item.label}
                </MenuItem>
              ))}
            </Menu>

            <Button
              color="inherit"
              component={Link}
              to="/resume"
              startIcon={<ArticleIcon />}
              sx={{
                mx: 2,
                textTransform: 'none',
                transition: 'transform 0.2s, color 0.2s',
                fontFamily: 'Arial, sans-serif',
                '&:hover': {
                  transform: 'scale(1.1)',
                  color: '#FFD700',
                }
              }}
            >
              Resume
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              color="inherit"
              href="https://www.linkedin.com/in/joshdigiorgio/"
              target="_blank"
              startIcon={<LinkedInIcon />}
              rel="noopener noreferrer"
              sx={{
                textTransform: 'none',
                transition: 'transform 0.2s, color 0.2s',
                fontFamily: 'Arial, sans-serif',
                '&:hover': {
                  transform: 'scale(1.1)',
                  color: '#FFD700',
                }
              }}
            >
              LinkedIn
            </Button>
            <Button
              color="inherit"
              href="https://github.com/jmdigiorgio"
              target="_blank"
              startIcon={<GitHubIcon />}
              rel="noopener noreferrer"
              sx={{
                textTransform: 'none',
                transition: 'transform 0.2s, color 0.2s',
                fontFamily: 'Arial, sans-serif',
                '&:hover': {
                  transform: 'scale(1.1)',
                  color: '#FFD700',
                }
              }}
            >
              GitHub
            </Button>

            <IconButton
              color="inherit"
              aria-label="menu"
              sx={{ display: { xs: 'flex', md: 'none' } }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            {menuItems.map((item) => (
              <ListItem 
                button 
                key={item.label} 
                component={item.isAnchor ? 'a' : Link}
                href={item.isAnchor ? item.link : undefined}
                to={!item.isAnchor ? item.link : undefined}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Header;
