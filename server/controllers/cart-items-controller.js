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

//DELETE CART ITEM
//DELETE http://localhost:3000/cart-items/cartItemId
router.delete('/:id', async (request, response)=>{
    let cartItemId = request.params.id;
    try {
        await cartItemsLogic.deleteCartItem(cartItemId);
        response.json({err: false, msg: "cart item was deleted successfuly"});
    } catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

//UPDATE CART ITEM QUANTITY
//PUT http://localhost:3000/cart-items
router.put('/', async (request, response)=>{
    let cartItemDetails = request.body;
    try {
        await cartItemsLogic.updateCartItemsQuantity(cartItemDetails);
        response.json({err: false, msg: "cart item was updated successfuly"});
    } catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

module.exports = router;