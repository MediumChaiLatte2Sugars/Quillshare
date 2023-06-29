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
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import DarkReader from "darkreader";
import { DarkModeContext } from "./DarkModeContext";

const Sidebar = ({ mode, setMode }) => {
  const { darkModeEnabled, setDarkModeEnabled } = useContext(DarkModeContext);
  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <List>
          <ListItem
            disablePadding
            style={{ textDecoration: "none", color: "Black" }}
            component={Link}
            to="/Homepage"
          >
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            style={{ textDecoration: "none", color: "Black" }}
            component={Link}
            to="/Explore"
          >
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Storefront />
              </ListItemIcon>
              <ListItemText primary="Explore" />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            style={{ textDecoration: "none", color: "Black" }}
            component={Link}
            to="/Community"
          >
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Community" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/createstory">
              <ListItemIcon>
                <Article />
              </ListItemIcon>
              <ListItemText primary="Create Story" />
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            style={{ textDecoration: "none", color: "Black" }}
          >
            <ListItemButton component={Link} to="/Feed">
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Feed" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/user/stories/created">
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Created Stories" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/profile">
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
              <ListItemText primary="Dark Mode" />
              <Switch checked={darkModeEnabled} onChange={toggleDarkMode} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
