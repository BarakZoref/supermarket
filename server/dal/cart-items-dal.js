const connection = require('./connection-wrapper');

async function addToCart(cartItemDetails){
    let sql = `INSERT INTO cart_items (product_id, quantity, cart_id) VALUES (?, ?, ?)`
    let parameters = [cartItemDetails.productId, cartItemDetails.quantity, cartItemDetails.cartId];
    let cartItemData = await connection.executeWithParameters(sql, parameters);
    let cartItemId = cartItemData.insertId;
    return cartItemId;
}

async function deleteCartItem(cartItemId){
    let sql = `DELETE FROM cart_items WHERE id = ?`
    let parameters=[cartItemId];
    await connection.executeWithParameters(sql, parameters);
}

async function updateCartItemsQuantity(cartItemDetails){
    let sql = `UPDATE cart_items SET quantity = ? WHERE id = ?`
    let parameters = [cartItemDetails.quantity, cartItemDetails.cartItemId];
    await connection.executeWithParameters(sql, parameters);
}

async function deleteAllCartItemsOfCart(cartId){
    let sql = `DELETE FROM cart_items WHERE cart_id = ?`
    let parameters=[cartId];
    await connection.executeWithParameters(sql, parameters);
}

module.exports = {
    addToCart,
    deleteCartItem,
    updateCartItemsQuantity,
    deleteAllCartItemsOfCart
}