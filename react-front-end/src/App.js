import React, { Component } from "react";
import "./App.css";

import { Route, Routes } from "react-router";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Explore from "./components/Explore";
import Community from "./components/Community";
import HomePage from "./components/HomePage";
import Feed from "./components/Feed";
import CategoryStory from "./components/CategoryStory";
import CreateStory from "./components/CreateStory";
import Profile from "./components/Profile";
import SingleStory from "./components/SingleStory";
import EditStory from "./components/EditStory";
import NonUserProfile from "./components/NonUserProfile";
import UserCreatedStories from "./components/UserCreatedStories";
import UserSavedStories from "./components/UserSavedStories";

import { DarkModeProvider } from "./components/DarkModeContext";


// import { withAuth0 } from "@auth0/auth0-react";

// import Sidebar from "./components/Sidebar";
// import Feed from "./components/Feed";
// import Rightbar from "./components/Rightbar";

// import { useState } from "react";

class App extends Component {
  render() {
    return (
      <DarkModeProvider>
        <Box>
          <Navbar />

          <Routes>
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/community" element={<Community />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/category/:id" element={<CategoryStory />} />
            <Route path="/createstory" element={<CreateStory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/story/:id" element={<SingleStory />} />
            <Route path="/edit/:uniqueId" element={<EditStory />} />
            <Route path="/user/:id" element={<NonUserProfile />} />
            <Route
              path="/user/stories/created"
              element={<UserCreatedStories />}
            />
            <Route path="/user/stories/saved" element={<UserSavedStories />} />
          </Routes>
        </Box>
      </DarkModeProvider>
    );
  }
}
export default App;
