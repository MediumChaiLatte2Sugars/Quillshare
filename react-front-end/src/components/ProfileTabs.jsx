import React, { useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { useAuth0 } from '@auth0/auth0-react';

import axios from 'axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ProfileTabs() {
  const { user, isAuthenticated } = useAuth0;
  const [value, setValue] = useState(0);
  const [filteredUser, setFilteredUser]  = useState(null);
  const [filteredUserStoires, setFilteredUserStories]  = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // useEffect(async () => {
  //   const userData = await axios.get(`/api/users`);
  //   setFilteredUser(userData.users.find((u) => u.email === user.email));
  //   const userStoryData = await axios.get(`/api/users/${filteredUser.id}/stories`)
  //   setFilteredUserStories(userStoryData)
  // }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Bio" {...a11yProps(0)} />
          <Tab label="Reading List" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {/* {filteredUser.bio} */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </Box>
  );
}
