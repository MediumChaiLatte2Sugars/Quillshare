import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, Typography, Skeleton, useScrollTrigger, Checkbox, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Favorite, FavoriteBorder, LibraryAdd, ModeComment } from "@mui/icons-material";
import axios from 'axios';
import ShareButton from './StoryLinkShare'; 
import StoryComments from './StoryComments';
import CommentForm from './form/CommentForm';


const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  transition: 'height 0.5s',
  position: 'fixed', // Add relative positioning
  top: scrolled ? 'auto' : '100%', // Set the top position to auto when scrolled and 100% when not scrolled
  transform: scrolled ? 'none' : 'translateY(100%)', // Add a transform to translate the bar below
  height: theme.spacing(6),
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export default function StoryBar({story, author, user, link}) {

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [openComments, setOpenComments] = useState(false);

  const handleBookmark = async () => {
    try {
      const response = await axios.post(`/api/users/${user.id}/saved-stories`, {
        story_id: story.id,
        user_id: user.id,
      });
      setIsBookmarked(response.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnbookmark = async () => {
    try {
      console.log("Saved story id before deleting: ", isBookmarked.id , "Bookmark: ", isBookmarked);
      const response = await axios.delete(`/api/users/${user.id}/saved-stories/${isBookmarked.id}`);
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
        user_id: user.id,
      });
      console.log("Like response: ", response.data);
      setIsLiked(response.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnlike = async () => {
    try {
      console.log("Like id before deleting: ", isLiked.id);
      const response = await axios.delete(`/api/likes/${isLiked.id}`);
      console.log("Handle UnLike Response: ", response);
      setIsLiked(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentButton = () => {
    setOpenComments(true);
  }

  const handleCloseComments = () => {
    setOpenComments(false);
  }

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      if (!isBookmarked){
        try {
          const response = await axios.get(`/api/users/${user.id}/saved-stories/${story.id}`);
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
          const response = await axios.get(`/api/users/${user.id}/story/likes?story_id=${story.id}`);

          const result = response.data;
          console.log("Use Effect Like Fetching Repsonse: ", result);
          return setIsLiked(result);
        } catch (err) {
          console.error(err);
        }
      }
    };
  
    fetchLikeStatus();
  
    return () => {};
  }, [isLiked])

  const trigger = useScrollTrigger({
    threshold: 100, // Adjust the threshold value as per your requirement
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="fixed" scrolled={trigger}>
        <StyledToolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h5" noWrap component="div">
            {story ? story.title :  <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} animation="wave" />}
          </Typography>

          <Typography variant="h5" noWrap component="div">
            {author ? `Author: ${author.name}` :  <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} animation="wave" />}
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

          <Tooltip title="Comments" >
            <IconButton aria-label="ModeComment" onClick={handleCommentButton}>
              <ModeComment/>
            </IconButton>
          </Tooltip>
          
          <StoryComments open={openComments} onClose={handleCloseComments} children={<CommentForm story={story.id} user={user.id}/>}/>

          <Tooltip title="Share Story">
            <div>
              <ShareButton link={link}/>
            </div>
          </Tooltip>

        </StyledToolbar>
      </StyledAppBar>
    </Box>
  );
}
