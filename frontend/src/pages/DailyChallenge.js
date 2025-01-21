import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import TimerIcon from '@mui/icons-material/Timer';
import PeopleIcon from '@mui/icons-material/People';

const DailyChallenge = () => {
  // Mock data
  const challenge = {
    question: "What's the kindest thing a stranger has ever done for you?",
    participantCount: 142,
    timeLeft: "14:32:45",
    responses: [
      {
        id: 1,
        content: "A stranger paid for my coffee when I forgot my wallet. It made my entire week!",
        likes: 24,
        avatar: "😊"
      },
      {
        id: 2,
        content: "Someone helped me change my tire in the rain without me even asking.",
        likes: 18,
        avatar: "🌟"
      },
      // Add more responses as needed
    ]
  };

  return (
    <Container maxWidth="lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mt: 4, 
            borderRadius: 4,
            background: 'linear-gradient(135deg, #6200ea 0%, #00bfa5 100%)',
            color: 'white'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <EmojiObjectsIcon sx={{ fontSize: 40 }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              Daily Whisper Challenge
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>
            {challenge.question}
          </Typography>

          <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
            <Chip
              icon={<PeopleIcon />}
              label={`${challenge.participantCount} participants`}
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
            />
            <Chip
              icon={<TimerIcon />}
              label={`Time left: ${challenge.timeLeft}`}
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
            />
          </Box>

          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              },
              borderRadius: '28px',
              px: 4,
            }}
          >
            Share Your Story
          </Button>
        </Paper>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
            Today's Responses
          </Typography>

          <Grid container spacing={3}>
            {challenge.responses.map((response) => (
              <Grid item xs={12} md={6} key={response.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card sx={{ 
                    height: '100%',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.2s ease-in-out'
                    }
                  }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                        <Avatar sx={{ 
                          bgcolor: 'primary.light',
                          width: 56,
                          height: 56,
                          fontSize: '1.5rem'
                        }}>
                          {response.avatar}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body1" sx={{ mb: 2 }}>
                            {response.content}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Button 
                              size="small" 
                              variant="outlined"
                              startIcon={<PeopleIcon />}
                            >
                              {response.likes} Relate
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
};

export default DailyChallenge;
