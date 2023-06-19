import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Box, Typography } from "@mui/material";

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
    tags: props.tags || "",
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
      <Form style={{width: '90%', padding: '20px', margin: 'auto'}}>
        <Typography variant="h4" pb={2}>Publishing Settings</Typography>
        <Box component="div" sx={{display: 'inline-grid', width: '100%'}} pb={1}>
          <label htmlFor="title" style={{marginBottom: 4}}>TITLE:</label>
          <Field name="title" type="text" value={props.title}/>
          <ErrorMessage name="title" component="div" />
        </Box>
        <Box component="div" sx={{display: 'inline-grid', width: '100%',}} pb={1}>
          <label htmlFor="category" style={{marginBottom: 4}}>CATEGORY:</label>
          <Field
            name="category"
            as="select"
            component={SelectField}
            options={categories}
          />
          <ErrorMessage name="category" component="div" />
        </Box>
        <Box component="div" sx={{display: 'inline-grid', width: '100%'}} pb={1}>
          <label htmlFor="tags" style={{marginBottom: 4}}>TAGS:</label>
          <Field name="tags" type="text" />
          <ErrorMessage name="tags" component="div" />
        </Box>
        <Box component="div" sx={{display: 'inline-grid', width: '100%'}} pb={1}>
          <label htmlFor="visibility" style={{marginBottom: 4}}>VISIBILITY:</label>
          <Field name="visibility" as="select">
            <option value="public">Public</option>
            <option value="private">Private</option>
          </Field>
          <ErrorMessage name="visibility" component="div" />
        </Box>
        <Box component="div" sx={{position: 'fixed', bottom: 0, right: 0}} pb={1}>
          <button type="button" onClick={props.onClose}
            style={{border: '1px solid #1976d2', margin: '10px', backgroundColor: 'transparent', padding: '5px 15px', borderRadius: 4, color: '#1976d2'}}>Cancel</button>
          <button type="submit" style={{border: '1px solid #1976d2', margin: '10px', backgroundColor: '#1976d2', color: 'white', padding: '5px 15px', borderRadius: 4}}>Publish</button>
        </Box>
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
