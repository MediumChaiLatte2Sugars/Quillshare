import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Card,
  Button,
  CardContent,
  CardHeader,
  Typography,
  Skeleton,
  Snackbar
} from "@mui/material";
import axios from 'axios';
import { Link } from 'react-router-dom';

const CommunityList = ({ user, isAuthenticated, currentViewer }) => {
  const [isFollowed, setIsFollowed] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchFollowStatus = async () => {
    try {
      const queryParams = {
        user2: user.id,
        user1: currentViewer.id
      };
      
      const response = await axios.get(`/api/subscriptions/check`, { params: queryParams });
      console.log("Fetching follower status res: ", response);
      setIsFollowed(response.data.subs[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFollowStatus(); // Call the fetchFollowStatus function
  }, []);
  
  useEffect(() => {
    const fetchFollowStatusOnChange = async () => {
      if (!isFollowed) {
        fetchFollowStatus();
      }
    };
  
    fetchFollowStatusOnChange(); // Call the fetchFollowStatusOnChange function
  }, [isFollowed]);
  

  const formatDate = (date) => {
    const dateObject = new Date(date);
    const formattedDate = dateObject.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return formattedDate;
  };

  const handleFollow = async () => {
    try {
      const response = await axios.post(`/api/subscriptions/`, {
        user1: currentViewer.id,
        user2: user.id,
      });
      console.log("Handle follow res: ", response);
      setIsFollowed(response.data[0]);
      setSnackbarMessage("User successfully followed!");
      setSnackbarOpen(true);
      setIsFollowed(response.data[0]);
    } catch (err) {
      console.error(err);
      setSnackbarMessage("An error occurred while following this user.");
      setSnackbarOpen(true);
    }
  };

  const handleUnFollow = async () => {
    try {
      const response = await axios.delete(`/api/subscriptions/${isFollowed.id}`, {
        user1: currentViewer.id,
        user2: user.id,
      });
      console.log("Handle follow res: ", response);
      setIsFollowed(null);
      setSnackbarMessage("User successfully unfollowed!");
      setSnackbarOpen(true);
    } catch (err) {
      console.error(err);
      setSnackbarMessage("An error occurred while unfollowing this user.");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };


  return (
    <Card sx={{ margin: 5 }}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
          {user ? user.username.charAt(0) : <Skeleton variant="circular" width={48} height={48} />}
        </Avatar>
      }
      title={user ? user.username : <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />}
      subheader={user ? `Joined ${formatDate(user.created_at)}` : <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />}
    />

    <CardContent>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {user ? user.bio : <Skeleton variant="text" sx={{ fontSize: "1rem" }} animation="wave" />}
      </Typography>

      <Link to={`/user/${user.id}`} style={{ textDecoration: "none" }}>
        <Button variant="contained" size="small">
          Visit Profile
        </Button>
      </Link>

      {isAuthenticated && currentViewer && (
        <Button variant="contained" size="small" sx={{ ml: 2 }} onClick={isFollowed ? handleUnFollow : handleFollow}>
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      )}
    </CardContent>

    <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
  </Card>
  );
};

export default CommunityList;
