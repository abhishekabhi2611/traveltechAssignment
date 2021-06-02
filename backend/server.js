const express = require('express')
const app = express()
const connectDb = require('./db')

app.use(express.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})
connectDb()

app.use('/user', require('./routes/SignUpRoute'))
app.use('/signin', require('./routes/signInRoute'))
// Serve static Assets for Production

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listening on port ${port}`))
