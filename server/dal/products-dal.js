const connection = require("./connection-wrapper");

async function getAllProducts(){
    let sql = `SELECT id, name, price, img_url as imgUrl
                FROM products `
    let allProducts = await connection.execute(sql);
    return allProducts;
}

module.exports={
    getAllProducts
}