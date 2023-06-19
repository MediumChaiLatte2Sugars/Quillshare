import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Card,
  Button,
  CardContent,
  CardHeader,
  Typography,
  Skeleton
} from "@mui/material";
import axios from 'axios';

const CommunityList = ({ user, isAuthenticated, currentViewer }) => {
  const [isFollowed, setIsFollowed] = useState(null);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      if (!isFollowed) {
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
      }
    };

    fetchFollowStatus(); // Call the fetchFollowStatus function
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
      alert("User successfully followed!");
      setIsFollowed(response.data[0]);
    } catch (err) {
      console.error(err);
      alert("An error occurred while following this user.");
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
      alert("User successfully unfollowed!");
    } catch (err) {
      console.error(err);
      alert("An error occurred while unfollowing this user.");
    }
  };

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {user ? user.username.split("")[0] : <Skeleton variant="circular" width={48} height={48} />}
          </Avatar>
        }
        title={user ? user.username : <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" />}
        subheader={user ? `Joined ${formatDate(user.created_at)}` : <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" />}
      />

      <Typography variant="body2" color="Bold" fontSize={20} sx={{ ml: 2 }}>
        Bio:
      </Typography>

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {user ? user.bio : <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" />}
        </Typography>
        <Button variant="contained" size="small">
          Visit Profile
        </Button>

        {isAuthenticated && currentViewer && (
          <Button variant="contained" size="small" sx={{ ml: 5 }} onClick={isFollowed ? handleUnFollow : handleFollow}>
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CommunityList;
