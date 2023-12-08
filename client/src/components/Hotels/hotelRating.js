// HotelSentiments.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Paper, Grid } from '@mui/material';
import './hotelSentiments.scss'; // Import the SCSS file

// SentimentData Component
function SentimentData({ data }) {
    if (!data) {
        return null;
    }

    return (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h6">Hotel Sentiment Analysis</Typography>
            <Grid container spacing={2} style={{ marginTop: '10px' }}>
                <Grid item xs={12}>
                    <Typography><strong>Hotel ID:</strong> {data.hotelId}</Typography>
                    <Typography><strong>Overall Rating:</strong> {data.overallRating}</Typography>
                    <Typography><strong>Number of Reviews:</strong> {data.numberOfReviews}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">Sentiments:</Typography>
                    {Object.entries(data.sentiments).map(([key, value]) => (
                        <Typography key={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</Typography>
                    ))}
                </Grid>
            </Grid>
        </Paper>
    );
}

// Main HotelSentiments Component
function HotelSentiments() {
    const [hotelIds, setHotelIds] = useState('');
    const [sentiments, setSentiments] = useState(null);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setHotelIds(e.target.value);
    };

    const fetchSentiments = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/hotelRating/hotel-sentiments`, {
                params: { hotelIds }
            });
            setSentiments(response.data);
            setError('');
        } catch (err) {
            setError(err.message);
            setSentiments(null);
        }
    };

    return (
        <Container maxWidth="sm" className="hotel-sentiments-container">
            <Paper elevation={6} style={{ padding: '20px', marginTop: '20px' }}>
                <TextField
                    fullWidth
                    label="Enter Hotel IDs (comma-separated) *"
                    value={hotelIds}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        style: { color: 'red' },
                    }}
                />
                <Button variant="contained" color="primary" onClick={fetchSentiments} style={{ marginTop: '20px' }}>
                    Get Sentiments
                </Button>

                {error && <Typography color="error" style={{ marginTop: '20px' }}>Error: {error}</Typography>}
                {sentiments && <SentimentData data={sentiments.data[0]} />}
            </Paper>
        </Container>
    );
}

export default HotelSentiments;
