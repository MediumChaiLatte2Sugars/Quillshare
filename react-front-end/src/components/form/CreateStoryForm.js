import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { EditorState, convertToRaw } from "draft-js";
import * as Yup from "yup";
import MyEditor from "./MyEditor";
import { Box } from "@mui/material";

// Custom validator ensuring the editor has text
const editorRequired = (editorState) => {
  const contentState = editorState.getCurrentContent();
  const rawContentState = convertToRaw(contentState);
  const blocks = rawContentState.blocks;
  const hasText = blocks.some((block) => block.text.trim() !== "");

  return hasText;
};

export const CreateStoryForm = (props) => {

    // Function to handle form submission
    const handleSubmit = (values) => {
      const contentState = values.editorState.getCurrentContent();
      const rawContentState = convertToRaw(contentState);
  
       // Update the values object with the rawContentState
       const updatedValues = {
        ...values,
        editorState: rawContentState,
      };
  
      // Call the onSubmit prop to continue with the form submission
      props.onSubmit(updatedValues);
    };

  return (
    <Formik
      //! Image field left out for now to plan out implementation details further
      initialValues={{
        title: props.title || "",
        editorState: props.editorState || EditorState.createEmpty(), // Initialize the editor state (this state holds the story content)
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .max(100, "Must be 100 characters or less")
          .required("Required"),
          editorState: Yup.mixed().test(
            "editorRequired",
            "Content is required",
            editorRequired
          ),
      })}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, handleBlur }) => (
        <Form style={{width: '70%', padding: '20px', margin: 'auto'}}>
          <Box component="div" sx={{display: 'inline-grid', textAlign: 'center', width: '100%'}}>
            <label htmlFor="title" style={{padding: '10px'}}>Title</label>
            <Field name="title" type="text" style={{border: '1px solid #ddd;'}} />
            <ErrorMessage name="title" />
          </Box>
          <Box component="div" style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
            <label htmlFor="editorState" style={{padding: '10px', textAlign: 'center'}}>Content</label>
            <MyEditor
              editorState={values.editorState}
              onChange={
                (editorState) => setFieldValue("editorState", editorState) // Update the editor state
              }
              onBlur={handleBlur}
            />
            <ErrorMessage name="editorState" />
          </Box>
          <Box component="div" style={{textAlign: 'right'}}>
            <button type="button" style={{border: '1px solid #1976d2', margin: '10px', backgroundColor: 'transparent', padding: '5px 15px', borderRadius: 4, color: '#1976d2'}}>Save</button>
            <button type="submit" style={{border: '1px solid #1976d2', margin: '10px', backgroundColor: '#1976d2', color: 'white', padding: '5px 15px', borderRadius: 4}}>Publish</button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
