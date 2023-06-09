import React from "react";
import { useField } from "formik";

const PhotoInput = ({ ...props }) => {
  const [field, meta, helpers] = useField(props);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    helpers.setValue(file);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        onBlur={field.onBlur}
        {...props}
      />
      {meta.touched && meta.error && <div>{meta.error}</div>}
      {field.value && (
        <img src={URL.createObjectURL(field.value)} alt="Photo Preview" />
      )}
    </div>
  );
};

export default PhotoInput;
