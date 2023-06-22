import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { PropaneSharp } from '@mui/icons-material';

const CommentForm = ({user, story, onSubmit}) => {
  const initialValues = {
    user_id: user || '',
    story_id: story || '',
    content: '',
  };

  const validationSchema = yup.object().shape({
    content: yup.string().required('Comment cannot be empty'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm(); // Reset the form to its initial values
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>

      <TextField
        id="content"
        name="content"
        label="Comment"
        multiline
        rows={4}
        value={formik.values.content}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.content && formik.errors.content}
        helperText={formik.touched.content && formik.errors.content}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CommentForm;
