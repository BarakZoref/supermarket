const cartsDal = require('../dal/carts-dal');

async function addCart(userId){
    let creationDate = new Date();
    console.log("creation date", creationDate)
    // if(tokenData.role!="user"){
    //     throw new Error("Error: the role is not a user");
    // }
    // let userId = tokenData.userId;

    let cartId = await cartsDal.addCart(userId, creationDate);
    let newCart = {
        id: cartId,
        creationDate,
        isOpen: true,
        isNewClient: true
    }
    return newCart;
}

async function getLastCart(userId){
    let cartDetails = await cartsDal.getLastCart(userId);
    if(cartDetails.length){
        cartDetails[0].isNewClient = false;
    }
    else {
        cartDetails = await this.addCart(userId)
    }
    return cartDetails;
}

module.exports = {
    addCart,
    getLastCart
}