const connection = require('./connection-wrapper');

async function getAmountOfOrders(){
    let sql = `SELECT count(*) as amountOfOrders
                 FROM orders`
    let [amountOfOrders] = await connection.execute(sql);
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
    FROM Orders GROUP BY CAST(shipping_date AS DATE)
    HAVING count(*) >= 3`
    let busyDays = await connection.execute(sql);
    return busyDays;
}

async function getLastOrderDate(userId){
    let sql = `SELECT max(order_date) as orderDate
             FROM supermarket.orders
            where user_id = ?`;
     let parameters = [userId]
    let orderDate = await connection.executeWithParameters(sql, parameters);
    return orderDate;
}


module.exports = {
    getAmountOfOrders,
    addNewOrder,
    getBusyDays,
    getLastOrderDate
}