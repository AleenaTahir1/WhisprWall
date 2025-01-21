import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import Brightness4Icon from '@mui/icons-material/Brightness4';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            cursor: 'pointer',
            fontWeight: 'bold',
            '&:hover': { opacity: 0.8 }
          }}
          onClick={() => navigate('/')}
        >
          WhisprWall
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            startIcon={<EmojiObjectsIcon />}
            onClick={() => navigate('/daily-challenge')}
          >
            Daily Challenge
          </Button>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate('/create')}
            sx={{
              borderRadius: '20px',
              textTransform: 'none',
              px: 3
            }}
          >
            New Whisper
          </Button>

          <IconButton color="inherit" aria-label="toggle dark mode">
            <Brightness4Icon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
