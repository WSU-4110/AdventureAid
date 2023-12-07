import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Paper, Grid } from '@mui/material';
import './categoryRatedAreas.scss'; // Import the SCSS file

function CategoryRatedAreas() {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`http://localhost:3001/api/categoryRatedAreas/category-rated-areas`, {
                params: { latitude, longitude }
            });
            setResult(response.data);
            setError('');
        } catch (err) {
            setError(err.message);
            setResult(null);
        }
    };

    return (
        <Container maxWidth="sm" className="category-rated-areas-container">
            <Paper elevation={6} style={{ padding: '20px', marginTop: '20px' }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <label htmlFor="latitude" style={{ color: 'red', marginRight: '5px' }}>
                                    Latitude *
                                </label>
                                <TextField
                                    fullWidth
                                    label="Latitude"
                                    value={latitude}
                                    onChange={(e) => setLatitude(e.target.value)}
                                    required
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <label htmlFor="longitude" style={{ color: 'red', marginRight: '5px' }}>
                                    Longitude *
                                </label>
                                <TextField
                                    fullWidth
                                    label="Longitude"
                                    value={longitude}
                                    onChange={(e) => setLongitude(e.target.value)}
                                    required
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                        Get Category Rated Areas
                    </Button>
                </form>

                {result && (
                    <Typography style={{ marginTop: '20px' }}>
                        <pre>{JSON.stringify(result, null, 2)}</pre>
                    </Typography>
                )}
                {error && <Typography color="error" style={{ marginTop: '20px' }}>Error: {error}</Typography>}
            </Paper>
        </Container>
    );
}

export default CategoryRatedAreas;
