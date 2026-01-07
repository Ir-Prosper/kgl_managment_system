// ------------------------------------------------------------
// AUTH ROUTES (FULL WORKING VERSION)
// ------------------------------------------------------------

const express = require('express')
const router = express.Router()

const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware')

// ------------------------------------------------------------
// REGISTER USER (for testing only)
// ------------------------------------------------------------
router.post('/register', async (req, res) => {
  try {
    const { username, password, role, branch } = req.body

    // Check if username already exists
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      branch,
    })

    await newUser.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

// ------------------------------------------------------------
// LOGIN USER (FIXED VERSION)
// ------------------------------------------------------------
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    // Check if user exists
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' })
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' })
    }

    // Create JWT token (NOW INCLUDES username, role, branch)
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
        branch: user.branch,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
    )

    // Send response
    res.status(200).json({
      message: 'Login successful',
      token,
      username: user.username,
      role: user.role,
      branch: user.branch,
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

// ------------------------------------------------------------
// GET ALL USERS (for testing)
// ------------------------------------------------------------
router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

// ------------------------------------------------------------
// PROTECTED ROUTES
// ------------------------------------------------------------

// Profile route
router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Profile accessed',
    user: req.user,
  })
})

// Manager-only route
router.get('/manager-dashboard', authMiddleware, authorizeRoles('manager'), (req, res) => {
  res.json({ message: 'Welcome Manager!' })
})

// Agent-only route
router.get('/agent-dashboard', authMiddleware, authorizeRoles('agent'), (req, res) => {
  res.json({ message: 'Welcome Agent!' })
})

// Director-only route
router.get('/director-dashboard', authMiddleware, authorizeRoles('director'), (req, res) => {
  res.json({ message: 'Welcome Director!' })
})

module.exports = router
