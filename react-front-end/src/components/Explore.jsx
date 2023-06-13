
import * as React from 'react';
import Grid from '@mui/material/Grid';

import { Box, Stack , createTheme ,ThemeProvider } from "@mui/material";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";
import { useState } from "react";

const Explore = () => {

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

     <h2>Popular Categories</h2>
     <Grid container spacing={1}>
      <Grid item xs={12} sm={4}>
        <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 2 }}>
          Adventure
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box
          sx={{
            bgcolor: 'secondary.main',
            color: 'secondary.contrastText',
            p: 2,
          }}
        >
         Non Fiction
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box sx={{ bgcolor: 'error.main', color: 'error.contrastText', p: 2 }}>
         How To
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box sx={{ bgcolor: 'warning.main', color: 'warning.contrastText', p: 2 }}>
          Thriller
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box sx={{ bgcolor: 'info.main', color: 'info.contrastText', p: 2 }}>
          Poetry
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box sx={{ bgcolor: 'success.main', color: 'success.contrastText', p: 2 }}>
        Fiction
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box sx={{ bgcolor: 'text.primary', color: 'background.paper', p: 2 }}>
        Short Story
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box sx={{ bgcolor: 'text.secondary', color: 'background.paper', p: 2 }}>
          Science
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box sx={{ bgcolor: 'text.disabled', color: 'background.paper', p: 2 }}>
          Historical
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box sx={{ bgcolor: 'warning.main', color: 'warning.contrastText', p: 2 }}>
          Technology
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box sx={{ bgcolor: 'info.main', color: 'info.contrastText', p: 2 }}>
          AI
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box sx={{ bgcolor: 'success.main', color: 'success.contrastText', p: 2 }}>
        Humor
        </Box>
      </Grid>

     </Grid>
     </Box>

       <Rightbar />
    </Stack>

    </Box>
    </ThemeProvider>
  );
};

export default Explore;