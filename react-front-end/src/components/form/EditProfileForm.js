import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

export const EditProfileForm = () => {

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.put("/api/users/1", values); //! test id of the first user

      // Handle the response as needed
      console.log(response.data);
      alert("Profile updated successfully!");
    } catch (error) {
      // Handle errors
      console.error(error);
      alert("An error occurred while updating your profile.");
    }

    // Reset form submission state
    setSubmitting(false);
  };

  return (
    <Formik
      //! Image field left out for now to plan out implementation details further
      initialValues={{ username: "", bio: "" }}
      validationSchema={Yup.object({
        username: Yup.string()
          .max(50, "Must be 50 characters or less")
          .required("Required"),
        bio: Yup.string()
          .max(100, "Must be 100 characters or less")
          .required("Required"),
      })}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <label htmlFor="username">Username</label>
          <Field
            name="username"
            type="text"
          />
          <label htmlFor='username'>{values.username.length}/50</label>
          <ErrorMessage name="username" />

          <label htmlFor="bio">Bio</label>
          <Field
            name="bio"
            type="text"
          />
          <label htmlFor="bio">{values.bio.length}/100</label>
          <ErrorMessage name="bio" />

          <button type="button">Cancel</button>
          <button type="submit">Save</button>
        </Form>
      )}
    </Formik>
  );
};
