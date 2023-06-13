import React from 'react';
import {
  Avatar,
  Card,
  Button,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
const CommunityList = () => {
  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
    
        title="Jackson Johnson"
        subheader="June 11, 2023"
      />

        <Typography variant="body2" color="Bold" fontSize={20}  sx={{ ml:2 }}>
          Bio :
        </Typography>

      
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
        <Button variant="contained" size="small"  >
          Visit Profile
        </Button>
        <Button variant="contained" size="small" sx={{ ml:5 }} >
          Follow
        </Button>
      </CardContent>
     
      
    </Card>
  );
};

export default CommunityList;