const ordersLogic = require('../logic/orders-logic');
const express = require("express");
const router = express.Router();

//GET AMOUNT OF ORDERS
//GET http://localhost:3000/orders/amount_of_orders
router.get('/amount_of_orders', async (request, response) =>{
    try {
        let amountOfOrders = await ordersLogic.getAmountOfOrders();
        response.json(amountOfOrders);
    } catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

//ADD NEW ORDER
//POST http://localhost:3000/orders
router.post('/', async (request, response) =>{
    let orderDetails = request.body;
    try {
        let orderId = await ordersLogic.addNewOrder(orderDetails);
        response.json(orderId);
    } catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});



module.exports = router;