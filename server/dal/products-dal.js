const connection = require("./connection-wrapper");

async function getAmountOfProducts(){
    let sql = `SELECT count(*) as amountOfProducts
                FROM products`
    let [amountOfProducts] = await connection.execute(sql);
    return amountOfProducts;
}


async function getAllProducts(){
    let sql = `SELECT id, name, category_id as categoryId, ROUND(price,2) as price, img_url as imgUrl
                FROM products
                ORDER BY name ASC`
    let allProducts = await connection.execute(sql);
    return allProducts;
}

async function getProductsByCategoryId(categoryId){
    let sql = `SELECT id, name, category_id as categoryId, ROUND(price,2) as price, img_url as imgUrl
             FROM products
            WHERE category_id = ?
            ORDER BY name ASC`;
    let parameters = [categoryId]
    let products = await connection.executeWithParameters(sql, parameters);
    return products;
}

async function editProduct(productDetails){
    let sql = `UPDATE products SET name = ?, category_id = ?, price = ?, img_url = ? WHERE id = ?`;
    let parameters = [productDetails.name, productDetails.categoryId, productDetails.price, productDetails.imgUrl, productDetails.id];
    await connection.executeWithParameters(sql, parameters);
}

async function addProduct(productDetails){
    let sql = `INSERT INTO products (name, category_id, price, img_url) VALUES(?, ?, ?, ?)`
    let parameters = [productDetails.name, productDetails.categoryId, productDetails.price, productDetails.imgUrl];
    await connection.executeWithParameters(sql, parameters);
}

module.exports={ 
    getAmountOfProducts,
    getAllProducts,
    getProductsByCategoryId,
    editProduct,
    addProduct
}