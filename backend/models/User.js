const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['agent', 'manager', 'director'], required: true },
  branch: { type: String, enum: ['Maganjo', 'Matugga', 'None'], default: 'None' },
})

module.exports = mongoose.model('User', userSchema)
