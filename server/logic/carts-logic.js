const cartsDal = require('../dal/carts-dal');

async function addCart(userId){
    let creationDate = new Date();
    let cartId = await cartsDal.addCart(userId, creationDate);
    let newCart = {
        id: cartId,
        creationDate,
        isOpen: true,
    }
    return newCart;
}

async function getLastCart(userId){
    let cartDetailsAsArray = await cartsDal.getLastCart(userId);
    let cartDetails = cartDetailsAsArray[0];
    return cartDetails;
}

async function closeCart(cartId){
    await cartsDal.closeCart(cartId);
}

module.exports = {
    addCart,
    getLastCart,
    closeCart
}