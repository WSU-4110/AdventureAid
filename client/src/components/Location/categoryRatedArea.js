import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Paper, Grid } from '@mui/material';
import './categoryRatedAreas.scss';

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

    const renderResult = () => {
        if (!result || !result.data) return null;
        return result.data.map((area, index) => (
            <div key={index}>
                <Typography variant="h6" gutterBottom>Area {index + 1}</Typography>
                <Typography>Latitude: {area.geoCode.latitude}</Typography>
                <Typography>Longitude: {area.geoCode.longitude}</Typography>
                <Typography>Radius: {area.radius} meters</Typography>
                <Typography variant="subtitle1">Category Scores:</Typography>
                <Typography>Sight (Overall): {area.categoryScores.sight.overall}</Typography>
                <Typography>Historical: {area.categoryScores.sight.historical}</Typography>
                <Typography>Beach and Park: {area.categoryScores.sight.beachAndPark}</Typography>
            </div>
        ));
    };

    return (
        <Container maxWidth="sm" className="category-rated-areas-container">
            <Paper elevation={6} style={{ padding: '20px', marginTop: '20px' }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Latitude"
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Longitude"
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                                required
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                        Get Category Rated Areas
                    </Button>
                </form>

                <div style={{ marginTop: '20px' }}>
                    {renderResult()}
                </div>
                {error && <Typography color="error" style={{ marginTop: '20px' }}>Error: {error}</Typography>}
            </Paper>
        </Container>
    );
}

export default CategoryRatedAreas;
