import React, { useState, useEffect } from 'react';
import {Box, Stack , createTheme ,ThemeProvider, Skeleton } from "@mui/material";
import ProfileSidebar from './ProfileSidebar';
import SavedStoryList from './SavedStoryList';

import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {

  const [mode, setMode] = useState("light");
  const { isAuthenticated, user } = useAuth0();
  const [userObject, setUserObject] = useState(null);



  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
    });

    useEffect(() => {
      if (isAuthenticated){

        const fetchData = async (user) => {

          try {
            
            const getUsers = await axios.get(`/api/users`);
            const filteredUser = getUsers.data.users.find((u) => u.email === user.email);
            setUserObject(filteredUser);
  
          } catch (err) {
            console.error(err)
          }
          
        }

        fetchData(user);
        
      }

    }, [isAuthenticated]);

    return (

      <ThemeProvider theme={darkTheme}>
        <Box>

        <Stack direction="row" spacing={2} justifyContent="space-between">
          <ProfileSidebar setMode={setMode} mode={mode} user={userObject}/>
           
           <Box flex={4} p={{ xs: 0, md: 2 }}>

            {/* //* User's stories will go here: */}
            
            <SavedStoryList />
            <SavedStoryList />
            <SavedStoryList />

           </Box>

         </Stack>

       </Box>
     </ThemeProvider>

    );
};
  
export default Profile;