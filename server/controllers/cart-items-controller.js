const cartItemsLogic = require('../logic/cart-items-logic');
const express = require("express");
const router = express.Router();

//ADD TO CART
//POST http://localhost:4200/cart_items
router.post('/', async (request, response)=>{
    let cartItemDetails = request.body;
    try {
        await cartItemsLogic.addToCart(cartItemDetails);
        response.json({err: false, msg: "cart item was added to cart successfuly"});
    } catch (e) {
        console.error(e);
        response.status(600).send({err: true, msg: e.message});
    }
});

//DELETE CART ITEM
//DELETE http://localhost:4200/cart_items/cartItemId
router.delete('/:id', async (request, response)=>{
    let cartItemId = request.params.id;
    try {
        await cartItemsLogic.deleteCartItem(cartItemId);
        response.json({err: false, msg: "cart item was deleted successfuly"});
    } catch (e) {
        console.error(e);
        response.status(600).send({err: true, msg: e.message});
    }
});

//UPDATE CART ITEM QUANTITY
//PUT http://localhost:4200/cart_items
router.put('/', async (request, response)=>{
    let cartItemDetails = request.body;
    try {
        await cartItemsLogic.updateCartItemsQuantity(cartItemDetails);
        response.json({err: false, msg: "cart item quantity was updated successfuly"});
    } catch (e) {
        console.error(e);
        response.status(600).send({err: true, msg: e.message});
    }
});

//DELETE ALL CART ITEMS
//DELETE http://localhost:4200/cart_items/by_cart_id/cartItemId
router.delete('/by_cart_id/:id', async (request, response)=>{
    let cartId = request.params.id;
    try {
        await cartItemsLogic.deleteAllCartItemsOfCart(cartId);
        response.json({err: false, msg: "all cart items of the cart was deleted successfuly"});
    } catch (e) {
        console.error(e);
        response.status(600).send({err: true, msg: e.message});
    }
});

//GET CART ITEMS
//GET http://localhost:4200/cart_items/cartId
router.get('/:id', async (request, response)=>{
    let cartId = request.params.id;
    try {
        let cartItems = await cartItemsLogic.getCartItems(cartId);
        response.json(cartItems);
    } catch (e) {
        console.error(e);
        response.status(600).send({err: true, msg: e.message});
    }
});

module.exports = router;