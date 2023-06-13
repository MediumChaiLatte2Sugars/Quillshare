import React, { Component }  from 'react';
import './App.css';

import { Route, Routes } from "react-router";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Explore from "./components/Explore";
import Community from "./components/Community";
import HomePage from "./components/HomePage";
import Feed from "./components/Feed";

// import Sidebar from "./components/Sidebar";
// import Feed from "./components/Feed";
// import Rightbar from "./components/Rightbar";

// import { useState } from "react";

class App extends Component {

  
  render() {
  return (

    <Box>
    <Navbar/>

     <Routes>
     <Route path="/homepage" element={<HomePage /> } />
     <Route path="/explore" element={<Explore /> } />
     <Route path="/community" element={<Community /> } />
      <Route path="/feed" element={<Feed /> } />
     </Routes>
    </Box>
  
  
  );
}
}
export default App;

