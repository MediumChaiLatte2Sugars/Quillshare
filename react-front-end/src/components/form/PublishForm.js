import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export const PublishForm = (props) => {
  const initialValues = {
    title: "Title",
    category: props.categories[0].value,
    tags: "",
    visibility: "public",
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(100, "Must be 100 characters or less")
      .required("Required"),
    tags: Yup.string()
      .required("You need to specify at least 1 tag"),
    category: Yup.string().required("Required"),
    visibility: Yup.string().required("Required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <label htmlFor="title">Title</label>
        <Field name="title" type="text" />
        <ErrorMessage name="title" component="div" />

        <label htmlFor="category">Category</label>
        <Field name="category" as="select" component={SelectField} options={props.categories} />
        <ErrorMessage name="category" component="div" />

        <label htmlFor="tags">Tags</label>
        <Field name="tags" type="text" />
        <ErrorMessage name="tags" component="div" />

        <label htmlFor="visibility">Visibility</label>
        <Field name="visibility" as="select">
          <option value="public">Public</option>
          <option value="private">Private</option>
        </Field>
        <ErrorMessage name="visibility" component="div" />

        <button type="button">Cancel</button>
        <button type="submit">Publish</button>
      </Form>
    </Formik>
  );
};

// Dynamically create the category options for the category select field
const SelectField = ({ field, form, options }) => (
  <select {...field}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
