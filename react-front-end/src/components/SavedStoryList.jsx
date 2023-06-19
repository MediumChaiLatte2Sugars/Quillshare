import React, {useState, useEffect} from 'react';
import { Favorite, FavoriteBorder, Share , LibraryAdd ,ModeComment, AutoStories, Schedule} from "@mui/icons-material";
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
  CircularProgress
} from "@mui/material";

import { Link } from 'react-router-dom';

import axios from 'axios';

import html2plaintext from 'html2plaintext';


import { Visibility ,Bookmarks, IosShare } from "@mui/icons-material";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

const SavedStoryList = ({story, author, socket, username}) => {

  const [value, setValue] = useState(0);
  const [user, setUser] = useState(null);


  console.log("Getting socket in savedstory ", socket); 

  console.log("Getting username in savedstory ", username); 


  const [liked, setLiked] = useState(false);

  const handleNotification = (type) => {
    type === 1 && setLiked(true);
    socket.emit("sendNotification", {
      senderName: username,
      receiverName: user.name,
      type,

      
    });

    console.log("Getting sendername in hanle notification ", username); 

  console.log("Getting receiver email in hanle notification ", user.email); 

 

  console.log("Getting type in hanle notification ", type); 

  };


  const truncateString = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str; // No truncation needed
    }
    
    // Truncate the string and add ellipses
    const truncated = str.substring(0, maxLength - 3) + '...';
    return truncated;
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
  

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {user ? user.username.split("")[0] : "R"}
          </Avatar>
        }

        title={user ? user.username : <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" />}
        subheader={story ? story.created_at :  <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" />}


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

        
        <IconButton aria-label="add to favorites">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
            onClick={() => handleNotification(1)}
          />
        </IconButton>
        <IconButton aria-label="LibraryAdd">
          <LibraryAdd  onClick={() => handleNotification(2)}/>
        </IconButton>
        <IconButton aria-label="ModeComment">
          <ModeComment />
        </IconButton>
        <IconButton aria-label="share">
          <Share onClick={() => handleNotification(3)}/>
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