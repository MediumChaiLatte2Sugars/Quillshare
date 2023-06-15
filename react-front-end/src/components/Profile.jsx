import React, { useState, useEffect } from 'react';
import {Box, Stack , createTheme ,ThemeProvider, Skeleton } from "@mui/material";
import ProfileSidebar from './ProfileSidebar';
import SavedStoryList from './SavedStoryList';

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

const Profile = () => {

  const [mode, setMode] = useState("light");
  const { isAuthenticated, user } = useAuth0();
  const [userObject, setUserObject] = useState(null);
  const [userStories, setUserStories] = useState(null);



  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
    });

    useEffect(() => {
      if (isAuthenticated){

        const fetchData = async (user) => {

          try {
            
            
            if (userObject){

              if (!userStories){
                const getStories = await axios.get(`/api/users/${userObject.id}/stories`)
                console.log("Getting stories: ", getStories); 
                setUserStories(getStories.data);
              } else {
                console.log("User stories response: ", userStories); 
              }

            } else {
              const getUsers = await axios.get(`/api/users`);
              const filteredUser = getUsers.data.users.find((u) => u.email === user.email);
              setUserObject(filteredUser);
            }
          } catch (err) {
            console.error(err)
          }
          
        }

        fetchData(user);
        
      }

    }, [isAuthenticated, userObject, userStories]);

    return (

      <ThemeProvider theme={darkTheme}>
        <Box>

        <Stack direction="row" spacing={2} justifyContent="space-between">
          <ProfileSidebar setMode={setMode} mode={mode} user={userObject}/>
           
           <Box flex={4} p={{ xs: 0, md: 2 }}>

            {/* //* User's stories will go here: */}
            { userStories ? userStories.map((story) => { 
                // Create a new object with the updated key-value pair
                const updatedStory = {
                  ...story, // Spread the existing properties of the story object
                  content: convertStoryToRaw(story.content), 
                };

                return <SavedStoryList author={updatedStory.user_id} story={{created_at: updatedStory.created_at, title: updatedStory.title, content: updatedStory.content, id: updatedStory.id}}/>;
              }) :  <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation="wave" />
            }
            {/* <SavedStoryList />
            <SavedStoryList />
            <SavedStoryList /> */}

           </Box>

         </Stack>

       </Box>
     </ThemeProvider>

    );
};
  
export default Profile;
