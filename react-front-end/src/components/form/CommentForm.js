import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button } from '@mui/material';

const CommentForm = () => {
  const initialValues = {
    user_id: '',
    story_id: '',
    comment: '',
  };

  const validationSchema = yup.object().shape({
    comment: yup.string().required('Comment cannot be empty'),
  });

  const onSubmit = (values) => {
    console.log(values);
    // Add your submit logic here
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>

      <TextField
        id="comment"
        name="comment"
        label="Comment"
        multiline
        rows={4}
        value={formik.values.comment}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.comment && formik.errors.comment}
        helperText={formik.touched.comment && formik.errors.comment}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CommentForm;
