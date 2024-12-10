const express = require('express');
const { addExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/expenseController');
const auth = require('../middlewares/auth');

const expenseRouter = express.Router();

expenseRouter.use(auth);

expenseRouter.post('/',addExpense);
expenseRouter.get('/',getExpenses);
expenseRouter.put('/:id',updateExpense);
expenseRouter.delete('/:id', deleteExpense);

module.exports = expenseRouter;
