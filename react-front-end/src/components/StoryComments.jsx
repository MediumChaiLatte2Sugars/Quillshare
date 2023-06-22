import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, CircularProgress } from '@mui/material';
import Comment from './Comment';
import axios from 'axios';
import CommentForm from './form/CommentForm';

const styles = {
  modalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    outline: 'none',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '4px',
    outline: 'none',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflowY: 'auto',
  },
  closeButton: {
    marginLeft: 'auto',
  },
};

const formatDate = (date) => {
  const dateObject = new Date(date);
  const formattedDate = dateObject.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return formattedDate;
};

const CustomModal = ({ open, onClose, author, story, user }) => {
  const [comments, setComments] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(null);

  const fetchComments = async () => {
    try {
      const commentRes = await axios.get(`/api/stories/${story.id}/comments`);
      const commentData = commentRes.data;
      return setComments(commentData);
    } catch (err) {
      console.error(err);
    }
  };

  const onCommentSubmit = async (values) => {
    try {
      const response = await axios.post(`/api/stories/${story.id}/comments`, values);
      console.log("Comment response: ", response);
      alert("Comment submitted successfully!");
      const newComment = response.data.comment[0];
      console.log("Current Comments: ", comments);
      // Fetch the updated comments
      return setFetchTrigger(!fetchTrigger);
    } catch (err) {
      console.error(err);
      alert("An error occurred while submitting the comment.");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [fetchTrigger]); // Add comments as a dependency

  return (
    <Modal open={open} onClose={onClose} className={styles.modalContainer}>
      <Box sx={styles.modalContent}>
        <Button onClick={onClose} sx={styles.closeButton}>
          Close
        </Button>
        <Typography variant="h6" component="div" gutterBottom>
          Comments
        </Typography>
        {comments ? comments.map((comment) => (
              <Comment
                comment={{author: user.username, content: comment.content, createdAt: formatDate(comment.created_at)}}
              />
            )) : <CircularProgress size={20} color="inherit" />}
        <CommentForm story={story.id} user={user.id} onSubmit={onCommentSubmit} />
      </Box>
    </Modal>
  );
};

export default CustomModal;
