const express = require('express');
const cors = require('cors');
const server = express();
const usersController = require('./controllers/users-controller');
const categoriesController = require('./controllers/categories-controller');
const productsController = require('./controllers/products-controller');
const cartsController = require('./controllers/carts-controller');
const loginFilter = require('./middleware/login-filter');



server.use(cors({ origin: "http://localhost:3000"})); 
// Extract the JSON from the body and create request.body object containing it: 
server.use(loginFilter());

server.use(express.json());
server.use("/users", usersController);
server.use("/categories", categoriesController);
server.use("/products", productsController);
server.use("/carts", cartsController)

server.listen(3001, () => console.log("Listening on http://localhost:3001"));