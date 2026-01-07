const CreditSale = require('../models/CreditSale')

// Record a credit sale
exports.addCreditSale = async (req, res) => {
  try {
    const creditSale = new CreditSale(req.body)
    await creditSale.save()
    res.json({ message: 'Credit sale recorded successfully', creditSale })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Get all credit sales
exports.getCreditSales = async (req, res) => {
  try {
    const creditSales = await CreditSale.find().populate('product').populate('agent')

    res.json(creditSales)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
