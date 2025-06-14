import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  People as PeopleIcon,
  AdminPanelSettings as AdminIcon,
  SupervisedUserCircle as SuperAdminIcon,
  Timeline as TimelineIcon,
  ShoppingCart as ShoppingCartIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import Layout from '../components/Layout';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2,
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      bgcolor: 'background.default',
      border: '1px solid',
      borderColor: 'divider',
    }}
  >
    <Box
      sx={{
        p: 1,
        borderRadius: 1,
        bgcolor: `${color}.lighter`,
        color: `${color}.main`,
      }}
    >
      <Icon />
    </Box>
    <Box>
      <Typography variant="h6" component="div">
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
    </Box>
  </Paper>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const renderSuperAdminDashboard = () => (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Welcome back, {user?.name}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          You have full control over the entire system. Manage users, admins, and monitor system activity.
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Users"
            value="16"
            icon={PeopleIcon}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Admins"
            value="10"
            icon={AdminIcon}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Super Admins"
            value="1"
            icon={SuperAdminIcon}
            color="warning"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              height: '100%',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="New user registered"
                  secondary="2 minutes ago"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Admin updated settings"
                  secondary="1 hour ago"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="System backup completed"
                  secondary="3 hours ago"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              height: '100%',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Manage Users"
                  secondary="View and manage all users"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="System Settings"
                  secondary="Configure system parameters" 
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </>
  );

  const renderAdminDashboard = () => (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Welcome back, {user?.name}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage users and monitor system activity from your admin dashboard.
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Users"
            value="5"
            icon={PeopleIcon}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Active Users"
            value="3"
            icon={TimelineIcon}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="New Users Today"
            value="1"
            icon={PeopleIcon}
            color="info"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              height: '100%',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="New user registered"
                  secondary="2 minutes ago"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="User profile updated"
                  secondary="1 hour ago"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="User logged in"
                  secondary="3 hours ago"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              height: '100%',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="View Users"
                  secondary="See all registered users"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="User Management"
                  secondary="Manage user accounts"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Activity Logs"
                  secondary="View user activity"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </>
  );

  const renderCustomerDashboard = () => (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Welcome back, {user?.name}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View your account information and recent activity.
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Orders"
            value="3"
            icon={ShoppingCartIcon}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Active Orders"
            value="1"
            icon={TimelineIcon}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Spent"
            value="$150"
            icon={AssessmentIcon}
            color="info"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              height: '100%',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Recent Orders
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Order #12345"
                  secondary="Delivered - 2 days ago"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Order #12344"
                  secondary="In Transit - 5 days ago"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Order #12343"
                  secondary="Delivered - 1 week ago"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              height: '100%',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="View Orders"
                  secondary="See all your orders"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Update Profile"
                  secondary="Manage your account"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Support"
                  secondary="Get help with your orders"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </>
  );

  const renderDashboardContent = () => {
    switch (user?.role) {
      case 'superadmin':
        return renderSuperAdminDashboard();
      case 'admin':
        return renderAdminDashboard();
      case 'customer':
        return renderCustomerDashboard();
      default:
        return null;
    }
  };

  return <Layout>{renderDashboardContent()}</Layout>;
};

export default Dashboard; 