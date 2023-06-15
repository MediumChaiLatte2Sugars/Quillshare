import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useScrollTrigger } from '@mui/material';

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

export default function StoryBar({story, author}) {
  const trigger = useScrollTrigger({
    threshold: 100, // Adjust the threshold value as per your requirement
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="fixed" scrolled={trigger}>
        <StyledToolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div">
            {story ? story.title :  <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} animation="wave" />}
          </Typography>
          <Typography variant="h5" noWrap component="div">
            {author ? author.title :  <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} animation="wave" />}
          </Typography>
          <IconButton size="large" aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label="display more actions"
            edge="end"
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </StyledToolbar>
      </StyledAppBar>
    </Box>
  );
}
