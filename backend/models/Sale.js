/*
  SALES MODEL
  -----------
  This model stores every normal sale made by agents or managers.

  It matches the FRONTEND sales form EXACTLY:
  - productName
  - tonnage
  - amountPaid
  - buyerName
  - salesAgent
  - branch
  - date
  - time

  These fields come directly from sales.html.
*/
const mongoose = require('mongoose')

const saleSchema = new mongoose.Schema({
  productName: { type: String, required: true }, // Produce sold
  tonnage: { type: Number, required: true }, // Quantity sold
  amountPaid: { type: Number, required: true }, // Cash received
  buyerName: { type: String, required: true }, // Customer name
  salesAgent: { type: String, required: true }, // Agent username
  branch: { type: String, required: true }, // Maganjo / Matugga
  date: { type: String, required: true }, // Date of sale
  time: { type: String, required: true }, // Time of sale
})

module.exports = mongoose.model('Sale', saleSchema)
