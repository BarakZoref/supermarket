const tokenDecoder = require("../utils/token-decoder");
const ordersLogic = require('../logic/orders-logic');
const express = require("express");
const router = express.Router();
const path = require("path");


//GET AMOUNT OF ORDERS
//GET http://localhost:4200/orders/amount_of_orders
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
//POST http://localhost:4200/orders
router.post('/', async (request, response) =>{
    let tokenData = tokenDecoder.decodeTokenFromRequest(request);
    let orderDetails = request.body;
    try {
        let orderId = await ordersLogic.addNewOrder(orderDetails, tokenData);
        response.json(orderId);
    } catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

//GET BUSY DAYS
//GET http://localhost:4200/orders/busy_days
router.get('/busy_days', async (request, response) =>{
    try {
        let busyDays = await ordersLogic.getBusyDays();
        response.json(busyDays);
    } catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

//GET LAST ORDER DATE
//GET http://localhost:4200/orders/
router.get('/', async (request, response) =>{
    let tokenData = tokenDecoder.decodeTokenFromRequest(request);
    try {
        let orderDate = await ordersLogic.getLastOrderDate(tokenData);
        response.json(orderDate);
    } catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

//GET ORDER DETAILS
//GET http://localhost:4200/orders/order_details/cartId
router.get('/order_details/:id', async (request, response) =>{
    let cartId = request.params.id
    try {
        let orderDetails = await ordersLogic.getOrderDetails(cartId);
        response.json(orderDetails);
    } catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.get('/receipt/:id', async (request, response)=>{
    try {
        response.sendFile(path.resolve(__dirname,'../receipts/', request.params.id+'.txt'))
    } catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
   
});




module.exports = router;