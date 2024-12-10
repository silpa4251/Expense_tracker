const express = require('express');
const auth = require('../middlewares/auth');
const { setBudget, getBudgets, getRemainingBudget } = require('../controllers/budgetController');

const budgetRouter = express.Router();

budgetRouter.use(auth);

budgetRouter.post('/',setBudget);
budgetRouter.get('/',getBudgets);
budgetRouter.get('/:category/remaining',getRemainingBudget);


module.exports = budgetRouter;
