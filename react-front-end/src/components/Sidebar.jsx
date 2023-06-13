import {
    AccountBox,
    Article,
    Group,
    Home,
    ModeNight,
    Person,
    Settings,
    Storefront,
  } from "@mui/icons-material";
  import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Switch,
  } from "@mui/material";
  import React from "react";
  import {Link} from "react-router-dom";
  

  const Sidebar = ({mode,setMode}) => {
    return (
      <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
        <Box position="fixed">
          <List  >
            <ListItem disablePadding style={{textDecoration: "none", color:"Black"}} component={Link} to="/Homepage">
              <ListItemButton component="a" href="#home">
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Homepage" />
              </ListItemButton>
            </ListItem>


            <ListItem disablePadding style={{textDecoration: "none", color:"Black"}} component={Link} to="/Explore">
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <Storefront />
                </ListItemIcon>
                <ListItemText primary="Explore" />
              </ListItemButton>
            </ListItem>


            <ListItem disablePadding style={{textDecoration: "none", color:"Black"}} component={Link} to="/Community">
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <Group />
                </ListItemIcon>
                <ListItemText primary="Community" />
              </ListItemButton>
            </ListItem>


            <ListItem disablePadding >
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <Article />
                </ListItemIcon>
                <ListItemText primary="Create Story" />
              </ListItemButton>
            </ListItem>


            <ListItem disablePadding style={{textDecoration: "none", color:"Black"}} component={Link} to="/Feed">
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="My Saved Stories" />
              </ListItemButton>
            </ListItem>


            <ListItem disablePadding >
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Published Stories" />
              </ListItemButton>
            </ListItem>


            
            <ListItem disablePadding >
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <AccountBox />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>


            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemIcon>
                  <ModeNight />
                </ListItemIcon>
                <Switch onChange={e=>setMode(mode === "light" ? "dark" : "light")}/>
              </ListItemButton>
            </ListItem>


          </List>
        </Box>
      </Box>
    );
  };
  
  export default Sidebar;