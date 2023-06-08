import React from "react";
// import '../../MyEditor.css';
import { CreateStoryForm } from "./CreateStoryForm";
import { EditProfileForm } from "./EditProfileForm";
import { PublishSettingsForm } from "./PublishSettingsForm";
import { PublishForm } from "./PublishForm";

export default function Application() {
  return (
    <>
      {/*  Test each form by uncommenting the desired form */}
      {/* <CreateStoryForm /> */}
      {/* <PublishForm categories={[
        { value: 'cateogry 1', label: 'Cateogry 1' },
        { value: 'category 2', label: 'Category 2' },
        { value: 'category 3', label: 'Category 3' },
      ]}/> */}
      < EditProfileForm />
      {/* <PublishSettingsForm categories={[
        { value: 'cateogry 1', label: 'Cateogry 1' },
        { value: 'category 2', label: 'Category 2' },
        { value: 'category 3', label: 'Category 3' },
      ]}/> */}
    </>
  );
}
