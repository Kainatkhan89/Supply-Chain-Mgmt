import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

function UploadOrderReceipt({ onUpload }) {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(''); // To show selected file name

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageName(file.name); // Update state with file name for display
    } else {
      // Reset to initial state if no file is selected
      setImage(null);
      setImageName('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image) {
      onUpload(image);
    } else {
      alert('Please select an image to upload.'); // Consider replacing with a more user-friendly notification
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Upload Image
      </Typography>
      
      <Button
        variant="outlined"
        component="label"
        startIcon={<PhotoCamera />}
        sx={{ mt: 1 }}
      >
        Choose File
        <input
          id="image-input"
          type="file"
          hidden
          onChange={handleImageChange}
          required
          accept="image/*" // Accept images only
        />
      </Button>
      
      {imageName && (
        <Box sx={{ mt: 2, mb: 1, textAlign: 'center' }}>
          Selected Image: <strong>{imageName}</strong>
        </Box>
      )}

      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        Upload
      </Button>
    </Box>
  );
}

export default UploadOrderReceipt;
