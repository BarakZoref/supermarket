const connection = require('./connection-wrapper');

async function addCart(userId, creationTime){
    let sql = `INSERT INTO carts (user_id, creation_date, is_open) VALUES(?, ?, ?)`
    let parameters = [userId, creationTime, 1];
    let cartData  = await connection.executeWithParameters(sql, parameters);
    return cartData.insertId;
}

module.exports = {
    addCart
}