/*
  PRODUCT MODEL
  -------------
  This model stores stock for each produce in each branch.
  It is updated automatically when procurement or sales happen.

  Fields:
  - name: produce name
  - type: produce type
  - tonnage: current stock
  - branch: Maganjo or Matugga
  - dealer: last supplier (optional)
  - cost: cost price (optional)
  - price: sale price set by manager

  NEW FIELD:
  - alertLevel: minimum stock before triggering a low‑stock alert
*/

const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String },

  // Current stock in tons
  tonnage: { type: Number, default: 0 },

  // Branch where this product is stored
  branch: { type: String, required: true },

  // Optional fields for procurement and pricing
  dealer: { type: String },
  cost: { type: Number, default: 0 },
  price: { type: Number, default: 0 },

  /*
    This defines the minimum stock before the system warns:
    "⚠️ Low stock: Maize only 5 tons left"

    Default is 10 tons, but you can change it per product.
  */
  alertLevel: { type: Number, default: 10 },
})

module.exports = mongoose.model('Product', productSchema)
