import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { PropaneSharp } from '@mui/icons-material';

const CommentForm = ({user, story}) => {
  const initialValues = {
    user_id: user || '',
    story_id: story || '',
    content: '',
  };

  const validationSchema = yup.object().shape({
    content: yup.string().required('Comment cannot be empty'),
  });

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const response = await axios.post(`/api/stories/${story.id}/comments`, values);
      console.log("Comment response: ", response);
      alert("Comment submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("An error occurred while submitting the comment.")
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
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
