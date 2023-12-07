import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, TextField, Button } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function BudgetPlanner() {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState({
    food: 0,
    travel: 0,
    entertainment: 0,
    utilities: 0,
    other: 0
  });
  const [editMode, setEditMode] = useState(true);

  useEffect(() => {
    // Fetch initial data, replace with actual API call
    // fetchBudgetData();
  }, []);

  // Mock function to simulate fetching data from an API
  const fetchBudgetData = async () => {
    // Implement actual fetch logic here
    // const response = await fetch('/api/budgetPlanner');
    // const data = await response.json();
    // setBudget(data.budget);
    // setExpenses(data.expenses);
  };

  const handleUpdate = async () => {
    // Implement actual update logic here, like sending data to backend
    // const response = await fetch('/api/budgetPlanner/update', { ... });

    setEditMode(false); // Switch to view mode
  };

  const handleBudgetChange = (e) => {
    setBudget(Number(e.target.value));
  };

  const handleExpenseChange = (category) => (e) => {
    setExpenses({ ...expenses, [category]: Number(e.target.value) });
  };

  const data = {
    labels: Object.keys(expenses),
    datasets: [
      {
        label: 'Expenses',
        data: Object.values(expenses),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <Container>
      <Grid container justifyContent="center" spacing={2} mb="5rem">
        <Grid item xs={12}>
          <Typography variant="h4" textAlign="center" >Budget Planner</Typography>
        </Grid>
        {editMode ? (
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '1rem' }}>
              <TextField
                label="Total Budget"
                type="number"
                fullWidth
                margin="normal"
                value={budget}
                onChange={handleBudgetChange}
              />
              {Object.keys(expenses).map((category) => (
                <TextField
                  key={category}
                  label={`${category.charAt(0).toUpperCase() + category.slice(1)} Expenses`}
                  type="number"
                  fullWidth
                  margin="normal"
                  value={expenses[category]}
                  onChange={handleExpenseChange(category)}
                />
              ))}
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Update Budget
              </Button>
            </Paper>
          </Grid>
        ) : (
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '1rem' }}>
              <Typography variant="h6">Budget Overview</Typography>
              <Pie data={data} />
              <Button
                variant="contained"
                color="primary"
                onClick={() => setEditMode(true)}
                style={{ marginTop: '1rem' }}
              >
                Edit Budget
              </Button>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default BudgetPlanner;
