import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Chip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Stack,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TimerIcon from '@mui/icons-material/Timer';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const categories = [
  { name: 'Love', icon: '❤️' },
  { name: 'Regrets', icon: '💭' },
  { name: 'Funny', icon: '😄' },
  { name: 'Secrets', icon: '🤐' },
  { name: 'Dreams', icon: '✨' },
];

const emotions = [
  'Happy', 'Sad', 'Excited', 'Nervous', 'Proud',
  'Grateful', 'Confused', 'Inspired', 'Angry', 'Peaceful'
];

const CreateConfession = () => {
  const [confession, setConfession] = useState('');
  const [category, setCategory] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [duration, setDuration] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEmotionToggle = (emotion) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter(e => e !== emotion));
    } else if (selectedEmotions.length < 3) {
      setSelectedEmotions([...selectedEmotions, emotion]);
    }
  };

  return (
    <Container maxWidth="md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Share Your Whisper
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              placeholder="What's on your mind? Share your thoughts anonymously..."
              value={confession}
              onChange={(e) => setConfession(e.target.value)}
              sx={{ mb: 3, mt: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.name} value={cat.name}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span>{cat.icon}</span>
                      {cat.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              <EmojiEmotionsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              How are you feeling? (Select up to 3)
            </Typography>
            <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {emotions.map((emotion) => (
                <Chip
                  key={emotion}
                  label={emotion}
                  onClick={() => handleEmotionToggle(emotion)}
                  color={selectedEmotions.includes(emotion) ? "primary" : "default"}
                  sx={{ 
                    '&:hover': { transform: 'scale(1.05)' },
                    transition: 'transform 0.2s'
                  }}
                />
              ))}
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                <TimerIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Auto-delete after
              </Typography>
              <Stack spacing={2} direction="row" alignItems="center" sx={{ px: 2 }}>
                <Typography>Never</Typography>
                <Slider
                  value={duration}
                  onChange={(e, newValue) => setDuration(newValue)}
                  step={1}
                  marks
                  min={0}
                  max={7}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => value === 0 ? 'Never' : `${value} days`}
                />
                <Typography>7 days</Typography>
              </Stack>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                startIcon={<DeleteOutlineIcon />}
                onClick={() => {
                  setConfession('');
                  setCategory('');
                  setSelectedEmotions([]);
                  setDuration(0);
                }}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                size="large"
                type="submit"
                sx={{
                  px: 4,
                  borderRadius: '28px',
                  background: 'linear-gradient(45deg, #6200ea 30%, #00bfa5 90%)',
                }}
              >
                Share Whisper
              </Button>
            </Box>
          </form>

          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Alert severity="success" sx={{ mt: 2 }}>
                Your whisper has been shared successfully!
              </Alert>
            </motion.div>
          )}
        </Paper>
      </motion.div>
    </Container>
  );
};

export default CreateConfession;
