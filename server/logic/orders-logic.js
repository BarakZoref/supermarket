const ordersDal = require('../dal/orders-dal');
const cartsLogic = require('../logic/carts-logic');
const fs = require('fs/promises');


async function getAmountOfOrders(){
    let amountOfOrders = await ordersDal.getAmountOfOrders();
    return amountOfOrders;
}

async function addNewOrder(orderDetails, tokenData){
    orderDetails.orderDate = new Date();
    orderDetails.shippingDate = new Date(orderDetails.shippingDate);
    if(tokenData.role!="user"){
        throw new Error("Error: the role is not a user");
    }
    orderDetails.userId = tokenData.userId;
    let orderId = await ordersDal.addNewOrder(orderDetails);
    await cartsLogic.closeCart(orderDetails.cartId);
    await createReceipt(orderDetails.cartItemsArray, orderDetails.cartId, orderDetails.finalPrice);
    return orderId;
}

async function getBusyDays(){
    let busyDays = await ordersDal.getBusyDays();
    return busyDays;
}

async function getLastOrderDate(tokenData){
    if(tokenData.role!="user"){
        throw new Error("Error: the role is not a user");
    }
    let userId = tokenData.userId;
    let orderDateAsArrayOfObject = await ordersDal.getLastOrderDate(userId);
    return orderDateAsArrayOfObject[0].orderDate;
}


async function createReceipt(cartItemsArray, cartId, finalPrice){ 
    let str = 'Receipt No. ' + cartId
    for (const cartItem of cartItemsArray) {
        str += `
        ${cartItem.name} X ${cartItem.quantity} = ₪${cartItem.quantity*cartItem.unitPrice}
        _______________________________`
    }
    str+=`
    Final Price: ₪${finalPrice}`;

    try {
        await fs.writeFile('./receipts/'+cartId+'.txt', str)
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getAmountOfOrders,
    addNewOrder,
    getBusyDays,
    getLastOrderDate
}