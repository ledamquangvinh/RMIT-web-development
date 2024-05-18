module.exports = (option) => {
  return (req, res, next) => {
    try {
      console.log("This is middleware", option)
      if(req.cookies.role === 'admin') 
        next()
      else
        throw new Error("You are not admin")
    } catch(err) {
      console.log(err.message);
      next(err)
    }
  }
}