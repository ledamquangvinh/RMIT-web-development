const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser')
//set static resource
app.use(express.static('public'));

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.all("/api", (req, res, next) => {
  console.log(req.method + " Request is recieved");
  next();
})

app.get('/api', (req, res) => {
  res.send("this is api")
})

app.post('/api', (req, res) => {
  console.log(req.body)
  res.send('Object is create')
})

// -----------------------------------------------
//? Create API for access the data from data.json in json file

// Pre Request Process

//? Import data file
var data = require('./data.json')

//? step 2: Create API to access to all data
app.get('/products/all', (req, res) => {
  res.statusCode = 200
  res.header('Content-Type', 'application/json')
  res.send(data)
})

app.get('/products/:id', (req, res) => {
  var id = req.params.id;
  console.log(`ID of the product: ${id}`)

  var product = data.find((element) => element.id == id)

  if(product){
    res.statusCode = 200
    res.header('Content-Type', 'application/json')
    res.send(product)
  }else {
    res.statusCode = 404
    res.send("Product not found")
  }
})

// Create API to add new object to data.json
app.post('/products/', (req, res) => {
  var newProduct = req.body
  console.log(newProduct)

  var lastId = data[data.length - 1].id

  var product = {
    id: lastId + 1,
    name: newProduct.name
  }

  data.push(product)

  res.statusCode = 200
  res.send("Product is added")
})

// Update Object
app.put('/products/:id', (req, res) => {
  var id = req.params.id
  console.log(`ID of the products: ${id}`)

  var product = data.find((element) => element.id == id)

 if(product) {
    product.name = req.body.name
    res.status = 200
    res.send("Product is updated")
  }else {
    res.status = 404
    res.send("unable to update")
  }
}) 

// Delete Object by ID
app.delete('/products/:id', (req, res) => {
  var id = req.params.id
  console.log(`ID of the products: ${id}`)

  var index = data.findIndex((element) => element.id == id)

 if(index != -1) {
    data.splice(index, 1)
    res.status = 200
    res.send("Product is deleted")
  }else {
    res.status = 404
    res.send("unable to update")
  }
}) 

//-------------------------------------------------
// Define Route Handler
app.get('/about/a', (req, res) => {
  res.send("About us");
})

app.get('/about/b', (req, res, next) => {
  console.log("Request is recieved");
  next();
}, (req, res) => {
  res.send("About us - Second Time")
})

// Define multiple handler functions
const func_1 = (req, res, next) => {
  console.log("Function 01");
  next();
} 

const func_2 = (req, res, next) => {
  console.log("Function 02");
  next();
}

const func_3 = (req, res, next) => {
  console.log("Function 03");
  res.send("END");
}

app.get('/about/c', [func_1, func_2, func_3]);

// Application Route
app.route('/book')
  .get((req, res) => {
    res.send("GET: Book");
  })
  .post((req, res) => {
    res.send("POST: Book");
  })
  .put((req, res) => {
    res.send("PUT: Book");
  })
  .delete((req, res) => {
    res.send("DELETE: Book");
  })
//-------------------------------------------------
// Express Router
const dogRouter = require('./pkg/dog.js')
app.use('/dog', dogRouter)

//-------------------------------------------------

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
