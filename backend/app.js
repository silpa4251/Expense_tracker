const express = require("express");
// const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", authRoutes);
app.use("/api/expense",expenseRoutes);
app.use("/api/budget",budgetRoutes)


app.all("*",(req,res,next) => {
    const error = new customError(`Cannot find ${req.originalUrl} on this server!`,404);
    next(error);
})

// Middleware for gobal error handling
app.use(errorHandler);

module.exports = app;