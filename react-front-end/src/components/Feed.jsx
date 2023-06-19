import * as React from 'react';
import {Box, Stack ,Skeleton, createTheme ,ThemeProvider } from "@mui/material";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";
import { useState } from "react";
import SavedStoryList from "./SavedStoryList";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, [3000]);

  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
    });

  return (

    <ThemeProvider theme={darkTheme}>
      <Box> Placeholder text
        {/* <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar setMode={setMode} mode={mode}/>
       
          <Box flex={4} p={{ xs: 0, md: 2 }}>

              <h2> My Saved Stories</h2>

              {loading ? (
               <Stack spacing={1}>
                <Skeleton variant="text" height={100} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="rectangular" height={30} />
               </Stack>
              ) : (

            <>
             <SavedStoryList />
             <SavedStoryList />
             <SavedStoryList />
          
            </>
             )}
        
          </Box>

           <Rightbar />
        </Stack> */}

       </Box>
   </ThemeProvider>


  );
};

export default Feed;