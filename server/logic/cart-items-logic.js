const cartItemsDal = require('../dal/cart-items-dal');

async function addToCart(cartItemDetails){
    const cartItemId = await cartItemsDal.addToCart(cartItemDetails);
    return cartItemId;
}

async function deleteCartItem(cartItemId){
    await cartItemsDal.deleteCartItem(cartItemId);
}

async function updateCartItemsQuantity(cartItemDetails){
    if(cartItemDetails.quantity == 0){
        deleteCartItem(cartItemDetails.cartItemId);
        return;
    }
    if(cartItemDetails.quantity < 0){
        throw new Error("Error: quantity can't be below 0");
    }
    if(cartItemDetails.quantity > 10){
        throw new Error("Error: quantity can't be more than 10");
    }
       await cartItemsDal.updateCartItemsQuantity(cartItemDetails);
    
}

module.exports = {
    updateCartItemsQuantity,
    deleteCartItem,
    addToCart
}