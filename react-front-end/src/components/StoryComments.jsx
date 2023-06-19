import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const styles = {
  modalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    outline: 'none',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '4px',
    outline: 'none',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflowY: 'auto',
  },
  closeButton: {
    marginLeft: 'auto',
  },
};

const CustomModal = ({ open, onClose, children }) => {
  return (
    <Modal open={open} onClose={onClose} className={styles.modalContainer}>
      <Box sx={styles.modalContent}>
        <Button onClick={onClose} sx={styles.closeButton}>
          Close
        </Button>
        <Typography variant="h6" component="div" gutterBottom>
          Comments
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
