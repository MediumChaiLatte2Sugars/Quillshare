import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import { useParams } from "react-router-dom";

const NonUserProfile = () => {

  const routeParams = useParams();

  return (

    <Profile otherUser={routeParams}/>

  );
}

export default NonUserProfile;