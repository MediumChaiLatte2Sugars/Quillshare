import * as React from 'react';
import {Box, Stack , createTheme ,ThemeProvider } from "@mui/material";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";
import { useState } from "react";
import CommunityList from "./CommunityList";

const Community = () => {

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
          <Sidebar setMode={setMode} mode={mode}/>
           
           <Box flex={4} p={{ xs: 0, md: 2 }}>

            <h2> Community Of Story Tellers</h2>
            
            <CommunityList />
             <CommunityList />
             <CommunityList />

           </Box>

          <Rightbar />
         </Stack>

       </Box>
     </ThemeProvider>

    );
};
  
export default Community;