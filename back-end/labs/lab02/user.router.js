const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
  console.log("Time: ", Date.now())
  next()
})

// Define Middleware for logging information of request
router.use('/', (req, res, next) => {
  console.log("user request: ", req.originalUrl)
  next()
}, (req, res, next) => {
  console.log("Request Type: ", req.method)
  next()
})
// --------------------------------------------------------------

// Define Middlewre for getting path user id
router.get('/:id', (req, res, next) => {
  if(req.params.id === '0'){
    next('route')
  } else {
    next()
  }
}, (req, res) => {
  res.send('regular')
})

// Handle for path/user/ in which special page
router.get('/:id', (req, res) => {
  console.log(req.params.id)
  res.send('special')
})


module.exports = router