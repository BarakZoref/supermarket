const cartItemsLogic = require('../logic/cart-items-logic');
// const tokenDecoder = require('../utils/token-decoder')
const express = require("express");
const router = express.Router();

//ADD TO CART
//POST http://localhost:3000/cart-items
router.post('/', async (request, response)=>{
    let cartItemDetails = request.body;
    try {
        let cartItemId = await cartItemsLogic.addToCart(cartItemDetails);
        response.json({cartItemId});
    } catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});


module.exports = router;