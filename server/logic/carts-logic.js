const cartsDal = require('../dal/carts-dal');

async function addCart(userId){
    let creationDate = new Date();
    let cartId = await cartsDal.addCart(userId, creationDate);
    return cartId;
}

module.exports = {
    addCart
}