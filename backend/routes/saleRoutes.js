const express = require('express')
const router = express.Router()

const Sale = require('../models/Sale')
const Product = require('../models/Product')

const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware')

/*
  CREATE SALE (Agent or Manager)
*/
router.post('/', authMiddleware, authorizeRoles('agent', 'manager'), async (req, res) => {
  try {
    const { productName, tonnage, amountPaid, buyerName, salesAgent, branch, date, time } = req.body

    // STEP 1: Check if product exists in this branch
    const product = await Product.findOne({ name: productName, branch })
    if (!product) {
      return res.status(400).json({ message: 'Product not found in this branch' })
    }

    // STEP 2: Check stock
    if (product.tonnage < tonnage) {
      return res.status(400).json({ message: 'Not enough stock to complete sale' })
    }

    // STEP 3: Save sale
    const sale = new Sale({
      productName,
      tonnage,
      amountPaid,
      buyerName,
      salesAgent,
      branch,
      date,
      time,
    })

    await sale.save()

    // STEP 4: Reduce stock
    product.tonnage -= tonnage
    await product.save()

    res.status(201).json({ message: 'Sale recorded successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error', error })
  }
})

/*
  GET SALES FOR LOGGED-IN AGENT
*/
router.get('/my-sales', authMiddleware, authorizeRoles('agent'), async (req, res) => {
  try {
    const username = req.user.username
    const sales = await Sale.find({ salesAgent: username })
    res.json(sales)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

/*
  GET SALES FOR A SPECIFIC BRANCH (MANAGER)
  -----------------------------------------
  This is the route your Manager Dashboard needs.
*/
router.get('/branch/:branchName', authMiddleware, authorizeRoles('manager'), async (req, res) => {
  try {
    const branchName = req.params.branchName
    const sales = await Sale.find({ branch: branchName })
    res.json(sales)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

/*
  GET ALL SALES (Director or Manager)
*/
router.get('/', authMiddleware, authorizeRoles('manager', 'director'), async (req, res) => {
  try {
    const sales = await Sale.find()
    res.json(sales)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

module.exports = router
