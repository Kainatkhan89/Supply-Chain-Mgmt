import React, { useState } from 'react';
import { Button, TextField, Paper, Box, Typography, Container } from '@mui/material';

function generateUniqueId() {
    const timestamp = Date.now().toString();
    const randomPart = Math.random().toString(36).substring(2, 15); // A random string
    return `id_${timestamp}_${randomPart}`; // Concatenate to form a unique ID
}

function CreateSupplyChainOrder({ onManualAdd }) {
    const initialFormData = {
        type: '',
        description: '',
        origin: '',
        destination: '',
        estimatedArrival: '',
    };
    const [manualData, setManualData] = useState(initialFormData);

    const handleSubmit = (e) => {
        e.preventDefault();
        const uniqueId = generateUniqueId(); // Generate a unique ID for the new order
        const orderDataWithId = { ...manualData, id: uniqueId }; // Add the unique ID to the form data
        onManualAdd(orderDataWithId);
        // Reset the form after submission
        setManualData(initialFormData);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setManualData({ ...manualData, [name]: value });
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ mt: 4, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Create New Order
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <TextField
                        label="Type"
                        name="type"
                        value={manualData.type}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                    />

                    <TextField
                        label="Origin"
                        name="origin"
                        value={manualData.origin}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                    />
                    <TextField
                        label="Destination"
                        name="destination"
                        value={manualData.destination}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                    />
                    <TextField
                        label="Estimated Arrival"
                        name="estimatedArrival"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={manualData.estimatedArrival}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" color="primary" type="submit">
                            Save Order
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
}

export default CreateSupplyChainOrder;
