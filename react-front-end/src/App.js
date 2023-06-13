
import { Route, Routes } from "react-router";
import { Box ,createTheme ,ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar";
import Explore from "./components/Explore";
import Community from "./components/Community";
import CreateStory from "./components/CreateStory";
import HomePage from "./components/HomePage";
import Feed from "./components/Feed";

// import Sidebar from "./components/Sidebar";
// import Feed from "./components/Feed";
// import Rightbar from "./components/Rightbar";


import { useState } from "react";

function App() {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
  <ThemeProvider theme={darkTheme}>
    <Box>
      <Navbar/>
      
     <Routes>
     <Route path="/homepage" element={<HomePage /> } />
     <Route path="/explore" element={<Explore /> } />
     <Route path="/community" element={<Community /> } />
     <Route path="/createstory" element={<CreateStory /> } />
     <Route path="/feed" element={<Feed /> } />
    
     </Routes>
    
    </Box>
  </ThemeProvider>
  
  );
}

export default App;

