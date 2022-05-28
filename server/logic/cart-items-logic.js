const cartItemsDal = require('../dal/cart-items-dal');

async function addToCart(cartItemDetails){
    const cartItemId = await cartItemsDal.addToCart(cartItemDetails);
    return cartItemId;
}

module.exports = {
    addToCart
}