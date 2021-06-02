const mongoose = require('mongoose')
require('dotenv').config()

const uri = process.env.dbURI

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    console.log('Database Connection Successful')
  } catch (err) {
    console.error(err)
  }
}
module.exports = connectDB
