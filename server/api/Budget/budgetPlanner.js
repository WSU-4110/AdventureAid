const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

let budgetItems = [];

app.use(express.json());

// Get all budget items
app.get('/api/budget-items', (req, res) => {
  res.json(budgetItems);
});

// Add a new budget item
app.post('/api/budget-items', (req, res) => {
  budgetItems.push(req.body);
  res.status(201).json(req.body);
});

// Delete a budget item
app.delete('/api/budget-items/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < budgetItems.length) {
    budgetItems.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Item not found');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
