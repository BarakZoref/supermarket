const cartsLogic = require('../logic/carts-logic');
const tokenDecoder = require('../utils/token-decoder')
const express = require("express");
const router = express.Router();

//ADD CART
//POST http://localhost:4200/carts
router.post('/', async (request, response)=>{
    let tokenData = tokenDecoder.decodeTokenFromRequest(request);
    try {
        let cartId = await cartsLogic.addCart(tokenData);
        response.json({cartId});
    } catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});


//GET LAST CART
//GET http://localhost:4200/carts
router.get('/', async (request, response)=>{
    let tokenData = tokenDecoder.decodeTokenFromRequest(request);
    try {
        let cartDetails = await cartsLogic.getLastCart(tokenData);
        response.json(cartDetails);
    } catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});
module.exports = router
