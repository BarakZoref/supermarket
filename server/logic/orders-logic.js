const ordersDal = require('../dal/orders-dal');

async function getAmountOfOrders(){
    let amountOfOrders = await ordersDal.getAmountOfOrders();
    return amountOfOrders;
}

async function addNewOrder(orderDetails, tokenData){
    orderDetails.orderDate = new Date();
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

async function getOrderDetails(orderId){
    let orderDetails = await ordersDal.getOrderDetails(orderId);
    return orderDetails;
}

module.exports = {
    getAmountOfOrders,
    addNewOrder,
    getBusyDays,
    getOrderDetails
}