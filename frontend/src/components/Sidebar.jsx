import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  SupervisedUserCircle as SuperAdminIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = {
  customer: [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Tickets', icon: <PeopleIcon />, path: '/tickets' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  ],
  admin: [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Tickets', icon: <PeopleIcon />, path: '/tickets' },
    { text: 'Departments', icon: <AdminIcon />, path: '/departments' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ],
  superadmin: [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Tickets', icon: <PeopleIcon />, path: '/tickets' },
    { text: 'Departments', icon: <AdminIcon />, path: '/departments' },
    { text: 'Escalation Rules', icon: <SettingsIcon />, path: '/escalation-rules' },
    { text: 'Admins', icon: <AdminIcon />, path: '/admins' },
    { text: 'Super Admins', icon: <SuperAdminIcon />, path: '/superadmins' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ],
};

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenuClick = (path) => {
    navigate(path);
    if (isMobile) {
      handleDrawerToggle();
    }
  };

  const userRole = user?.role || 'customer';
  const items = menuItems[userRole] || menuItems.customer;

  const drawer = (
    <>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" noWrap component="div">
          {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Panel
        </Typography>
      </Box>
      <Divider />
      <List>
        {items.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleMenuClick(item.path)}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.dark',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: 'background.paper',
          },
        }}
      >
        {drawer}
      </Drawer>
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: 'background.paper',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar; 