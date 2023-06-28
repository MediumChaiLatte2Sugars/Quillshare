import React from 'react';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';

const Comment = ({ comment }) => {
  const { author, content, createdAt } = comment;

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar>{author.charAt(0)}</Avatar>
          <Typography variant="subtitle1" ml={2}>
            {author}
          </Typography>
        </Box>
        <Typography variant="body1">{content}</Typography>
        <Box mt={2} display="flex" alignItems="center">
          <Typography variant="body2" color="textSecondary">
            {createdAt}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Comment;
