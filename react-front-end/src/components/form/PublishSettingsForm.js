import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

export const PublishSettingsForm = (props) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  const initialValues = {
    title: "Title",
    category: categories[0].id,
    tags: "",
    visibility: "public",
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(100, "Must be 100 characters or less")
      .required("Required"),
    tags: Yup.string().required("You need to specify at least 1 tag"),
    category: Yup.string().required("Required"),
    visibility: Yup.string().required("Required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}
    >
      <Form>
        <label htmlFor="title">Title</label>
        <Field name="title" type="text" />
        <ErrorMessage name="title" component="div" />

        <label htmlFor="category">Category</label>
        <Field
          name="category"
          as="select"
          component={SelectField}
          options={categories}
        />
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
      <option key={option.id} value={option.id}>
        {option.name}
      </option>
    ))}
  </select>
);
