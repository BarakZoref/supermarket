const ordersDal = require('../dal/orders-dal');

async function getAmountOfOrders(){
    let amountOfOrders = await ordersDal.getAmountOfOrders();
    return amountOfOrders;
}

async function addNewOrder(orderDetails){
    orderDetails.orderDate = new Date();
    let orderId = await ordersDal.addNewOrder(orderDetails);
    return orderId
}

module.exports = {
    getAmountOfOrders,
    addNewOrder
}