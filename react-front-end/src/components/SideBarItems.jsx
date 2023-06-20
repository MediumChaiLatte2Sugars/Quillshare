import React, { useEffect, useState } from 'react';
import { 
  Avatar, 
  Box, 
  Divider, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Typography, 
  Skeleton 
} from '@mui/material';

import axios from 'axios';

import { EditorState, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import html2plaintext from 'html2plaintext';


const convertStory = (content) => {
  // Convert the editorState back to an object
  const contentObject = JSON.parse(content);
  const contentState = convertFromRaw(contentObject);
  const editorState = EditorState.createWithContent(contentState);
  const contentWithFormatting = stateToHTML(editorState.getCurrentContent());

  return contentWithFormatting;
}

const truncateString = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str; // No truncation needed
  }
  
  // Truncate the string and add ellipses
  const truncated = str.substring(0, maxLength - 3) + '...';
  return truncated;
}

const SideBarItems = (props) => {

  console.log("SIDEBAR PRops:", props.story);

  const [author, setAuthor] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (props.story) {
      const fetchData = async (story) => {
        try {
          const authorResponse = await axios.get(`/api/users/${story.user_id}/name`);
          return setAuthor(authorResponse.data);
        } catch (err) {
          console.error(err);
        }
      }

      fetchData(props.story);
    }
  }, []);

  useEffect(() => {
    if (props.user) {
      const fetchData = async (user) => {
        try {
          const userResponse = await axios.get(`/api/users/${user}`);
          return setUser(userResponse.data.users[0]);
        } catch (err) {
          console.error(err);
        }
      }

      fetchData(props.user);
    }
  }, []);

  return (
    <>
      {props.isUser ? (
        <>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>{user ? user.username.split('')[0] : 'J'}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user ? user.username : <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation="wave" />}
                secondary={
                  <>
                    {user ? user.bio : <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" />}
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </>
      ) : (
        <>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>{props.authr ? props.author.username.split('')[0] : 'J'}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={props.story ? props.story.title : <Skeleton variant="text" sx={{ fontSize: '2rem' }} animation="wave" />}
                secondary={
                  <>
                    <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {author ? author : <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" />}
                  </Typography>
                    <div>
                    {props.story ? truncateString(html2plaintext(convertStory(props.story.content)), 50) : <Skeleton variant="text" sx={{ fontSize: '1rem' }} animation="wave" />}
                    </div>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </>
      )}
    </>
  );
};
export default SideBarItems;
