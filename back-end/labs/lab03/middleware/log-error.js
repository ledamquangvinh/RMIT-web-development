module.exports = (err, req, res, next) => {
  console.log("log error")
  console.error(err.stack);
  next(err);
} 