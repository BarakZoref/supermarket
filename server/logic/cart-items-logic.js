const cartItemsDal = require('../dal/cart-items-dal');

async function addToCart(cartItemDetails){
    const isCartItemExistsInCart = await cartItemsDal.isCartItemExistsInCart(cartItemDetails);
    if(isCartItemExistsInCart){
        throw new Error("Error: cart item already exists in the cart")
    }
    await cartItemsDal.addToCart(cartItemDetails);
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

async function deleteAllCartItemsOfCart(cartId){
    await cartItemsDal.deleteAllCartItemsOfCart(cartId);

}

async function getCartItems(cartId){
    let cartItems = await cartItemsDal.getCartItems(cartId);
    return cartItems;
}

module.exports = {
    addToCart,
    deleteCartItem,
    updateCartItemsQuantity,
    deleteAllCartItemsOfCart,
    getCartItems
}