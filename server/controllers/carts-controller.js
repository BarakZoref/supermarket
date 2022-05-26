const cartsLogic = require('../logic/carts-logic');
const express = require("express");
const router = express.Router();

//ADD CART
//POST http://localhost:3000/carts
router.post('/', async (request, response)=>{
    let userId = request.body.userId;
    try {
        let cartId = await cartsLogic.addCart(userId);
        response.json({cartId});
    } catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

module.exports = router
