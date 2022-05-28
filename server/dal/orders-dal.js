const connection = require('./connection-wrapper');

async function getAmountOfOrders(){
    let sql = `SELECT count(*) as amountOfOrders
                 FROM orders`
    let amountOfOrders = await connection.execute(sql);
    return amountOfOrders;
}

module.exports = {
    getAmountOfOrders
}