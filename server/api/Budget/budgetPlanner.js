const express = require('express');
const router = express.Router();

// Mock data for budget planner
let budgetData = {
  budget: 1000,
  expenses: 500
};

router.get('/', (req, res) => {
  res.json(budgetData);
});

router.post('/update', (req, res) => {
  const { budget, expenses } = req.body;
  budgetData.budget = budget;
  budgetData.expenses = expenses;
  res.status(200).json({ message: "Budget updated successfully", budgetData });
});

module.exports = router;
