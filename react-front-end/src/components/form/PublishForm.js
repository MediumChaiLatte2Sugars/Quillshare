import React, { useState, useEffect } from "react";
import { PublishSettingsForm } from "./PublishSettingsForm";
import { CreateStoryForm } from "./CreateStoryForm";
import axios from "axios";

export const PublishForm = (props) => {
  const [publishSettingsFormValues, setPublishSettingsFormValues] = useState(null);
  const [createStoryFormValues, setCreateStoryFormValues] = useState(null);

  useEffect(() => {
    if (publishSettingsFormValues && createStoryFormValues && props.user.id) {
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
      alert("Story submitted successfully!");
    } catch (error) {
      // Handle errors
      console.error(error);
      alert("An error occurred while submitting the story.");
    }
  };

  return (
    <div>
      <CreateStoryForm
        onSubmit={(values) => {
          setCreateStoryFormValues(values);
        }}
      />
      <PublishSettingsForm
        onSubmit={(values) => {
          setPublishSettingsFormValues(values);
        }}
        categories={props.categories}
      />
    </div>
  );
};
