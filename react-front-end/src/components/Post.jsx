import React, { Component }  from 'react';
import { Favorite, FavoriteBorder, MoreVert, Share , LibraryAdd ,ModeComment} from "@mui/icons-material";
import {
  Avatar,
  Card,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
const Post = () => {
  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="Robert Johnson"
        subheader="June 11, 2023"


      />

        <Typography variant="body2" color="Bold" fontSize={25}>
          Title of the story :
        </Typography>

      <CardMedia 
        component="img"
        sx={{ width: 100 , height: 100 }}
        
        image="https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
        <Button variant="contained" size="small">
          Let's Read
        </Button>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          />
        </IconButton>
        <IconButton aria-label="share">
          <LibraryAdd />
        </IconButton>
        <IconButton aria-label="share">
          <ModeComment />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
      
    </Card>
  );
};

export default Post;