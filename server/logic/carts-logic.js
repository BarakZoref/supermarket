const cartsDal = require('../dal/carts-dal');

async function addCart(tokenData){
    let creationDate = new Date();
    if(tokenData.role!="user"){
        throw new Error("Error: the role is not a user");
    }
    let userId = tokenData.userId;
    let cartId = await cartsDal.addCart(userId, creationDate);
    return cartId;
}

module.exports = {
    addCart
}