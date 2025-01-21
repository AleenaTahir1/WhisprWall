import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

// Components (to be created)
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateConfession from './pages/CreateConfession';
import ViewConfession from './pages/ViewConfession';
import DailyChallenge from './pages/DailyChallenge';

// Create theme
const theme = createTheme({
  palette: {
    mode: 'light', // Will add dark mode toggle later
    primary: {
      main: '#6200ea',
    },
    secondary: {
      main: '#00bfa5',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateConfession />} />
              <Route path="/confession/:id" element={<ViewConfession />} />
              <Route path="/daily-challenge" element={<DailyChallenge />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
