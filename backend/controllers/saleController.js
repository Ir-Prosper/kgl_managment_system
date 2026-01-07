const Sale = require('../models/Sale')

// Record a sale
exports.addSale = async (req, res) => {
  try {
    const sale = new Sale(req.body)
    await sale.save()
    res.json({ message: 'Sale recorded successfully', sale })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Get all sales
exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate('product').populate('agent')
    res.json(sales)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
