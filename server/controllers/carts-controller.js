const cartsLogic = require('../logic/carts-logic');
const tokenDecoder = require('../utils/token-decoder')
const express = require("express");
const router = express.Router();

//ADD CART
//POST http://localhost:4200/carts
router.post('/', async (request, response)=>{
    let tokenData = tokenDecoder.decodeTokenFromRequest(request);
    try {
        if(tokenData.role!="user"){
            throw new Error("Error: the role is not a user");
        }
        let userId = tokenData.userId;
        let newCart = await cartsLogic.addCart(userId);
        response.json(newCart);
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
        if(tokenData.role!="user"){
            throw new Error("Error: the role is not a user");
        }
        let cart = await cartsLogic.getLastCart(tokenData.userId);
        response.json(cart);
    } catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});
module.exports = router
