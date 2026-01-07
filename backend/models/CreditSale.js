/*
  CREDIT SALES MODEL
  ------------------
  This model stores all credit (deferred payment) sales.

  It matches the FRONTEND credit-sales form EXACTLY:
  - buyerName
  - nin
  - location
  - contact
  - amountDue
  - salesAgent
  - branch
  - dueDate
  - productName
  - productType
  - tonnage
  - dispatchDate

  These fields come directly from credit-sales.html.
*/
const mongoose = require('mongoose')

const creditSaleSchema = new mongoose.Schema({
  buyerName: { type: String, required: true }, // Customer name
  nin: { type: String, required: true }, // National ID
  location: { type: String, required: true }, // Customer location
  contact: { type: String, required: true }, // Phone number
  amountDue: { type: Number, required: true }, // Amount to be paid later
  salesAgent: { type: String, required: true }, // Logged-in agent
  branch: { type: String, required: true }, // Maganjo / Matugga
  dueDate: { type: String, required: true }, // Payment deadline
  productName: { type: String, required: true }, // Produce name
  productType: { type: String, required: true }, // Produce type
  tonnage: { type: Number, required: true }, // Quantity dispatched
  dispatchDate: { type: String, required: true }, // When goods were given
})

module.exports = mongoose.model('CreditSale', creditSaleSchema)
