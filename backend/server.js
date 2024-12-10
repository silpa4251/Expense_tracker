const express = require("express");
require("dotenv").config();
const app = require("./app");
const connect = require("./config/connection");

// Server port
const PORT = process.env.PORT || 3000;

// Database connection
connect();

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
