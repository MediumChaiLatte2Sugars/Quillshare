import React, { useEffect, useState } from 'react';
import {Box, Stack ,Skeleton, createTheme ,ThemeProvider, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import SavedStoryList from "./SavedStoryList";
import StoryBar from './StoryBar';
import axios from 'axios';

import { EditorState, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';


const convertStoryToRaw = (content) => {
  // Convert the editorState back to an object
  const contentObject = JSON.parse(content);
  const contentState = convertFromRaw(contentObject);
  const editorState = EditorState.createWithContent(contentState);
  const contentWithFormatting = stateToHTML(editorState.getCurrentContent());

  return contentWithFormatting;
}

const SingleStory = () => {
  const routeParams = useParams();
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, [3000]);

  const [mode, setMode] = useState("light");
  const [story, setStory] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
          const response = await axios.get(`/api/stories/${routeParams.id}`);
          return setStory(response.data[0]);
        } catch (err){
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
    });

  return (

    <ThemeProvider theme={darkTheme}>
      {story ? <StoryBar /> : <CircularProgress size={20} color="inherit" /> }
      <Box>
        <Stack direction="row" spacing={2} justifyContent="center">
       
          <Box flex={4} p={{ xs: 0, md: 2 }}>

              {story ? <h2>{story.title}</h2> :  <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation="wave" />}

              {loading ? (
               <Stack spacing={1}>
                <Skeleton variant="text" height={100} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="rectangular" height={30} />
               </Stack>
              ) : (

            <>
            {story ? <div dangerouslySetInnerHTML={{ __html: convertStoryToRaw(story.content) }}></div> :  <CircularProgress color="secondary" size={40} thickness={4} /> }
            </>
             )}
        
          </Box>

        </Stack>

       </Box>
   </ThemeProvider>


  );
};

export default SingleStory;