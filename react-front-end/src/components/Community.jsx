import React, { useState, useEffect }  from 'react';
import {Box, Stack , createTheme ,ThemeProvider, Skeleton } from "@mui/material";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";
import CommunityList from "./CommunityList";
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const Community = () => {

  const [mode, setMode] = useState("light");
  const [users, setUsers] = useState(null);
  const [currentViewer, setCurrentViewer] = useState(null);
  const { isAuthenticated, user } = useAuth0();

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
    });

    useEffect(() => {
      async function fetchData() {
        try {
            const userResponse = await axios.get(`/api/users/`);
            console.log("Users response: ", userResponse);
            console.log("Current auth0 user: ", user);
            setUsers(userResponse.data.users);
            if (isAuthenticated){
              const viewer = userResponse.data.users.find((u) => u.email === user.email)
              console.log("Current viewer: ",viewer);
              setCurrentViewer(viewer);
            }
          } catch (err){
          console.error(err);
        }
      }
      fetchData();
    }, []);

    return (

      <ThemeProvider theme={darkTheme}>
        <Box>

        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar setMode={setMode} mode={mode}/>
           
           <Box flex={4} p={{ xs: 0, md: 2 }}>

            <h2> Community Of Story Tellers</h2>

            { users && currentViewer ? users.map((user) => { 
              //! not currently waiting on viewer being defined before passing (TODO: add verification)
                return <CommunityList key={user.id} user={user} isAuthenticated={isAuthenticated} currentViewer={currentViewer}/>;
              }) :  <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation="wave" />
            }
            
           </Box>

          <Rightbar />
         </Stack>

       </Box>
     </ThemeProvider>

    );
};
  
export default Community;