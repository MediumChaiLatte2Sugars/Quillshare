import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { EditorState, convertToRaw } from "draft-js";
import * as Yup from "yup";
import MyEditor from "./MyEditor";

// Custom validator ensuring the editor has text
const editorRequired = (editorState) => {
  const contentState = editorState.getCurrentContent();
  const rawContentState = convertToRaw(contentState);
  const blocks = rawContentState.blocks;
  const hasText = blocks.some((block) => block.text.trim() !== "");

  return hasText;
};

export const CreateStoryForm = (props) => {
  return (
    <Formik
      //! Image field left out for now to plan out implementation details further
      initialValues={{
        title: "",
        editorState: EditorState.createEmpty(), // Initialize the editor state (this state holds the story content)
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
      onSubmit={props.onSubmit}
    >
      {({ values, setFieldValue, handleBlur }) => (
        <Form>
          <label htmlFor="title">Title of the Story</label>
          <Field name="title" type="text" />
          <ErrorMessage name="title" />

          <label htmlFor="editorState">Content</label>
          <MyEditor
            editorState={values.editorState}
            onChange={
              (editorState) => setFieldValue("editorState", editorState) // Update the editor state
            }
            onBlur={handleBlur}
          />
          <ErrorMessage name="editorState" />

          <button type="button">Save</button>
          <button type="submit">Publish</button>
        </Form>
      )}
    </Formik>
  );
};
