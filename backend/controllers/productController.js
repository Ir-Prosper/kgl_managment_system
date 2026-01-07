const Product = require('../models/Product')

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.json({ message: 'Product added successfully', product })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
