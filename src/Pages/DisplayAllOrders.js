import React, { useState, useEffect } from 'react';
import {
  Typography,
  CircularProgress,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  DialogActions,
  Button,
  Paper
} from '@mui/material';
import { API_GET_DATA_FROM_DYNAMO } from "../util/URLs";

const DisplayAllOrders = () => {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetch(API_GET_DATA_FROM_DYNAMO, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      const parsedData = JSON.parse(data.body);
      setRecords(parsedData);
      setIsLoading(false);
    })
    .catch(error => {
      setError(error.toString());
      setIsLoading(false);
    });
  }, []);

 

  return (
    <div >
      <Typography variant="h4" gutterBottom>
        All Supply Chain Records
      </Typography>
      {isLoading ? (
        <Box display="flex" justifyContent="center"><CircularProgress /></Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Origin</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Estimated Arrival</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">{index + 1}</TableCell>
                  <TableCell>{record.Type}</TableCell>
                  <TableCell>{record.Origin}</TableCell>
                  <TableCell>{record.Destination}</TableCell>
                  <TableCell>{record.EstimatedArrival}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
        </TableContainer>
      )}
    </div>
  );
};

export default DisplayAllOrders;
