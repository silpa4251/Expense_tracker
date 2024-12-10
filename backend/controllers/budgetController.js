const mongoose = require('mongoose');
const Budget = require('../models/Budget');
const Expense = require('../models/Expense');


// Set a budget for a category
const setBudget = async (req, res) => {
    const { category, amount } = req.body;
    try {
        const budget = await Budget.findOneAndUpdate(
            { userId: req.user.userId, category },
            { amount },
            { new: true, upsert: true } // Create if not found
        );
        res.status(200).json(budget);
    } catch (error) {
        res.status(500).json({ error: 'Failed to set budget' });
    }
};


// Get all budgets for the authenticated user
const getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({ userId: req.user.userId });
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch budgets' });
    }
};


// Get remaining budget for a category
const getRemainingBudget = async (req, res) => {
    const category = req.params.category.trim().toLowerCase();
    try {
        const userId = new mongoose.Types.ObjectId(req.user.userId);
        const budget = await Budget.findOne({ userId, category });
        if (!budget) {
            return res.status(404).json({ error: 'Budget not found' });
        }
        const totalExpenses = await Expense.aggregate([
            { $match: { userId, category } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]);

        const spent = totalExpenses.length ? totalExpenses[0].total : 0;
        const remaining = budget.amount - spent;

        res.status(200).json({ category, budget: budget.amount, spent, remaining });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to calculate remaining budget' });
    }
};

module.exports = {
    setBudget,
    getBudgets,
    getRemainingBudget,
};
