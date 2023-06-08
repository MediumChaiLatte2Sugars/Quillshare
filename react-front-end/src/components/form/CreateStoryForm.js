import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { EditorState } from "draft-js";
import * as Yup from "yup";
import axios from 'axios';
import MyEditor from "./MyEditor";

export const CreateStoryForm = () => {
  return (
    <Formik
      //! Image field left out for now to plan out implementation details further
      initialValues={{
        title: "placeholder for title",
        editorState: EditorState.createEmpty(), // Initialize the editor state (this state holds the story content)
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .max(100, "Must be 100 characters or less")
          .required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          // Make a POST request to /api/stories
          const response = await axios.post("/api/stories", values);

          // Handle the response as needed
          console.log(response.data);
          alert("Story submitted successfully!");

        } catch (error) {

          // Handle errors
          console.error(error);
          alert("An error occurred while submitting the story.");
        }

        // Reset form submission state
        setSubmitting(false);
      }}
    >
      {({ values, setFieldValue, handleBlur }) => (
        <Form>
          <label htmlFor="title">Title of the Story</label>
          <Field name="title" type="text" />
          <ErrorMessage name="title" />

          <label htmlFor="content">Content</label>
          <MyEditor
            editorState={values.editorState}
            onChange={
              (editorState) => setFieldValue("editorState", editorState) // Update the editor state
            }
            onBlur={handleBlur}
          />

          {/* Ignoring the buttons for now */}
          <button type="button">Save</button>
          <button type="submit">Publish</button>
        </Form>
      )}
    </Formik>
  );
};
