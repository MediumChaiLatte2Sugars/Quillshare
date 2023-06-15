import React from "react";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  useFormikContext,
  useField,
} from "formik";
import * as Yup from "yup";
import axios from "axios";
import PhotoInput from "./PhotoInput";

const CharacterCount = ({ fieldName, maxLength }) => {
  const [field] = useField(fieldName);
  const count = field.value.length;

  return (
    <label>
      {count}/{maxLength}
    </label>
  );
};

// Custom validation function for photo dimensions
const validatePhotoDimensions = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = function () {
      const { width, height } = this;

      if (width > 100 || height > 100) {
        reject();
      } else {
        resolve();
      }
    };

    img.onerror = function () {
      reject("Invalid photo.");
    };

    img.src = URL.createObjectURL(file);
  });
};

const validationSchema = Yup.object({
  photo: Yup.mixed()
    .required("Photo is required"),
    // .test(
    //   "file-dimensions",
    //   "Photo dimensions should be no more than 100x100 pixels.",
    //   function (value) {
    //     return validatePhotoDimensions(value).catch(() => false);
    //   }
    // ),
  username: Yup.string()
    .max(50, "Must be 50 characters or less")
    .required("Required"),
  bio: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
});

export const EditProfileForm = ({user}) => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {

      const response = await axios.put(`/api/users/${user.id}`, values);

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
      initialValues={{ photo: null, username: user.username, bio: user.bio }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <label htmlFor="photo">[photo icon goes here]</label>
        <PhotoInput name="photo" />
        <ErrorMessage name="photo" />

        <label htmlFor="username">Username</label>
        <Field name="username" type="text" />
        <CharacterCount fieldName="username" maxLength={50} />
        <ErrorMessage name="username" />

        <label htmlFor="bio">Bio</label>
        <Field name="bio" type="text" />
        <CharacterCount fieldName="bio" maxLength={100} />
        <ErrorMessage name="bio" />

        <button type="button">Cancel</button>
        <button type="submit">Save</button>
      </Form>
    </Formik>
  );
};
