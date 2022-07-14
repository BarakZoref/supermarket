const connection = require('./connection-wrapper');

async function addToCart(cartItemDetails){
    let sql = `INSERT INTO cart_items (product_id, quantity, cart_id) VALUES (?, ?, ?)`
    let parameters = [cartItemDetails.productId, cartItemDetails.quantity, cartItemDetails.cartId];
    let cartItemData = await connection.executeWithParameters(sql, parameters);
    let cartItemId = cartItemData.insertId;
    return cartItemId;
}

async function isCartItemExistsInCart(cartItemDetails){
    let sql = `SELECT * FROM cart_items WHERE product_id = ? AND cart_id = ?`
    let parameters = [cartItemDetails.productId, cartItemDetails.cartId];
    let dbResponse = await connection.executeWithParameters(sql, parameters);
    if(dbResponse.length){
        return true;
    }
    return false;
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

async function getCartItems(cartId){
    let sql = `SELECT ci.id, p.name, ROUND(p.price,2) as unitPrice, ci.quantity as quantity, p.img_url as imgUrl, p.id as productId, ci.cart_id as cartId  
    FROM cart_items ci join products p on ci.product_id = p.id
    WHERE ci.cart_id = ?`
    let parameters = [cartId];
    let cartItems = await connection.executeWithParameters(sql, parameters);
    return cartItems;
}

module.exports = {
    addToCart,
    deleteCartItem,
    updateCartItemsQuantity,
    deleteAllCartItemsOfCart,
    getCartItems,
    isCartItemExistsInCart
}