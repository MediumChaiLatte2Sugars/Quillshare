import {
  AccountBox,
  Article,
  Group,
  Home,
  ModeNight,
  Person,
  Settings,
  Storefront,
  Message,
  GroupAdd,
  MoreHoriz,
  ModeEdit,
} from "@mui/icons-material";
// import MessageIcon from '@mui/icons-material/Message';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Avatar
} from "@mui/material";

import ProfileTabs from "./ProfileTabs";

// import Typography from '@mui/joy/Typography';

import React from "react";
import {Link} from "react-router-dom";


const ProfileSidebar = ({mode,setMode}) => {
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>

      {/* //* First box:  */}
      {/* //* 1: Avatar  */}
      {/* //* 2: User Full Name  */}
      {/* //* 3: Icons (dm, follow, subscribe, context menu, edit -- if auth and self)   */}

      {/* //TODO box 1 -- User w/ interacttive actions */}
      <Box position="flex">

        {/* //* conditionally render an edit button here */}
        <Box display="flex" justifyContent="space-between">
          <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" size="lg" />
          <ModeEdit />
        </Box>

        {/* //Consider putting these two in a flexbox */}
        <h2>User Name</h2>

        {/* // Actions */}
        <Box display="flex" justifyContent="space-between">
          <Message />
          <GroupAdd />
          <MoreHoriz />
        </Box>
      </Box>

      {/* //TODO box 2 -- Bio + Follow/Follower stats || Reading Lists */}
      <ProfileTabs />
      
    </Box>
  );
};

export default ProfileSidebar;