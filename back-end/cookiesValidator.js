const cookiesValidator = async (cookies) => {
  if(cookies.testCookie === '1000') {
    console.log("Valid cookie")
  } else {
    throw new Error('Invalid Cookie')
  }
} 

module.exports = cookiesValidator;
