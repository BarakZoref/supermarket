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

async function getBusyDays(){
    let sql = `SELECT shipping_date as shippingDate
    FROM Orders GROUP BY shipping_date
    HAVING count(*)>3`
    let busyDays = await connection.execute(sql);
    return busyDays;
}

async function getOrderDetails(orderId){
    let sql = `SELECT cart_id as cartId, final_price as finalPrice,
                 city, street, shipping_date as shippingDate, order_date as orderDate,
                 payment_last_digits as paymentLastDigits
                 FROM orders
                 WHERE id = 1`
    let parameters = [orderId]
    let unOrganizedOrderDetails = await connection.executeWithParameters(sql, parameters);
    return unOrganizedOrderDetails;
}

module.exports = {
    getAmountOfOrders,
    addNewOrder,
    getBusyDays,
    getOrderDetails
}