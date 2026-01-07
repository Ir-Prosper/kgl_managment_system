// Import required packages
const express = require('express') // Framework for building APIs
const mongoose = require('mongoose') // Connects to MongoDB database
const cors = require('cors') // Allows frontend to talk to backend
require('dotenv').config() // Loads variables from .env file

const app = express() // Creates the Express application

// ------------------------------------------------------------
// MIDDLEWARE
// ------------------------------------------------------------
app.use(express.json()) // Allows JSON bodies
app.use(cors()) // Allows frontend to connect

// ------------------------------------------------------------
// DATABASE CONNECTION
// ------------------------------------------------------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err))

// ------------------------------------------------------------
// ROUTES
// ------------------------------------------------------------

// Authentication routes (register, login, get users)
app.use('/api/auth', require('./routes/authRoutes'))

// Product routes (add, list, update stock)
app.use('/api/products', require('./routes/productRoutes'))

// Sales routes (normal sales)
app.use('/api/sales', require('./routes/saleRoutes'))

// Credit sales routes
app.use('/api/credit-sales', require('./routes/creditSaleRoutes'))

// Procurement routes (stock purchases)
app.use('/api/procurements', require('./routes/procurementRoutes'))

// ------------------------------------------------------------
// START SERVER
// ------------------------------------------------------------
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
