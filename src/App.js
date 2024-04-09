import React, { useState } from 'react';
import ImageUploadForm from './Pages/UploadOrderReceipt';
import SupplyChainOrder from './Pages/CreateSupplyChainOrder';
import DisplayAllOrders from './Pages/DisplayAllOrders';
import { API_PROCESS_IMAGE_URL, API_ADD_DATA_URL, API_SUBSCRIPTION_ENDPOINT } from "./util/URLs";
import {
  Modal,
  Box,
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Container,
  Grid,
  Card,
  CardContent
} from '@mui/material';

function App() {
  const [uploadMode, setUploadMode] = useState('image'); // 'image' or 'manual'
  const [email, setEmail] = useState('');
  const [subscriptionConfirmed, setSubscriptionConfirmed] = useState(localStorage.getItem('isSubscribed') === 'true');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarReceipt, setSnackbarReceipt] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
     localStorage.setItem('isSubscribed', event.target.checked);
  
  };

  const handleConfirmEmail = () => {
    if (email) {
      subscribeUser();
    } else {
      alert('Please enter an email address.');
    }
  };

  const subscribeUser = () => {
    // Call your API to subscribe the user
    fetch(API_SUBSCRIPTION_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setSubscriptionConfirmed(true);
        setSnackbarOpen(true);
        localStorage.setItem('isSubscribed', 'true');
        alert('Subscribed successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error in subscription.');
      });
  };

  const handleUpload = (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      const base64Image = reader.result.split(',')[1]; // Remove the prefix from the result
      console.log(base64Image)
      fetch(API_PROCESS_IMAGE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file: base64Image
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setSnackbarReceipt(true);
        alert('Image uploaded successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error uploading image.');
      });
    };
    reader.onerror = error => console.log('Error: ', error);
  };


  const handleAddNewOrder = (manualData) => {
    console.log("manualData:"+JSON.stringify(manualData))
    const body=JSON.stringify(manualData)
    // API call to add manual order data
    fetch(API_ADD_DATA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })
    .then(response => response.json())
      .then(data => {
        console.log(data);
        alert('New Order Invoice added successfully!');
        
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error adding Invoice.');
      });
  };

   // Modal style
   const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    maxHeight: '90%',
  };
  
  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Supply Chain Management
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <ToggleButtonGroup
            value={uploadMode}
            exclusive
            onChange={(event, newMode) => setUploadMode(newMode)}
            fullWidth
            color="primary"
          >
            <ToggleButton value="manual">Add Manually</ToggleButton>
            <ToggleButton value="image">Upload Image</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        
        {/* Subscription Section */}
        {
        //!subscriptionConfirmed && 
        (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleCheckChange}
                      color="primary"
                    />
                  }
                  label={checked ? 'Subscribed' : 'Subscribe'}
                />
                {checked && (
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="primary" onClick={handleConfirmEmail}>
                        Confirm Email
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Snackbars */}
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)} message="You are subscribed to notifications!" />
        <Snackbar open={snackbarReceipt} autoHideDuration={6000} onClose={() => setSnackbarReceipt(false)} message="Order Receipt uploaded Successfully!" />

        {/* Forms */}
        {uploadMode === 'image' && <ImageUploadForm onUpload={handleUpload} />}
        {uploadMode === 'manual' && <SupplyChainOrder onManualAdd={handleAddNewOrder} />}

        {/* Display Data */}
          {/* Button to Open Modal */}
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setIsModalOpen(true)}
            style={{ margin: '20px 0' }} // Adjusted for better visual alignment
          >
            View All Orders
          </Button>
        </Grid>

        {/* Modal for Displaying Orders */}
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <Box sx={modalStyle}>
            <DisplayAllOrders />
            {/* Close Button at the bottom of the modal */}
            <Button
              variant="outlined"
              color="primary" // Change the color if needed
              onClick={() => setIsModalOpen(false)}
              style={{ marginTop: '20px' }} // Add some space above the button
            >
              Close
            </Button>
          </Box>
        </Modal>


      </Grid>
    </Container>
  );
}

export default App;
