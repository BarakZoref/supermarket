const ordersDal = require('../dal/orders-dal');

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
    return orderId
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

async function getOrderDetails(cartId){
    let orderDetails = await ordersDal.getOrderDetails(cartId);
    return orderDetails;
}

module.exports = {
    getAmountOfOrders,
    addNewOrder,
    getBusyDays,
    getLastOrderDate,
    getOrderDetails
}