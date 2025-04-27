import React, { useState, useEffect } from 'react';
import { Outlet, Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  IconButton,
  ListItemButton,
  ListItemText,
  Typography,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/storage';

const drawerWidth = 240;
const navItems = [
  { text: 'Students', path: '/students' },
  { text: 'Chat', path: '/chat' }
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const savedPath = getFromLocalStorage('currentPath', '/students');
    if (location.pathname === '/' && savedPath !== '/') {
      navigate(savedPath);
    }
  }, [location.pathname, navigate]);
  
  useEffect(() => {
    if (location.pathname !== '/') {
      saveToLocalStorage('currentPath', location.pathname);
    }
  }, [location.pathname]);

  const toggleDrawer = () => setMobileOpen(open => !open);

  const drawerContent = (
    <Box>
      <Toolbar />
      <Divider />
      <List>
        {navItems.map(item => (
          <ListItemButton
            key={item.text}
            component={RouterLink}
            to={item.path}
            selected={location.pathname === item.path}
            onClick={() => setMobileOpen(false)}
          >
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Student Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: drawerWidth }
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' }
        }}
      >
        {drawerContent}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { xs: 0, md: `${drawerWidth}px` }
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}