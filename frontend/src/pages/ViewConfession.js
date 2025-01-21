import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  IconButton,
  TextField,
  Button,
  Divider,
  Chip,
  Card,
  CardContent,
} from '@mui/material';
import { motion } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PeopleIcon from '@mui/icons-material/People';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SendIcon from '@mui/icons-material/Send';

const ViewConfession = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comment, setComment] = useState('');

  // Mock data
  const confession = {
    id: 1,
    content: "I've been secretly learning to play the guitar to surprise my partner on our anniversary. It's been three months of hiding practice sessions and pretending to work late. The progress is slow, but their favorite song is starting to sound recognizable!",
    category: "Love",
    emotions: ["Excited", "Nervous", "Happy"],
    reactions: {
      upvotes: 156,
      hugs: 42,
      relatable: 89
    },
    avatar: "🎸",
    comments: [
      {
        id: 1,
        content: "This is so sweet! They're going to love it!",
        avatar: "💫",
        likes: 12,
        timestamp: "2 hours ago"
      },
      {
        id: 2,
        content: "I did something similar for my partner. The look on their face was priceless!",
        avatar: "🌟",
        likes: 8,
        timestamp: "1 hour ago"
      }
    ]
  };

  return (
    <Container maxWidth="md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 4 }}>
          {/* Confession Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar sx={{ 
              width: 60, 
              height: 60, 
              bgcolor: 'primary.light',
              fontSize: '2rem'
            }}>
              {confession.avatar}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Chip 
                label={confession.category}
                sx={{ 
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontWeight: 'bold',
                  mb: 1
                }}
              />
              <Box sx={{ display: 'flex', gap: 1 }}>
                {confession.emotions.map((emotion) => (
                  <Chip
                    key={emotion}
                    label={emotion}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
            <IconButton 
              onClick={() => setIsBookmarked(!isBookmarked)}
              color={isBookmarked ? "primary" : "default"}
            >
              {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </Box>

          {/* Confession Content */}
          <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.6 }}>
            {confession.content}
          </Typography>

          {/* Reaction Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Button
              variant="outlined"
              startIcon={<ThumbUpIcon />}
              sx={{ borderRadius: 20 }}
            >
              {confession.reactions.upvotes} Upvote
            </Button>
            <Button
              variant="outlined"
              startIcon={<FavoriteIcon />}
              sx={{ borderRadius: 20 }}
              color="secondary"
            >
              {confession.reactions.hugs} Hug
            </Button>
            <Button
              variant="outlined"
              startIcon={<PeopleIcon />}
              sx={{ borderRadius: 20 }}
            >
              {confession.reactions.relatable} Relatable
            </Button>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Comments Section */}
          <Typography variant="h6" gutterBottom>
            Supportive Comments
          </Typography>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="Share your thoughts or advice..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ borderRadius: 20 }}
            >
              Comment
            </Button>
          </Box>

          {/* Comment List */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {confession.comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'secondary.light' }}>
                        {comment.avatar}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          {comment.content}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Button
                            size="small"
                            startIcon={<ThumbUpIcon />}
                          >
                            {comment.likes}
                          </Button>
                          <Typography variant="caption" color="text.secondary">
                            {comment.timestamp}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default ViewConfession;
