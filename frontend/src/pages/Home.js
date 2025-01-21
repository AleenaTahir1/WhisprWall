import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  InputBase,
  Paper,
  IconButton,
  Fab,
  Grow,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import ConfessionCard from '../components/ConfessionCard';

const categories = [
  { name: 'All', icon: '🌟' },
  { name: 'Love', icon: '❤️' },
  { name: 'Regrets', icon: '💭' },
  { name: 'Funny', icon: '😄' },
  { name: 'Secrets', icon: '🤐' },
  { name: 'Dreams', icon: '✨' },
];

const Home = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const confessions = [
    {
      id: 1,
      content: "I've been secretly learning to play the guitar to surprise my partner on our anniversary. It's been three months of hiding practice sessions and pretending to work late. The progress is slow, but their favorite song is starting to sound recognizable!",
      category: "Love",
      emotions: ["Excited", "Nervous"],
      reactions: { upvotes: 42, hugs: 12, relatable: 8 },
      avatar: "🎸",
      commentCount: 5
    },
    {
      id: 2,
      content: "Today I helped an elderly person cross the street, and they told me a fascinating story about their life during the walk. It was a small gesture but made both our days better.",
      category: "Dreams",
      emotions: ["Happy", "Grateful"],
      reactions: { upvotes: 35, hugs: 15, relatable: 10 },
      avatar: "🌟",
      commentCount: 3
    },
    // Add more mock confessions as needed
  ];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleRandomConfession = () => {
    const randomIndex = Math.floor(Math.random() * confessions.length);
    navigate(`/confession/${confessions[randomIndex].id}`);
  };

  return (
    <Container maxWidth="lg">
      <Grow in timeout={500}>
        <Box>
          {/* Search and Random Button */}
          <Box sx={{ display: 'flex', gap: 2, mb: 4, mt: 4 }}>
            <Paper
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                borderRadius: 20,
              }}
            >
              <IconButton sx={{ p: '10px' }}>
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search confessions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Paper>
            <Button
              variant="contained"
              startIcon={<ShuffleIcon />}
              onClick={handleRandomConfession}
              sx={{
                borderRadius: 20,
                px: 3,
                background: 'linear-gradient(45deg, #6200ea 30%, #00bfa5 90%)',
              }}
            >
              Random
            </Button>
          </Box>

          {/* Category Tabs */}
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 4 }}
          >
            {categories.map((category, index) => (
              <Tab
                key={category.name}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>{category.icon}</span>
                    {category.name}
                  </Box>
                }
              />
            ))}
          </Tabs>

          {/* Confessions Grid */}
          <Grid container spacing={3}>
            {confessions.map((confession, index) => (
              <Grid item xs={12} md={6} key={confession.id}>
                <Grow in timeout={500 * (index + 1)}>
                  <Box>
                    <ConfessionCard confession={confession} />
                  </Box>
                </Grow>
              </Grid>
            ))}
          </Grid>

          {/* Floating Action Button */}
          <Fab
            color="primary"
            aria-label="add"
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              background: 'linear-gradient(45deg, #6200ea 30%, #00bfa5 90%)',
            }}
            onClick={() => navigate('/create')}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Grow>
    </Container>
  );
};

export default Home;
