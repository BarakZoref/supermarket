const ordersDal = require('../dal/orders-dal');
const cartsLogic = require('../logic/carts-logic');
const cartItemsLogic = require('../logic/cart-items-logic');
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
    await createReceipt(orderDetails.cartId, orderDetails.finalPrice);
    await cartsLogic.closeCart(orderDetails.cartId);
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


async function createReceipt(cartId, finalPrice){ 
    let cartItemsArray = await cartItemsLogic.getCartItems(cartId);
    console.log(cartItemsArray);
    let str = 'Receipt No. ' + cartId + '\n';
    for (const cartItem of cartItemsArray) {
        let cartItemPrice = (cartItem.quantity*cartItem.unitPrice)
        let roundedCartItemPrice = (Math.round(cartItemPrice * 100) / 100).toFixed(2);
        str += `
        ${cartItem.name} X ${cartItem.quantity} = ₪${roundedCartItemPrice}
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