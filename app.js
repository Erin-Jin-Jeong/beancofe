const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

// const coffeeRoutes = require("./routes/coffee.routes");
const authRoutes = require("./routes/auth.routes");

const productRoutes = require("./routes/product.routes");

const cartRoutes = require("./routes/cart.routes");

const app = express(); 

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use("/api/coffees", coffeeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);


module.exports = app;
