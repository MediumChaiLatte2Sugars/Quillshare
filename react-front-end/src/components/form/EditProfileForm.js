import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const EditProfileForm = () => {

  // const [usernameCount, setUsernameCount] = useState(0);
  // const [bioCount, setBioCount] = useState(0);

  // const handleUsernameChange = (event) => {
  //   const value = event.target.value;
  //   const count = event.target.value.length;
  //   setUsernameCount(count);
  // };

  // const handleBioChange = (event) => {
  //   const value = event.target.value;
  //   const count = event.target.value.length;
  //   setBioCount(count);
  // };

  return (
    <Formik
      //! Image field left out for now to plan out implementation details further
      initialValues={{ username: '', bio: ''}}
      validationSchema={Yup.object({
        username: Yup.string()
          .max(50, 'Must be 50 characters or less')
          .required('Required'),
        bio: Yup.string()
          .max(100, 'Must be 100 characters or less')
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        <label htmlFor="username">Username</label>
        <Field 
          name="username" 
          type="text" 
          // onChange={(event) => {
          //     handleUsernameChange(event);
          // }}
        />
        {/* <label htmlFor='username'>{usernameCount}/50</label> */}
        <ErrorMessage name="username" />

        <label htmlFor="bio">Bio</label>
        <Field 
          name="bio" 
          type="text" 
          // onChange={(event) => {
          //     handleBioChange(event);
          // }}
        />
        {/* <label htmlFor='bio'>{bioCount}/100</label> */}
        <ErrorMessage name="bio" />

        <button type="button">Cancel</button>
        <button type="submit">Save</button>
      </Form>
    </Formik>
  );
};