const connection = require("./connection-wrapper");

async function getAllProducts(){
    let sql = `SELECT id, name, price, img_url as imgUrl
                FROM products `
    let allProducts = await connection.execute(sql);
    return allProducts;
}

async function getProductsByCategoryId(categoryId){
    let sql = `SELECT id, name, price, img_url as imgUrl
             FROM products
            WHERE category_id = ?`
    let parameters = [categoryId]
    let products = await connection.executeWithParameters(sql, parameters);
    return products;
}

module.exports={
    getAllProducts,
    getProductsByCategoryId
}