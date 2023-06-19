import React, { useState, useEffect } from "react";
import { PublishSettingsForm } from "./PublishSettingsForm";
import { CreateStoryForm } from "./CreateStoryForm";
import axios from "axios";
import { Drawer, Box, CircularProgress } from "@mui/material";
import { useAuth0 } from '@auth0/auth0-react';
import { EditorState, convertFromRaw } from 'draft-js';

const extractEditorState = (content) => {
  // Convert the editorState back to an object
  const contentObject = JSON.parse(content);
  const contentState = convertFromRaw(contentObject);
  const editorState = EditorState.createWithContent(contentState);

  return editorState;
}

export default function EditStoryForm(props) {
  const { isAuthenticated, user } = useAuth0();
  const [publishSettingsFormValues, setPublishSettingsFormValues] = useState(null);
  const [createStoryFormValues, setCreateStoryFormValues] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [story, setStory] = useState(null);
  const [author, setAuthor] = useState(null);
  
  useEffect(() => {
    async function fetchData(){
      if (!story) {
        console.log("Route params id: ", props.routeParams.uniqueId);
        const storyResponse = await axios.get(`/api/stories/id/${props.routeParams.uniqueId}`);
        const authorResponse = await axios.get(`/api/users/${storyResponse.data.user_id}/email`);
        console.log("Author response: ", authorResponse);
        console.log("Story response: ", storyResponse);
        setAuthor(authorResponse.data);
        setStory(storyResponse.data);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (publishSettingsFormValues && createStoryFormValues && props.user.id) {
      handleSubmit();
    }
  }, [publishSettingsFormValues, createStoryFormValues, props.user]);

  // Obtain story Data

  const handleSubmit = async () => {
    try {
      // Make a POST request to /api/stories with the combined form values
      const combinedValues = {
        ...publishSettingsFormValues,
        ...createStoryFormValues,
        user_id: props.user.id,
      };
      const response = await axios.put(`/api/stories/${story.id}`, combinedValues);

      // Handle the response as needed
      console.log(response.data);
      alert("Story submitted successfully!");
    } catch (error) {
      // Handle errors
      console.error(error);
      alert("An error occurred while submitting the story.");
    }
  };

  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawer(!drawer);
  };

  return (
    <>
      {user && author && user.email === author ? (
        <Box component="div" role="presentation">
          {story ? (
            <>
              <CreateStoryForm
                onSubmit={(values) => {
                  setCreateStoryFormValues(values);
                  setDrawer(true);
                }}
                editorState={extractEditorState(story.content)}
                title={story.title}
              />
              <Drawer sx={{ width: 250 }} p={2} anchor='right' open={drawer} onClose={toggleDrawer()}>
                <Box component="div">
                  <PublishSettingsForm
                    onSubmit={(values) => {
                      setPublishSettingsFormValues(values);
                    }}
                    title={createStoryFormValues ? createStoryFormValues.title : ''}
                    onClose={toggleDrawer()}
                    categories={props.categories}
                    tags={story.tags}
                  />
                </Box>
              </Drawer>
            </>
          ): (
            <CircularProgress color="secondary" size={40} thickness={4} />
          )}
        </Box>

      ) : (
        <div>You are not authorized to edit this story!</div>
      )}
      
    </>
  );
  
};
