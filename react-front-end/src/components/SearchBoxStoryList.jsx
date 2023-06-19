import React from 'react';
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
} from "@mui/material";



import { Visibility ,Bookmarks, IosShare } from "@mui/icons-material";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

const SearchBoxStoryList = () => {

  const [value, setValue] = React.useState(0);

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }

        title="Robert Johnson"
        subheader="June 11, 2023"


      />

        <Typography variant="body2" color="Bold" fontSize={22} sx={{ ml:2 }}>
          Title of the story :
        </Typography>

      <CardMedia 
        component="img"
        sx={{ width: 100 , height: 100 , ml:2}}
        
        image="https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>

        
        <IconButton aria-label="add to favorites">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          />
        </IconButton>
        <IconButton aria-label="LibraryAdd">
          <LibraryAdd />
        </IconButton>
        <IconButton aria-label="ModeComment">
          <ModeComment />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
        
     

        <Button variant="contained" size="small">
          Let's Read
        </Button>
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

export default SearchBoxStoryList;