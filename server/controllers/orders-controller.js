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

module.exports = router;