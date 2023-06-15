import * as React from 'react';
import {Box, Stack , createTheme ,ThemeProvider } from "@mui/material";
import { useState, useEffect } from "react";
import { PublishForm } from './form/PublishForm';

import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const CreateStory = () => {

  const { isAuthenticated, user } = useAuth0();
  const [userObject, setUserObject] = useState(null);

  useEffect(() => {
    if (isAuthenticated){

      const fetchData = async (user) => {

        try {
          
          const getUsers = await axios.get(`/api/users`);
          const filteredUser = getUsers.data.users.find((u) => u.email === user.email);
          setUserObject(filteredUser);

        } catch (err) {
          console.error(err)
        }
        
      }

      fetchData(user);
      
    }

  }, [isAuthenticated]);

    return (
      <>
      {/* Verify the user is signed in and exists in the db before allowing story creation */}
      {isAuthenticated && userObject ? <PublishForm user={userObject}/> : <h4>Please sign in to create a story!</h4>}
      </>
    );
};
  
export default CreateStory;