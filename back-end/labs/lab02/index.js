const express = require('express');
const app = express()

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const mw = require('./middleware')
app.use(mw({option1: '1', option2: 'hello'}))

router.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500).send(err.message)
})

app.get('/', (req, res) => {
  res.send("Hello World");
})

app.get('/', (req, res) => {
  res.send('Next Router')
})

//--------------------------
const userRouter = require('./user.router')
app.use('/user', userRouter)



app.listen(3000, () => {
  console.log("Server is running on port 3000")
})