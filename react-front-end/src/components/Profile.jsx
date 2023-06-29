import React, { useState, useEffect } from 'react';
import {Box, Stack , createTheme ,ThemeProvider, Skeleton } from "@mui/material";
import ProfileSidebar from './ProfileSidebar';
import SavedStoryList from './SavedStoryList';

import { EditorState, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { filter } from 'draft-js/lib/DefaultDraftBlockRenderMap';

const convertStoryToRaw = (content) => {
  // Convert the editorState back to an object
  const contentObject = JSON.parse(content);
  const contentState = convertFromRaw(contentObject);
  const editorState = EditorState.createWithContent(contentState);
  const contentWithFormatting = stateToHTML(editorState.getCurrentContent());

  return contentWithFormatting;
}

const Profile = (props) => {

  const [mode, setMode] = useState("light");
  const { isAuthenticated, user } = useAuth0();
  const [userObject, setUserObject] = useState(null);
  const [userStories, setUserStories] = useState(null);
  const [currentViewer, setCurrentViewer] = useState(null);
  const [isFollowed, setIsFollowed] = useState(null);



  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
    });

    useEffect(() => {
      if ( isAuthenticated && user) {
        console.log("Auth successfull: ", isAuthenticated, user);
        const fetchData = async (user) => {
          try {
            const getUsers = await axios.get(`/api/users`);
            const filteredUser = getUsers.data.users.find((u) => u.email === user.email);
            console.log("Setting current viewer: ", filteredUser);
            setCurrentViewer(filteredUser);
          } catch (err) {
            console.error(err);
          }
        }

        fetchData(user);
      }
    }, [isAuthenticated, user]);

    useEffect(() => {
      if (props.otherUser){

        const fetchOtherData = async (user) => {
  
          try { 
            
            if (userObject){

              if (!userStories){
                const getStories = await axios.get(`/api/users/${props.otherUser.id}/stories`)
                console.log("Getting stories: ", getStories); 
                return setUserStories(getStories.data);

              } else {
                console.log("User stories response: ", userStories); 
                return () => {};
              }

            } else {
              const getUsers = await axios.get(`/api/users/${props.otherUser.id}`);
              return setUserObject(getUsers.data.users[0]);
            }
          } catch (err) {
            console.error(err)
            return () => {};
          }
          
        }

        fetchOtherData(user);

      } else {
        
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
      }

    }, [isAuthenticated, userObject, userStories]);

    useEffect(() => {
      // Call the fetchFollowStatus function on component mount
      fetchFollowStatus();
    }, []);

    const fetchFollowStatus = async () => {
      if (!isFollowed) {
        try {
          const queryParams = {
            user2: userObject.id,
            user1: currentViewer.id
          };
          
          const response = await axios.get(`/api/subscriptions/check`, { params: queryParams });
          console.log("Fetching follower status res: ", response);
          setIsFollowed(response.data.subs[0]);
        } catch (err) {
          console.error(err);
        }
      }
    };
    
    useEffect(() => {
      const fetchFollowStatusOnChange = async () => {
        if (!isFollowed) {
          try {
            const queryParams = {
              user2: userObject.id,
              user1: currentViewer.id
            };
            
            const response = await axios.get(`/api/subscriptions/check`, { params: queryParams });
            console.log("Fetching follower status res: ", response);
            setIsFollowed(response.data.subs[0]);
          } catch (err) {
            console.error(err);
          }
        }
      };
    
      // Call the fetchFollowStatusOnChange function whenever isFollowed changes
      fetchFollowStatusOnChange();
    }, [isFollowed]);
    

    const handleFollow = async () => {
      try {
        const response = await axios.post(`/api/subscriptions/`, {
          user1: currentViewer.id,
          user2: userObject.id,
        });
        console.log("Handle follow res: ", response);
        alert("User successfully followed!");
        setIsFollowed(response.data[0]);
      } catch (err) {
        console.error(err);
        alert("An error occurred while following this user.");
      }
    };
  
    const handleUnFollow = async () => {
      try {
        const response = await axios.delete(`/api/subscriptions/${isFollowed.id}`, {
          user1: currentViewer.id,
          user2: userObject.id,
        });
        console.log("Handle follow res: ", response);
        setIsFollowed(null);
        alert("User successfully unfollowed!");
      } catch (err) {
        console.error(err);
        alert("An error occurred while unfollowing this user.");
      }
    };

    return (

      <ThemeProvider theme={darkTheme}>
        <Box>

        <Stack direction="row" spacing={2} justifyContent="space-between">
          {user && userObject ? <ProfileSidebar setMode={setMode} mode={mode} user={userObject} viewerIsSelf={user.email === userObject.email} currentViewer={currentViewer} handleFollow={handleFollow} handleUnFollow={handleUnFollow} isFollowed={isFollowed}/> : <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation="wave" />}
           
           <Box flex={4} p={{ xs: 0, md: 2 }}>

            {/* //* User's stories will go here: */}
            { userStories ? userStories.map((story) => { 
                // Create a new object with the updated key-value pair
                const updatedStory = {
                  ...story, // Spread the existing properties of the story object
                  content: convertStoryToRaw(story.content), 
                };

                return <SavedStoryList key={updatedStory.id} author={updatedStory.user_id} currentViewer={userObject.id} story={{created_at: updatedStory.created_at, title: updatedStory.title, content: updatedStory.content, id: updatedStory.id, unique_id: updatedStory.unique_id, status: updatedStory.status}}/>;
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
