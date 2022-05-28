const connection = require('./connection-wrapper');

async function getAmountOfOrders(){
    let sql = `SELECT count(*) as amountOfOrders
                 FROM orders`
    let amountOfOrders = await connection.execute(sql);
    return amountOfOrders;
}

async function addNewOrder(orderDetails){
    let sql = `INSERT INTO orders 
                (user_id, cart_id, final_price, city, street, shipping_date, order_date, payment_last_digits)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    let parameters = [orderDetails.userId, orderDetails.cartId, orderDetails.finalPrice,
         orderDetails.city, orderDetails.street, orderDetails.shippingDate,
          orderDetails.orderDate, orderDetails.paymentLastDigits];
    let orderData = await connection.executeWithParameters(sql, parameters);
    let orderId = orderData.insertId;
    return orderId;
}

module.exports = {
    getAmountOfOrders,
    addNewOrder
}