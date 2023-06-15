import React, { useState } from 'react';
import { Button, Modal, Typography } from '@mui/material';
import { EditProfileForm } from './form/EditProfileForm';

const ProfileEditModal = ({ user }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Edit Profile
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div style={{ backgroundColor: '#fff', padding: '16px' }}>
          <Typography variant="h6">Edit Profile</Typography>
          <EditProfileForm user={user} />
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileEditModal;
