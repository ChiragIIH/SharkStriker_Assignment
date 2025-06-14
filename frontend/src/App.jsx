import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import Tickets from './pages/Tickets';
import TicketForm from './pages/TicketForm';
import TicketDetails from './pages/TicketDetails';
import Departments from './pages/Departments';
import EscalationRules from './pages/EscalationRules';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/tickets"
            element={
              <PrivateRoute>
                <Layout>
                  <Tickets />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/tickets/new"
            element={
              <PrivateRoute>
                <Layout>
                  <TicketForm />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/tickets/:id"
            element={
              <PrivateRoute>
                <Layout>
                  <TicketDetails />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/departments"
            element={
              <PrivateRoute>
                <Layout>
                  <Departments />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/escalation-rules"
            element={
              <PrivateRoute>
                <Layout>
                  <EscalationRules />
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
