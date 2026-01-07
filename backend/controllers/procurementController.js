const Procurement = require('../models/Procurement')
const Product = require('../models/Product')

// Record procurement and update stock
exports.recordProcurement = async (req, res) => {
  try {
    const { product, quantity, cost, supplier, manager, branch } = req.body

    // Save procurement record
    const newProcurement = new Procurement({
      product,
      quantity,
      cost,
      supplier,
      manager,
      branch,
    })

    await newProcurement.save()

    // Update product stock
    await Product.findByIdAndUpdate(product, {
      $inc: { stock: quantity },
    })

    res.status(201).json({
      message: 'Procurement recorded and stock updated',
      procurement: newProcurement,
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// List all procurements
exports.getProcurements = async (req, res) => {
  try {
    const procurements = await Procurement.find().populate('product').populate('manager')

    res.json(procurements)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
