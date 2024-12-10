const Expense = require('../models/Expense');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const CustomError = require('../utils/CustomError');

// Add a new expense
const addExpense = asyncErrorHandler( async (req, res) => {
    const { amount, category, date, notes } = req.body;
    const expense = await Expense.create({
        userId: req.user.userId, // Extracted from the authenticated user
        amount,
        category,
        date,
        notes,
    });
    res.status(201).json({status:"success",message:"expense added successfully",expense});
   
});

// Get all expenses for the authenticated user
const getExpenses =asyncErrorHandler(async (req, res) => {
    const expenses = await Expense.find({ userId: req.user.userId }).sort({ date: -1 });
    res.status(200).json({status:"success",message:"expenses fetched successfully",expenses});
  
});

// Update an expense
const updateExpense =asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { amount, category, date, notes } = req.body;

    const expense = await Expense.findOneAndUpdate(
        { _id: id, userId: req.user.userId },
        { amount, category, date, notes },
        { new: true } // Return the updated document
    );

    if (!expense) {
        throw new CustomError('Expense not found',404);
    }

    res.status(200).json({status:"success",message:"expense updated successfully",expense});
   
});

// Delete an expense
const deleteExpense = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const expense = await Expense.findOneAndDelete({ _id: id, userId: req.user.userId });
    if (!expense) {
        throw new CustomError('Expense not found',404);
    }
    res.status(200).json({status:"success",message:"expense deleted successfully", expense});
  
});

module.exports = {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
};
