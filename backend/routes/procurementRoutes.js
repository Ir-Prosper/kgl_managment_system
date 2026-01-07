const express = require('express')
const router = express.Router()

const Procurement = require('../models/Procurement')
const Product = require('../models/Product')

const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware')

/*
  CREATE PROCUREMENT (Manager Only)
*/
router.post('/', authMiddleware, authorizeRoles('manager'), async (req, res) => {
  try {
    const {
      produceName,
      produceType,
      date,
      time,
      tonnage,
      cost,
      dealerName,
      branch,
      contact,
      salePrice,
    } = req.body

    // STEP 1: Save procurement record
    const procurement = new Procurement({
      produceName,
      produceType,
      date,
      time,
      tonnage,
      cost,
      dealerName,
      branch,
      contact,
      salePrice,
    })

    await procurement.save()

    // STEP 2: Update or create product stock
    let product = await Product.findOne({ name: produceName, branch })

    if (!product) {
      product = new Product({
        name: produceName,
        type: produceType,
        tonnage: tonnage,
        branch,
        dealer: dealerName,
        cost,
        price: salePrice,
      })
    } else {
      product.tonnage += tonnage
      product.type = produceType
      product.dealer = dealerName
      product.cost = cost
      product.price = salePrice
    }

    await product.save()

    res.status(201).json({
      message: 'Procurement recorded and stock updated successfully',
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error', error })
  }
})

/*
  GET PROCUREMENTS FOR A SPECIFIC BRANCH (Manager)
  ------------------------------------------------
  This is the route your Manager Dashboard needs.
*/
router.get('/branch/:branchName', authMiddleware, authorizeRoles('manager'), async (req, res) => {
  try {
    const branchName = req.params.branchName
    const procurements = await Procurement.find({ branch: branchName })
    res.json(procurements)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

/*
  GET ALL PROCUREMENTS (Manager or Director)
*/
router.get('/', authMiddleware, authorizeRoles('manager', 'director'), async (req, res) => {
  try {
    const procurements = await Procurement.find()
    res.json(procurements)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

module.exports = router
