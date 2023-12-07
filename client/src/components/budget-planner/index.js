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
    fetchBudgetData();
  }, []);

  const fetchBudgetData = async () => {
    try {
      // Replace with actual API call
      const response = await fetch('/api/budgetPlanner');
      const data = await response.json();
      setBudget(data.budget);
      setExpenses(data.expenses);
    } catch (error) {
      console.error('Error fetching budget data:', error);
    }
  };

  const handleUpdate = async () => {
    const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0);
    try {
      // Replace with actual API call
      const response = await fetch('/api/budgetPlanner/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ budget, expenses: totalExpenses }),
      });
      if (response.ok) {
        setEditMode(false);
      }
    } catch (error) {
      console.error('Error updating budget:', error);
    }
  };

  const handleBudgetChange = (e) => {
    setBudget(Number(e.target.value));
  };

  const handleExpenseChange = (category) => (e) => {
    setExpenses({ ...expenses, [category]: Number(e.target.value) });
  };

  // const data = {
  //   labels: Object.keys(expenses),
  //   datasets: [
  //     {
  //       label: 'Expenses',
  //       data: Object.values(expenses),
  //       backgroundColor: [
  //         '#FF6384',
  //         '#36A2EB',
  //         '#FFCE56',
  //         '#4BC0C0',
  //         '#9966FF',
  //       ],
  //       hoverOffset: 4
  //     }
  //   ]
  // };

  const data = {
    labels: ['Food', 'Travel', 'Entertainment', 'Utilities', 'Other'],
    datasets: [
      {
        label: 'Expenses',
        data: [300, 150, 100, 200, 50], // example hardcoded data
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverOffset: 4,
      },
    ],
  };


  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Budget Planner</Typography>
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
              <Pie data={data} key={JSON.stringify(data)} />
              <Button variant="contained" color="primary" onClick={() => setEditMode(true)} style={{ marginTop: '1rem' }}>
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
