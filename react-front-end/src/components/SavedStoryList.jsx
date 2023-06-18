import React, {useState, useEffect} from 'react';
import { Favorite, FavoriteBorder, Share , LibraryAdd ,ModeComment, AutoStories, Schedule } from "@mui/icons-material";
import {
  Avatar,
  Card,
  Box,
  Button,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
  Skeleton,
  CircularProgress,
  Tooltip
} from "@mui/material";

import { Link } from 'react-router-dom';

import axios from 'axios';

import html2plaintext from 'html2plaintext';


import { Visibility ,Bookmarks, IosShare } from "@mui/icons-material";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

const SavedStoryList = ({story, author, currentViewer}) => {

  const [value, setValue] = useState(0);
  const [user, setUser] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);


  const truncateString = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str; // No truncation needed
    }
    
    // Truncate the string and add ellipses
    const truncated = str.substring(0, maxLength - 3) + '...';
    return truncated;
  }

  const handleBookmark = async () => {
    try {
      const response = await axios.post(`/api/users/${currentViewer}/saved-stories`, {
        story_id: story.id,
        user_id: currentViewer,
      });
      setIsBookmarked(response.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnbookmark = async () => {
    try {
      console.log("Saved story id before deleting: ", isBookmarked.id , "Bookmark: ", isBookmarked);
      const response = await axios.delete(`/api/users/${currentViewer}/saved-stories/${isBookmarked.id}`);
      console.log("Handle Unbookmark Response: ", response);
      setIsBookmarked(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.post("/api/likes", {
        story_id: story.id,
        user_id: currentViewer,
      });
      setIsLiked(response.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnlike = async () => {
    try {
      console.log("Like id before deleting: ", isLiked.id);
      const response = await axios.delete(`/api/likes/${isLiked.id}`);
      console.log("Handle UnLike Response: ", response.data);
      setIsLiked(null);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (date) => {
    const dateObject = new Date(date);

    const formattedDate = dateObject.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  
    return formattedDate;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/users/${author}`);
        setUser(response.data.users[0]);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchData();
  
    return () => {};
  }, []);
  
  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      if (!isBookmarked){
        try {
          const response = await axios.get(`/api/users/${currentViewer}/saved-stories/${story.id}`);
          const savedStories = response.data;
          setIsBookmarked(savedStories ? savedStories : null);
        } catch (err) {
          console.error(err);
        }
      }
    };
  
    fetchBookmarkStatus();
  
    return () => {};
  }, [isBookmarked]);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!isLiked){
        try {
          const response = await axios.get(`/api/users/${currentViewer}/story/likes?story_id=${story.id}`);

          const result = response.data;
          console.log("Use Effect Like Fetching Repsonse: ", result);
          setIsLiked(result);
        } catch (err) {
          console.error(err);
        }
      }
    };
  
    fetchLikeStatus();
  
    return () => {};
  }, [isLiked])

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {user ? user.username.split("")[0] : "R"}
          </Avatar>
        }

        title={user ? user.username : <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" />}
        subheader={story ? formatDate(story.created_at) :  <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" />}


      />

        <Typography variant="body2" color="Bold" fontSize={22} sx={{ ml:2 }}>
        {story ? story.title :  <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation="wave" />}
        </Typography>
      
      {story && story.image ? <CardMedia 
        component="img"
        sx={{ width: 100 , height: 100 , ml:2}}
        
        image="https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
        alt="Paella dish"
      /> : <Skeleton variant="rectangular" height={100} width={100} />}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {story ? truncateString(html2plaintext(story.content), 200) :  <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation="wave" />}
        </Typography>

        <Tooltip title={isLiked ? "Unlike Story" : "Like Story"}>
          <IconButton aria-label="like story" onClick={isLiked ? handleUnlike : handleLike}>
            {isLiked ? <Checkbox
              icon={<Favorite sx={{ color: "red" }} />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            /> : <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            />}
          </IconButton>
        </Tooltip>
        <Tooltip title={isBookmarked ? "Remove from Saved Stories" : "Add to Saved Stories"}>
          <IconButton 
            aria-label="LibraryAdd" 
            onClick={isBookmarked ? handleUnbookmark : handleBookmark}
          >
             {isBookmarked ? 
            <LibraryAdd style={{ color: '#badb82' }}/> : <LibraryAdd />}
          </IconButton> 
        </Tooltip>
        <IconButton aria-label="ModeComment">
          <ModeComment />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
        
     

        { story ? <Link to={`/story/${story.id}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" size="small">
            Let's Read
          </Button>
        </Link>: <Button variant="contained" size="small" disabled={true}>
        <CircularProgress size={20} color="inherit" /> Let's Read
          </Button>}

      </CardContent>


      <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
         <BottomNavigationAction label="5 Min.Read" icon={<AutoStories />} />
         <BottomNavigationAction label="3 Days ago" icon={<Schedule />} />
        <BottomNavigationAction  label="1.2 K" icon={<Visibility />} />
         <BottomNavigationAction label="76 K" icon={<IosShare />} />
         <BottomNavigationAction label="400 K" icon={<Bookmarks />} />
       
      </BottomNavigation>
    </Box>

    </Card>
  );
};

export default SavedStoryList;