import React, { useEffect, useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import {Box , Badge , styled, InputBase }from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';

import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

import {Link} from "react-router-dom";
import { BorderColor, HistoryEdu ,CircleNotifications} from "@mui/icons-material";

const pages = ['Explore', 'Community'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const fetchData = async (user) => {
  try {
    // Check if the user is registered in our database
    const getUsers = await axios.get(`/api/users`);
    const filteredUser = getUsers.data.users.find((u) => u.email === user.email);

    if (!filteredUser) {
      // User is not registered, perform registration
      const params = {
        username: user.nickname,
        password: user.sub,
        email: user.email,
        profile_pic: user.picture,
        bio: ''
      };

      // Register the user
      const postedUsers = await axios.post(`/api/users`, params);
      const response = await axios.get(`/api/users/${postedUsers.data.user.id}`);

      return response;
    } else {
      // User is already registered
      const response = await axios.get(`/api/users/${filteredUser.id}`);
      return response;
    }
  } catch (error) {
    console.error(error);
    // Throw the error to propagate it to the caller
    throw error;
  }
};


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const prevUserRef = useRef(null);
  const [userObject, setUserObject] = useState(null);
  
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  useEffect(() => {
    const prevUser = prevUserRef.current;
    
    if (prevUser !== null && prevUser !== user) {
      const fetchUserObject = async () => {
        try {

          const response = await fetchData(user);
          const responseUserObject = response.data.users[0];

          setUserObject(responseUserObject);
          return () => {};

        } catch (error) {
          console.error(error);
        }
      };
  
      fetchUserObject();
    }

    // Update the previous user value
    prevUserRef.current = user;
  }, [user]);
  
  const handleLogin = () => {
      loginWithRedirect();
  };


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    alignItems: "center",
    gap: "20px",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  }));

  const Search = styled("div")(({ theme }) => ({
    backgroundColor: "white",
    padding: "0 10px",
    borderRadius: theme.shape.borderRadius,
    width: "15%",
  }));

  return (
    <AppBar position="sticky" color='primary' >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HistoryEdu sx={{ display: { xs: 'none', md: 'flex'}, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          <Link style={{textDecoration: "none", color:"white"}} to="/homepage">   QuillShare </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } , ml:5 }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

          <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            <MenuItem >Home Page</MenuItem>
            <MenuItem>Explore</MenuItem>
            <MenuItem >Community</MenuItem>
            <MenuItem>Create Story</MenuItem>
              
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link style={{textDecoration: "none", color:"white"}} to ={`/${page}`}> {page} </Link>
                  </Typography>
                </MenuItem>
              ))}
          </Menu>
          </Box>
          
          <HistoryEdu sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          <Link style={{textDecoration: "none", color:"white"}} to="/homepage"> QuillShare </Link>
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
               <Link style={{textDecoration: "none", color:"white"}} to ={`/${page}`}> {page} </Link>
              </Button>
            ))}
             
          </Box>

          <Search sx={{ display: { xs: 'none', md: 'flex' } , mr: 55 }}>
          <InputBase placeholder="search..." />
        </Search>

          <Icons>
          <Badge color="error">
            <BorderColor />
           </Badge>
          <Typography variant="h6">
          <Link style={{textDecoration: "none", color:"white"}} to="/createstory">Create </Link>
          </Typography>
          <Badge color="error">
            <CircleNotifications />
          </Badge>
          
          {isAuthenticated ? <Typography variant="h6">
            {userObject ? userObject.username.split(" ")[0] : user.name}
          </Typography>: 
          
          <Button
            color="primary"
            onClick={handleLogin}
            size="sm"
            variant="plain"
          > Sign In</Button>}
          </Icons>

          {isAuthenticated && <Box sx={{ flexGrow: 0 }}>
          
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar>{userObject ? userObject.username.split("")[0] : user.name.split("")[0]}</Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem component={Link} to="/profile">Profile</MenuItem>
              <MenuItem>Notifications
              <Badge color="error">
              <CircleNotifications />
              </Badge>
              </MenuItem>
              <MenuItem >Saved Stories</MenuItem>
              <MenuItem>Stories</MenuItem>
              <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>Logout</MenuItem>
             </Menu>
          </Box>}
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;