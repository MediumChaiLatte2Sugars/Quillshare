import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import { useParams } from "react-router-dom";

const NonUserProfile = ({socket, username} ) => {

  const routeParams = useParams();
  console.log("we are checking 1111111" ,socket, username, routeParams);
   
  return (

    <Profile otherUser={routeParams} socket={socket} username ={username}/>


  );
}

export default NonUserProfile;