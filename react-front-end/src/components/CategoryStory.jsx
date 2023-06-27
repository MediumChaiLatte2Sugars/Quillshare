import * as React from 'react';
import {Box, Stack ,Skeleton, createTheme ,ThemeProvider } from "@mui/material";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SavedStoryList from "./SavedStoryList";

import { useAuth0 } from '@auth0/auth0-react';

import { EditorState, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import axios from 'axios';

const convertStoryToRaw = (content) => {
  // Convert the editorState back to an object
  const contentObject = JSON.parse(content);
  const contentState = convertFromRaw(contentObject);
  const editorState = EditorState.createWithContent(contentState);
  const contentWithFormatting = stateToHTML(editorState.getCurrentContent());

  return contentWithFormatting;
}

const CategoryStory = () => {
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState(null);
  const [category, setCategory] = useState(null);
  const [userObject, setUserObject] = useState(null);
  const { isAuthenticated, user } = useAuth0();
  const routeParams = useParams();

  useEffect(() => {
    if (routeParams) {
      const fetchData = async (categoryParam) => {
        console.log("Category: ", categoryParam, " Type: ", typeof categoryParam);
        try {
          const categoryResponse = await axios.get(`/api/categories/${categoryParam}`);
          setCategory(categoryResponse.data[0]);
          const storiesResponse = await axios.get(`/api/categories/${categoryParam}/stories`);
          console.log("STORIES: ", storiesResponse.data);
          return setStories(storiesResponse.data);
        } catch (err) {
          console.error(err);
        }
      }

      fetchData(routeParams.id);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated){

      const fetchData = async (user) => {

        try { 
        
          const getUsers = await axios.get(`/api/users`);
          const filteredUser = getUsers.data.users.find((u) => u.email === user.email);
          return setUserObject(filteredUser);
          
        } catch (err) {
          console.error(err)
          return () => {};
        }
        
      }

      fetchData(user);
      
    }

  }, [isAuthenticated]);

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
      <Box>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar setMode={setMode} mode={mode}/>
       
          <Box flex={4} p={{ xs: 0, md: 2 }}>

              <h2> {category ? category.name : <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation="wave" />}</h2>
              {!stories || stories.length === 0 ? (
                <Stack spacing={1}>
                <Skeleton variant="text" height={100} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="rectangular" height={30} />
               </Stack>
              ) : (
            
                stories.map((story) => {
                  // Create a new object with the updated key-value pair
                  const updatedStory = {
                    ...story, // Spread the existing properties of the story object
                    content: convertStoryToRaw(story.content),
                  };

                  return (
                    <SavedStoryList
                      key={updatedStory.id}
                      author={updatedStory.user_id}
                      currentViewer={userObject.id}
                      story={{
                        created_at: updatedStory.created_at,
                        title: updatedStory.title,
                        content: updatedStory.content,
                        id: updatedStory.id,
                        unique_id: updatedStory.unique_id,
                      }}
                    />
                  );
                    })
              )}

          </Box>

           <Rightbar />
        </Stack>

       </Box>
   </ThemeProvider>


  );
};

export default CategoryStory;