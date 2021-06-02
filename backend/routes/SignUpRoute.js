const express = require('express')
const router = express.Router()
const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')

// Get All Clients

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({
      errorMessage: 'Server Error',
    })
  }
})

// Insert Client

router.post(
  '/',
  [
    check('firstname', 'First Name is Required').not().isEmpty().trim(),
    check('lastname', 'Last Name is Required').not().isEmpty().trim(),
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
    check('cpassword')
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
      return res.status(400).json({ errors })
    }

    const { firstname, lastname, email, dob, password, cpassword } = req.body

    try {
      const user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({
          errors: {
            errors: [{ msg: 'Email Already Exist' }],
          },
        })
      }

      const newUser = new User()

      firstname, lastname, email, password, cpassword

      newUser.firstname = firstname
      newUser.lastname = lastname
      newUser.email = email
      newUser.dob = dob

      const salt = await bcrypt.genSalt(10)

      if (password === cpassword) {
        newUser.password = await bcrypt.hash(password, salt)
      } else {
        res.status(400).json({
          errors: {
            errors: [{ msg: 'Passwords Do Not Match' }],
          },
        })
        return
      }

      await newUser.save()
      res.status(200).json({
        success: {
          success: [{ msg: 'Registration SuccessFul' }],
        },
      })
    } catch (err) {
      console.error(err.message)
      res.status(500).json({
        errors: {
          errors: [{ msg: 'Server Error' }],
        },
      })
    }
  }
)

module.exports = router
