import * as React from 'react';
import {Box, Stack , createTheme ,ThemeProvider,Container ,CssBaseline, Typography ,Button} from "@mui/material";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";
import { useState } from "react";
import { MouseRounded } from '@mui/icons-material';

const HomePage = () => {

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

            <h2> Story Of QuillShare...</h2>

            <React.Fragment>
      <CssBaseline />
      <Container>
        <Box sx={{ bgcolor: 'wheat' }} >

        <Typography variant="body2" color="text.secondary" align='center' fontSize={30} sx={{ mt: 5 }}>
        Welcome to Quillshare
        </Typography>

        <Typography variant="body2" color="text.secondary" align='center' fontSize={25} sx={{ mt: 3 }} >
        The vibrant hub where stories and ideas collide!
        </Typography>


        <Typography variant="body2" color="text.secondary"  fontSize={20} sx={{ mt: 3 }}>
        
        Step into a world of boundless imagination, 
        where captivating narratives and 
        thought-provoking articles await your exploration. 

        Whether you're a seasoned writer, an aspiring author, 
        or a curious reader, our platform is the perfect 
        sanctuary for every word enthusiast.Unleash your creativity, share your unique voice, 
        and connect with a diverse community of fellow 
        writers and avid readers. 

        Join thousands of passionate individuals who are 
        already shaping the literary landscape and sparking
        thought-provoking conversations.

        </Typography>

        <Typography variant="body2" color="text.secondary"  fontSize={20} sx={{ mt: 3 }}>
        
        Step into a world of boundless imagination, 
        where captivating narratives and 
        thought-provoking articles await your exploration. 

        Whether you're a seasoned writer, an aspiring author, 
        or a curious reader, our platform is the perfect 
        sanctuary for every word enthusiast.Unleash your creativity, share your unique voice, 
        and connect with a diverse community of fellow 
        writers and avid readers. 

        Join thousands of passionate individuals who are 
        already shaping the literary landscape and sparking
        thought-provoking conversations.

        </Typography>

         </Box>
         <Button variant="contained" size="small" >
          Let's Join the Community
        </Button>
      </Container>
    </React.Fragment>


           </Box>

          <Rightbar />
         </Stack>

       </Box>
     </ThemeProvider>

    );
};
  
export default HomePage;