const mongoose = require("mongoose");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

// Connecting to mongodb
const connectDb = asyncErrorHandler(async()=>{
    await mongoose.connect(process.env.CONNECTION_STRING)
    console.log("MongoDb connected")
});

module.exports = connectDb;