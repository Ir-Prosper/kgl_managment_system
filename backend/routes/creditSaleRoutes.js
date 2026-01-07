const express = require('express')
const router = express.Router()

const CreditSale = require('../models/CreditSale')
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware')

/*
  CREATE CREDIT SALE (Agent or Manager)
*/
router.post('/', authMiddleware, authorizeRoles('agent', 'manager'), async (req, res) => {
  try {
    const {
      buyerName,
      nin,
      location,
      contact,
      amountDue,
      salesAgent,
      branch,
      dueDate,
      productName,
      productType,
      tonnage,
      dispatchDate,
    } = req.body

    const creditSale = new CreditSale({
      buyerName,
      nin,
      location,
      contact,
      amountDue,
      salesAgent,
      branch,
      dueDate,
      productName,
      productType,
      tonnage,
      dispatchDate,
    })

    await creditSale.save()

    res.status(201).json({ message: 'Credit sale recorded successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error', error })
  }
})

/*
  GET CREDIT SALES FOR LOGGED-IN AGENT
*/
router.get('/my-credit-sales', authMiddleware, authorizeRoles('agent'), async (req, res) => {
  try {
    const username = req.user.username
    const creditSales = await CreditSale.find({ salesAgent: username })
    res.json(creditSales)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

/*
  GET CREDIT SALES FOR A SPECIFIC BRANCH (Manager)
  ------------------------------------------------
  This is the route your Manager Dashboard needs.
*/
router.get('/branch/:branchName', authMiddleware, authorizeRoles('manager'), async (req, res) => {
  try {
    const branchName = req.params.branchName
    const creditSales = await CreditSale.find({ branch: branchName })
    res.json(creditSales)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

/*
  GET ALL CREDIT SALES (Manager or Director)
*/
router.get('/', authMiddleware, authorizeRoles('manager', 'director'), async (req, res) => {
  try {
    const creditSales = await CreditSale.find()
    res.json(creditSales)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

module.exports = router
