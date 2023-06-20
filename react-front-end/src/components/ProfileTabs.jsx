import React, { useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SideBarItems from './SideBarItems';

import { Skeleton } from "@mui/material";

import { useAuth0 } from '@auth0/auth0-react';

import axios from 'axios';
import Sidebar from './Sidebar';

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

export default function ProfileTabs(props) {
  const [value, setValue] = useState(0);
  const [followers, setFollowers] = useState(null);
  const [following, setFollowing] = useState(null);
  const [readingList, setReadingList] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (props.user) {
      const fetchData = async (user) => {
        try {
          const response = await axios.get(`api/users/${user.id}/saved-stories`);
          return setReadingList(response.data);
        } catch (err) {
          console.error(err);
        }
      }

      fetchData(props.user);
    }
  }, [props.user]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Bio" {...a11yProps(0)} />
          <Tab label="Reading List" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {props.user ? props.user.bio : <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" />}

        <h3>Follows</h3>
        <h3>Following</h3>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
        <Box width={300}>
          {readingList ? readingList.map((story) => { return <SideBarItems story={story} /> }) : <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" />}
        </Box>
      </Box>
      </TabPanel>
    </Box>
  );
}
