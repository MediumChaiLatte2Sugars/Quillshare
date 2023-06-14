import * as React from 'react';
import {Box, Stack , createTheme ,ThemeProvider } from "@mui/material";
import ProfileSidebar from './ProfileSidebar';
import { useState } from "react";
import SavedStoryList from './SavedStoryList';

const Profile = () => {

  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
    });

    return (

      <ThemeProvider theme={darkTheme}>
        <Box>

        <Stack direction="row" spacing={2} justifyContent="space-between">
          <ProfileSidebar setMode={setMode} mode={mode}/>
           
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