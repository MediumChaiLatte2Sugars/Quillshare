import React, { useState, useEffect } from "react";
import { PublishSettingsForm } from "./PublishSettingsForm";
import { CreateStoryForm } from "./CreateStoryForm";
import axios from "axios";
import { Drawer, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const PublishForm = (props) => {
  const [publishSettingsFormValues, setPublishSettingsFormValues] = useState(null);
  const [createStoryFormValues, setCreateStoryFormValues] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (publishSettingsFormValues && createStoryFormValues && props.user.id || props.user.id && createStoryFormValues) {
      handleSubmit();
    }
  }, [publishSettingsFormValues, createStoryFormValues, props.user]);

  const handleSubmit = async () => {
    try {
      // Make a POST request to /api/stories with the combined form values
      const combinedValues = {
        ...publishSettingsFormValues,
        ...createStoryFormValues,
        user_id: props.user.id,
      };
      const response = await axios.post("/api/stories", combinedValues);

      // Handle the response as needed
      console.log(response.data);
      
      createStoryFormValues.save ? alert("Story saved successfully!") : alert("Story submitted successfully!");

      // Redirect to a stories page
      // navigate("/user/stories/published");
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
    <Box component="div"
      role="presentation">

      <CreateStoryForm
        onSubmit={(values) => {
          setCreateStoryFormValues(values);
          console.log("Create Story Form Values Sub: ", values);

          // Dont show the publish settings form if saving
          if (!values.save){
            setDrawer(true);
          }
        }}
      />
      <Drawer sx={{width: 250}} p={2} anchor='right' open={drawer} onClose={toggleDrawer()}>
        <Box component="div">
          <PublishSettingsForm
            onSubmit={(values) => {
              setPublishSettingsFormValues(values);
            }}
            title={createStoryFormValues ? createStoryFormValues.title: ''}
            onClose={toggleDrawer()}
            categories={props.categories}
          />
        </Box>
      </Drawer>
    </Box>
  );
};
