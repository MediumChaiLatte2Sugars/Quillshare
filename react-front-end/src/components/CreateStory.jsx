import * as React from 'react';
import {Box, Stack , createTheme ,ThemeProvider } from "@mui/material";
import { useState } from "react";
import { PublishForm } from './form/PublishForm';

const CreateStory = () => {

    return (
      <PublishForm />
    );
};
  
export default CreateStory;