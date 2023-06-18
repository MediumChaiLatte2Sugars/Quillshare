import React, { useState } from 'react';
import { IconButton, Snackbar, TextField } from '@mui/material';
import { Share, FileCopy } from '@mui/icons-material';

const ShareButton = ({ link }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleShareButtonClick = () => {
    setOpenSnackbar(true);
    navigator.clipboard.writeText(link);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };


  return (
    <>
      <IconButton aria-label="share" onClick={handleShareButtonClick}>
        <Share />
      </IconButton>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Link copied to clipboard"
        action={
          <IconButton size="small">
            <FileCopy sx={{ color: 'white' }}/>
          </IconButton>
        }
      />
    </>
  );
};

export default ShareButton;
