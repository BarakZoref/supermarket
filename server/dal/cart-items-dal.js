const connection = require('./connection-wrapper');

async function addToCart(cartItemDetails){
    let sql = `INSERT INTO cart_items (product_id, quantity, cart_id) VALUES (?, ?, ?)`
    let parameters = [cartItemDetails.productId, cartItemDetails.quantity, cartItemDetails.cartId];
    let cartItemData = await connection.executeWithParameters(sql, parameters);
    let cartItemId = cartItemData.insertId;
    return cartItemId;
}

module.exports = {
    addToCart
}