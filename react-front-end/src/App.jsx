import { useEffect, useState } from "react";

import React, { Component }  from 'react';
import './App.css';

import { Route, Routes } from "react-router";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Explore from "./components/Explore";
import Community from "./components/Community";
import HomePage from "./components/HomePage";
import Feed from "./components/Feed";
import CategoryStory from "./components/CategoryStory";
import CreateStory from "./components/CreateStory"
import Profile from './components/Profile';
import SingleStory from './components/SingleStory';
import SearchBoxResult from "./components/SearchBoxResult";


import { io } from "socket.io-client";
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';



// import { withAuth0 } from "@auth0/auth0-react";

// import Sidebar from "./components/Sidebar";
// import Feed from "./components/Feed";
// import Rightbar from "./components/Rightbar";

// import { useState } from "react";

const App = () => {

  const [username, setUsername] = useState("");
  const [socket, setSocket] = useState(null);
  
  
  useEffect(() => {
  setSocket(io("http://localhost:3002"));
 
  
  }, []);
  
  useEffect(() => {
  if(socket){
  socket.emit("newUser", username);
  console.log(socket.on ("test event" ,(msg)=>{ console.log(msg)}))
  console.log("for socket id " +socket);


  }
  }, [socket, username]);
  
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated){

      const fetchData = async (user) => {
        try {
            const getUsers = await axios.get(`/api/users`);
            const filteredUser = getUsers.data.users.find((u) => u.email === user.email);
            console.log("Getting filteredUser value: for socket ", filteredUser.username); 

            return setUsername(filteredUser.username);
          }
         catch (err) {
          console.error(err)
          return () => {};
        }
        
      }
      fetchData(user);
    }
  }, [isAuthenticated]);

  
  return (

    <Box>
    <Navbar  socket={socket}/>
   
     <Routes>
      <Route path="/homepage" element={<HomePage /> } />
      <Route path="/searchboxresult" element={<SearchBoxResult /> } />
      <Route path="/explore" element={<Explore /> } />
      <Route path="/community" element={<Community /> } />
      <Route path="/feed" element={<Feed /> } />
      <Route path="/CategoryStory" element={<CategoryStory /> } />
      <Route path="/createstory" element={<CreateStory /> } />
      <Route path="/profile" element={<Profile  socket={socket} username={username} /> } />
      <Route path="/story/:id" element={<SingleStory />} />
     </Routes>
    </Box>

  );
  
}
export default App;

