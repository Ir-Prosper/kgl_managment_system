/*
  PROCUREMENT MODEL
  -----------------
  This model stores every procurement record made by the manager.
  
  Fields come directly from the procurement.html form:
  - produceName
  - produceType
  - date
  - time
  - tonnage
  - cost
  - dealerName
  - branch
  - contact
  - salePrice
*/

const mongoose = require('mongoose')

const procurementSchema = new mongoose.Schema({
  produceName: { type: String, required: true }, // Name of the produce (e.g., Maize)
  produceType: { type: String, required: true }, // Type (e.g., Dry, Fresh)
  date: { type: String, required: true }, // Date selected in the form
  time: { type: String, required: true }, // Time selected in the form
  tonnage: { type: Number, required: true }, // Quantity procured
  cost: { type: Number, required: true }, // Cost per ton or total cost
  dealerName: { type: String, required: true }, // Supplier name
  branch: { type: String, required: true }, // Maganjo or Matugga
  contact: { type: String, required: true }, // Dealer contact
  salePrice: { type: Number, required: true }, // Price manager sets for selling
})

module.exports = mongoose.model('Procurement', procurementSchema)
