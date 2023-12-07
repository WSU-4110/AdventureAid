import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';
import './hotelSentiments.scss'; // Import the SCSS file

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
                {sentiments && (
                    <div style={{ marginTop: '20px' }}>
                        <Typography component="h3" variant="h6">
                            Sentiment Data:
                        </Typography>
                        <pre>{JSON.stringify(sentiments, null, 2)}</pre>
                    </div>
                )}
            </Paper>
        </Container>
    );
}

export default HotelSentiments;
