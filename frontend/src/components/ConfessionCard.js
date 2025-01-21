import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Avatar,
  Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PeopleIcon from '@mui/icons-material/People';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useNavigate } from 'react-router-dom';

const categoryColors = {
  Love: '#ff69b4',
  Regrets: '#4a90e2',
  Funny: '#ffd700',
  Secrets: '#9c27b0',
  Dreams: '#4caf50'
};

const ConfessionCard = ({ confession }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/confession/${confession.id}`);
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
      onClick={handleCardClick}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar 
            sx={{ 
              bgcolor: categoryColors[confession.category],
              width: 48,
              height: 48,
              fontSize: '1.5rem'
            }}
          >
            {confession.avatar}
          </Avatar>
          <Box>
            <Chip
              label={confession.category}
              sx={{
                bgcolor: categoryColors[confession.category],
                color: 'white',
                fontWeight: 'bold',
                mb: 1
              }}
            />
            {confession.emotions && (
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {confession.emotions.map((emotion, index) => (
                  <Chip
                    key={index}
                    label={emotion}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.7rem' }}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Box>

        <Typography 
          variant="body1" 
          sx={{ 
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: 1.5
          }}
        >
          {confession.content}
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 'auto'
        }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              startIcon={<ThumbUpIcon />}
              onClick={(e) => {
                e.stopPropagation();
                // Handle upvote
              }}
            >
              {confession.reactions.upvotes}
            </Button>
            <Button
              size="small"
              startIcon={<FavoriteIcon />}
              onClick={(e) => {
                e.stopPropagation();
                // Handle hug
              }}
            >
              {confession.reactions.hugs}
            </Button>
            <Button
              size="small"
              startIcon={<PeopleIcon />}
              onClick={(e) => {
                e.stopPropagation();
                // Handle relatable
              }}
            >
              {confession.reactions.relatable}
            </Button>
          </Box>
          
          {confession.commentCount && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ChatBubbleOutlineIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {confession.commentCount}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ConfessionCard;
