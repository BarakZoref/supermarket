const cartItemsDal = require('../dal/cart-items-dal');

async function addToCart(cartItemDetails){
    const cartItemId = await cartItemsDal.addToCart(cartItemDetails);
    return cartItemId;
}

async function deleteCartItem(cartItemId){
    await cartItemsDal.deleteCartItem(cartItemId);
}

module.exports = {
    deleteCartItem,
    addToCart
}