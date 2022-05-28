const cartsDal = require('../dal/carts-dal');

async function addCart(tokenData){
    let creationDate = new Date();
    if(tokenData.role!="user"){
        throw new Error("Error: the role is not a user");
    }
    let userId = tokenData.userId;
    console.log("creation date", creationDate)
    let cartId = await cartsDal.addCart(userId, creationDate);
    return cartId;
}

async function getLastCart(tokenData){
    if(tokenData.role!="user"){
        throw new Error("Error: the role is not a user");
    }
    const userId = tokenData.userId;
    let cartDetails = await cartsDal.getLastCart(userId);
    return cartDetails;
}

module.exports = {
    addCart,
    getLastCart
}