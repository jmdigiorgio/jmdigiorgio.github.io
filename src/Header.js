// src/Header.js
import React from 'react';
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

function Header() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { label: 'About', link: '#about' },
    { label: 'Projects', link: '#projects' },
    { label: 'Resume', link: '/resume.pdf' },
    { label: 'Contact', link: '#contact' }
  ];

  return (
    <>
      <AppBar position="sticky" sx={{ background: 'linear-gradient(45deg, #3b5998, #8b9dc3)', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button
            color="inherit"
            href="#home"
            sx={{
              textTransform: 'none',
              transition: 'transform 0.2s, color 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
                color: '#FFD700',
              }
            }}
          >
            <Typography variant="h6" component="div" sx={{ fontFamily: 'Courgette, cursive' }}>
              Josh DiGiorgio
            </Typography>
          </Button>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                href={item.link}
                target={item.label === 'Resume' ? '_blank' : '_self'}
                sx={{
                  mx: 2,
                  transition: 'transform 0.2s, color 0.2s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    color: '#FFD700',
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              color="inherit"
              href="https://www.linkedin.com/in/joshdigiorgio/"
              target="_blank"
              startIcon={<LinkedInIcon />}
              rel="noopener noreferrer"
              sx={{
                transition: 'transform 0.2s, color 0.2s',
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
                transition: 'transform 0.2s, color 0.2s',
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
              <ListItem button key={item.label} component="a" href={item.link}>
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
