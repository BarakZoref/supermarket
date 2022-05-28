const connection = require('./connection-wrapper');

async function addCart(userId, creationTime){
    let sql = `INSERT INTO carts (user_id, creation_date, is_open) VALUES(?, ?, ?)`
    let parameters = [userId, creationTime, 1];
    let cartData  = await connection.executeWithParameters(sql, parameters);
    return cartData.insertId;
}

async function getLastCart(userId){
    let sql = `SELECT id, creation_date as creationDate, is_open as isOpen
                FROM carts
                WHERE creation_date IN (SELECT max(creation_date) FROM carts WHERE user_id = ?); `;
    let parameters = [userId];
    let cartDetails = await connection.executeWithParameters(sql, parameters);
    return cartDetails;
}

module.exports = {
    addCart,
    getLastCart
}