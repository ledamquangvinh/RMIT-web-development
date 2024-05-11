const express = require('express');
const router = express.Router()

// Define middleware to log request information

const timeLog = (req, res, next) =>{
  console.log('Time: ', Date.now())
  next()
}

router.use(timeLog)

router.get('/', (req, res) => {
  res.send("Dog Home Page");
})

router.get('/about', (req, res) => {
  res.send("About Dog")
})

module.exports = router;