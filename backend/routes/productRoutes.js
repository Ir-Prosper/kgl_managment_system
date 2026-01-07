/*
  PRODUCT ROUTES
  --------------
  These routes handle:
  - Adding products (manager)
  - Getting all products (manager/director)
  - Getting products by branch (agent/manager/director)
  - Getting low‑stock alerts (agent/manager)
*/

const express = require('express')
const router = express.Router()

const Product = require('../models/Product')
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware')

/* ============================================================
   1. ADD PRODUCT  (Manager only)
   ------------------------------------------------------------
   Used during procurement. Creates a new product or updates
   an existing one depending on your controller logic.
============================================================ */
router.post('/', authMiddleware, authorizeRoles('manager'), async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()

    res.status(201).json({ message: 'Product added successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

/* ============================================================
   2. GET ALL PRODUCTS (Manager + Director)
   ------------------------------------------------------------
   Used for reporting and full inventory views.
============================================================ */
router.get('/', authMiddleware, authorizeRoles('manager', 'director'), async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

/* ============================================================
   3. GET PRODUCTS BY BRANCH (Agent + Manager + Director)
   ------------------------------------------------------------
   Used by:
   - Agent Dashboard → "Products in My Branch"
   - Manager Dashboard → "Branch Stock"
============================================================ */
router.get('/branch/:branchName', authMiddleware, async (req, res) => {
  try {
    const branchName = req.params.branchName

    const products = await Product.find({ branch: branchName })
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

/* ============================================================
   4. LOW STOCK ALERTS (Agent + Manager)
   ------------------------------------------------------------
   Returns products where:
   tonnage < alertLevel

   Example:
   If Maize has 30 tons and alertLevel = 40 → alert triggered.
============================================================ */
router.get('/low-stock/:branchName', authMiddleware, async (req, res) => {
  try {
    const branchName = req.params.branchName

    const lowStockProducts = await Product.find({
      branch: branchName,
      $expr: { $lt: ['$tonnage', '$alertLevel'] },
    })

    res.json(lowStockProducts)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

/* ============================================================
   5. GET SINGLE PRODUCT BY NAME + BRANCH
   ------------------------------------------------------------
   Useful for forms where you need to fetch one product.
============================================================ */
router.get('/:name/:branch', authMiddleware, async (req, res) => {
  try {
    const { name, branch } = req.params

    const product = await Product.findOne({ name, branch })

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json(product)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

module.exports = router
