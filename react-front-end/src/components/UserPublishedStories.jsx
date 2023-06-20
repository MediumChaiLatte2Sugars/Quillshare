import React, { useState, useEffect } from 'react';
import {Box, Stack ,Skeleton, createTheme ,ThemeProvider } from "@mui/material";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";
import SavedStoryList from "./SavedStoryList";

import { EditorState, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const convertStoryToRaw = (content) => {
  // Convert the editorState back to an object
  const contentObject = JSON.parse(content);
  const contentState = convertFromRaw(contentObject);
  const editorState = EditorState.createWithContent(contentState);
  const contentWithFormatting = stateToHTML(editorState.getCurrentContent());

  return contentWithFormatting;
}

const UserPublishedStories = () => {
  const [userObject, setUserObject] = useState(null);
  const [userStories, setUserStories] = useState(null);
  const { isAuthenticated, user } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("light");
  setTimeout(() => {
    setLoading(false);
  }, [3000]);

  useEffect(() => {
    if (isAuthenticated){

      const fetchData = async (user) => {

        try { 
          
          if (userObject){

            if (!userStories){
              const getStories = await axios.get(`/api/users/${userObject.id}/stories`)
              console.log("Getting stories: ", getStories); 
              return setUserStories(getStories.data);

            } else {
              console.log("User stories response: ", userStories); 
              return () => {};
            }

          } else {
            const getUsers = await axios.get(`/api/users`);
            const filteredUser = getUsers.data.users.find((u) => u.email === user.email);
            return setUserObject(filteredUser);
          }
        } catch (err) {
          console.error(err)
          return () => {};
        }
        
      }

      fetchData(user);
      
    }

  }, [isAuthenticated, userObject, userStories]);

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
             <h2> My Published Stories </h2>
              {/* User's stories will go here: */}
              {userStories ? (
                userStories.map((story) => {
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
              ) : (
                <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation="wave" />
              )}
            </Box>
          </Stack>
        </Box>
      </ThemeProvider>
    );
  };
  
  export default UserPublishedStories;