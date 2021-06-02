const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/UserModel')

const jwtSecret = process.env.JWT_SECRET
const jwtExpire = process.env.JWT_EXPIRE

router.post(
  '/',
  [
    check('email', 'Please Include  a Valid Email')
      .isEmail()
      .normalizeEmail()
      .trim(),
    check('password')
      .trim()
      .isLength({
        min: 6,
        max: 24,
      })
      .withMessage('Password length should be between 6 and 24 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const err = errors.array()[0].msg
      return res.status(400).json({
        msg: err,
      })
    }
    const { email, password } = req.body
    try {
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({
          msg: 'Invalid Credentials',
        })
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({
          msg: 'Invalid Credentials',
        })
      }
      const payload = {
        user: {
          _id: user._id,
        },
      }
      await jwt.sign(
        payload,
        jwtSecret,
        { expiresIn: jwtExpire },
        (err, token) => {
          if (err) {
            console.log('JWT Error', err)
          }
          const { _id, role } = user
          res.json({
            token,
            user: { _id, role },
          })
        }
      )
    } catch (error) {
      console.log('Sign In Error', error)
      res.status(500).json({
        msg: 'Server Error',
      })
    }
  }
)

module.exports = router
