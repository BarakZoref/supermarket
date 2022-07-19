const express = require('express');
const cors = require('cors');
const server = express();
const usersController = require('./controllers/users-controller');
const categoriesController = require('./controllers/categories-controller');
const productsController = require('./controllers/products-controller');
const cartsController = require('./controllers/carts-controller');
const cartItemsController = require('./controllers/cart-items-controller');
const ordersController = require('./controllers/orders-controller');
const loginFilter = require('./middleware/login-filter');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');


server.use(cors({ origin: "http://localhost:4200"})); 
// Extract the JSON from the body and create request.body object containing it: 
server.use(loginFilter());

server.use(express.json());
server.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
server.use("/users", usersController);
server.use("/categories", categoriesController);
server.use("/products", productsController);
server.use("/carts", cartsController);
server.use("/cart_items", cartItemsController);
server.use("/orders", ordersController);

server.listen(3001, () => console.log("Listening on http://localhost:3001"));

