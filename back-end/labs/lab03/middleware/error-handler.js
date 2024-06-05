module.exports = (err, req, res, next) => {
  console.log("error handler")
  console.log(err.message)
  res.status(500).send('An Error occured')
}